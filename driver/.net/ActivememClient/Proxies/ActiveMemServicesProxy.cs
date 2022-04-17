using System;
using System.Collections.Generic;
using System.Text;
using ActivememClient.Clients;

namespace ActivememClient.Proxies
{
    public class ActiveMemServicesProxy
    {
        #region Readonlys

        private readonly JsonRpcClient _client;

        #endregion

        #region Constructor
        public ActiveMemServicesProxy(JsonRpcClient client)
        {
            _client = client;
        }

        #endregion

        #region Methods

        public string ExecCommand(object command)
        {
            Console.WriteLine($"Getting Todos");

            var request = _client.CreateRequest("dotNetCommand", command);

            var response = _client.SendRequest<string>(request);

           // Console.WriteLine("debug");
           // Console.WriteLine(response);


            return response;
        }

        #endregion

    }
}
