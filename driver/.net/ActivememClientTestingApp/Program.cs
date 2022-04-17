using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivememClient;

namespace TestingApp
{
    class Program
    {
        static void Main(string[] args)
        {
            var client = new Database();
            var config = new Configuration();
            config.host = "localhost";
            config.port = "7020";
            client.Connect(config);
            client.Set("test003", "question 1");

            string result = client.Get("test003");

            Console.WriteLine($"Get result: {result}");


            object payload = new
            {
                key_19001 = "value 01",
                key_19002 = "value 02",
            };

            client.Hmset("hashe1_1", payload);

            result = client.Hget("hashe1_1", "key_19002");

            Console.WriteLine($"Hget result: {result}");

            result = client.Keys();

            Console.WriteLine($"Keys result: {result}");

            result = client.Lrpush("list_1", "list 001");

            result = client.Lrpush("list_1", "list 002");

            result = client.Lrange("list_1", 0, 1);

            int listLength = client.Llen("list_1");

            Console.WriteLine($"listLength: {listLength}");

            int newValue = client.Incr("test001");

            Console.WriteLine($"incr new value: {newValue}");

            Console.ReadKey(true);
        }
    }
}
