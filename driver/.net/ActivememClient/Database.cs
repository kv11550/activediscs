using System;
using WebSocketSharp;
using ActivememClient.Clients;
using ActivememClient.Proxies;


namespace ActivememClient
{
    public class Database
    {
        ActiveMemServicesProxy db = null;
        public Database()
        {
            db = null;
        }
        public void Connect(Configuration connectionParams)
        {
            if (connectionParams != null)
            {
                string connectionString = $"ws://{connectionParams.host}:{connectionParams.port}";
                var webSocket = new WebSocket(connectionString);
                webSocket.SetCredentials("user01", "1234", true);
                webSocket.Connect();
                var client = new JsonRpcClient(webSocket);
                var proxy = new ActiveMemServicesProxy(client);
                db = proxy;
            }
        }

        private string SendCmd(object cmd)
        {
            string result = "";

            if (db == null)
            {
                Console.WriteLine($"Need to run the Connect command first !");
            }
            else
            {
                result = db.ExecCommand(cmd);
            }
            return result;

        }


        public void Set(string key, string value)
        {
            object cmd = new
            {
                cmd = "set",
                key = key,
                value = value
            };
            SendCmd(cmd);
        }

        public string Get(string key)
        {
            object cmd = new
            {
                cmd = "get",
                key = key,
            };

            return SendCmd(cmd);
        }

        public string Hmset(string key, object payload)
        {
            object cmd = new
            {
                cmd = "hmset",
                key = key,
                value = payload,
            };

            return SendCmd(cmd);
        }


        public string Hset(string key, string field, string value)
        {
            object cmd = new
            {
                cmd = "hset",
                key = key,
                field = field,
                value = value
            };

            return SendCmd(cmd);
        }


        public string Hget(string key, string field)
        {
            object cmd = new
            {
                cmd = "hget",
                key = key,
                field = field
            };

            return SendCmd(cmd);
        }


        public string Hvals(string key)
        {
            object cmd = new
            {
                cmd = "hvals",
                key = key
            };

            return SendCmd(cmd);
        }


        public string Keys()
        {
            object cmd = new
            {
                cmd = "keys"
            };

            return SendCmd(cmd);
        }

        public string Hkeys(string key)
        {
            object cmd = new
            {
                cmd = "hkeys",
                key = key
            };

            return SendCmd(cmd);
        }


        public string Lrpush(string key, string value)
        {
            object cmd = new
            {
                cmd = "lrpush",
                key = key,
                value = value
            };

            return SendCmd(cmd);
        }


        public string Lrange(string key, int start, int end)
        {
            object cmd = new
            {
                cmd = "lrange",
                key = key,
                start = start,
                end = end
            };

            return SendCmd(cmd);
        }

        public int Llen(string key)
        {
            object cmd = new
            {
                cmd = "llen",
                key = key
            };

            string result = SendCmd(cmd);

            return int.Parse(result);
        }


        public int Incr(string key)
        {
            object cmd = new
            {
                cmd = "incr",
                key = key
            };

            string result = SendCmd(cmd);

            return int.Parse(result);
        }


    }
}
