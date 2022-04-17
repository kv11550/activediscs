using System;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;
using WebSocketSharp;
using AustinHarris.JsonRpc;
using Newtonsoft.Json;

namespace ActivememClient.Clients
{
    public class JsonRpcClient
    {
        #region Properties

        /// <summary>
        /// Allows the maximum request ID value to be configured.
        /// </summary>
        public int MaximumRequestId { get; set; } = int.MaxValue;

        #endregion

        #region Static Fields

        /// <summary>
        /// Used to keep track of the current request ID.
        /// </summary>
        private static int _requestId = 0;

        #endregion

        #region Static Readonlys

        /// <summary>
        /// Used to keep track of server responses.
        /// </summary>
        private static readonly ConcurrentDictionary<string, TaskCompletionSource<string>> _responses
            = new ConcurrentDictionary<string, TaskCompletionSource<string>>();

        #endregion

        #region Readonlys

        private readonly WebSocket _webSocket;

        #endregion

        #region Constructor

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="webSocket">The WebSocket channel to use</param>
        public JsonRpcClient(WebSocket webSocket)
        {
            _webSocket = webSocket;
            _webSocket.OnMessage += ProcessMessage;
        }

        #endregion

        #region Methods

        #region Public

        /// <summary>
        /// Creates a JSON-RPC request for the specified method and parameters.
        /// </summary>
        /// <param name="method">The method name</param>
        /// <param name="parameters">The list of parameters to pass to the method</param>
        /// <returns><see cref="JsonRequest"/></returns>
        public JsonRequest CreateRequest(string method, object parameters)
        {
            // Get the next available Request ID.
            int nextRequestId = Interlocked.Increment(ref _requestId);

            if (nextRequestId > MaximumRequestId)
            {
                // Reset the Request ID to 0 and start again.
                Interlocked.Exchange(ref _requestId, 0);

                nextRequestId = Interlocked.Increment(ref _requestId);
            }

            // Create and return the Request object.
            var request = new JsonRequest(method, parameters, nextRequestId);

            return request;
        }

        /// <summary>
        /// Sends the specified request to the WebSocket server and gets the response.
        /// </summary>
        /// <typeparam name="TResult">The type of the expected result object</typeparam>
        /// <param name="request">The JSON-RPC request to send</param>
        /// <param name="timeout">The timeout (in milliseconds) for the request</param>
        /// <returns>The response result</returns>
        public TResult SendRequest<TResult>(JsonRequest request, int timeout = 30000)
        {
            var tcs = new TaskCompletionSource<string>();
            var requestId = request.Id;

            try
            {
                string requestString = JsonConvert.SerializeObject(request);

                // Add the Request details to the Responses dictionary so that we have   
                // an entry to match up against whenever the response is received.
                _responses.TryAdd(Convert.ToString(requestId), tcs);

                // Send the request to the server.
                Console.WriteLine($"Sending request: {requestString}");
                _webSocket.Send(requestString);
                Console.WriteLine("Finished sending request");

                var task = tcs.Task;

                // Wait here until either the response has been received,
                // or we have reached the timeout limit.
                Task.WaitAll(new Task[] { task }, timeout);

                if (task.IsCompleted)
                {
                    // Parse the result, now that the response has been received.
                  //  Console.WriteLine($"Received response debug: {task.Result}");

                    JsonResponse response = JsonConvert.DeserializeObject<JsonResponse>(task.Result);

                  //  Console.WriteLine($"Received response debug 2: {response.Result}");

                    string responseString = JsonConvert.SerializeObject(response);
                  //  Console.WriteLine($"Received response: {responseString}");

                    // Throw an Exception if there was an error.
                    if (response.Error != null) throw response.Error;

                    // Return the result.

                    string returnType = response.Result.GetType().ToString();
                    //Console.WriteLine($"Received response type: {returnType}");

                    object payload = JsonConvert.SerializeObject(response.Result);

                    if (returnType == "System.String")
                        return (TResult)response.Result;
                    else
                        return (TResult)payload;

                    /*
                    return JsonConvert.DeserializeObject<TResult>(
                        Convert.ToString(response.Result),
                        new JsonSerializerSettings
                        {
                            Error = (sender, args) => args.ErrorContext.Handled = true
                        });

                    */
                }
                else // Timeout response.
                {
                    Console.WriteLine($"Client timeout of {timeout} milliseconds has expired, throwing TimeoutException");
                    throw new TimeoutException();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred. {ex}");
                throw;
            }
            finally
            {
                // Remove the request/response entry in the 'finally' block to avoid leaking memory.
                _responses.TryRemove(Convert.ToString(requestId), out tcs);
            }
        }

        #endregion

        #region Private

        /// <summary>
        /// Processes messages received over the WebSocket connection.
        /// </summary>
        /// <param name="sender">The sender (WebSocket)</param>
        /// <param name="e">The Message Event Arguments</param>
        private void ProcessMessage(object sender, MessageEventArgs e)
        {
            // Check for Pings.
            if (e.IsPing)
            {
                Console.WriteLine("Received Ping");
                return;
            }

            Console.WriteLine("Processing message");

            // Log when the message is Binary.
            if (e.IsBinary)
            {
                Console.WriteLine("Message Type is Binary");
            }

            Console.WriteLine($"Message Data: {e.Data}");

            // Parse the response from the server.
            JsonResponse response = JsonConvert.DeserializeObject<JsonResponse>(
                e.Data,
                new JsonSerializerSettings
                {
                    Error = (sender2, args) => args.ErrorContext.Handled = true

                });

            // Check for an error.
            if (response.Error != null)
            {
                // Log the error details.
                Console.WriteLine("Error Message: " + response.Error.message);
                Console.WriteLine("Error Code: " + response.Error.code);
                Console.WriteLine("Error Data: " + response.Error.data);
            }

            // Set the response result.
            if (_responses.TryGetValue(Convert.ToString(response.Id), out TaskCompletionSource<string> tcs))
            {
                tcs.TrySetResult(e.Data);
            }
            else
            {
                Console.WriteLine("Unexpected response received. ID: " + response.Id);
            }

            Console.WriteLine("Finished processing message");
        }

        #endregion

        #endregion
    }
}
