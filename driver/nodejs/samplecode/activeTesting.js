
const activemem = require("../activemem-commands/src");

const option = {
    host: "localhost",
    port: "7020",
    user: "user01",
    password: "1234"
}


const test01 = async () => {

    var client = await activemem.createClient(option);

    var cacheCmd = {
        "cmd": "get",
        "key": `test04`

    }


    var cmd = {
        "key": `test04`
    }

    var cmd2 = {
        "key": "test05",
        "value": "this is a test  %%%%%%%%%%%%%---dd%%%%%%"
    }
    

    // var result = await client.set('test01_1', "this is a testing");

    var result = await client.hmset('hashe1_1', {
        "19001": "value 01",
        "19002": "value 02"
    })

    console.log(result);

    var result2 = await client.hvals('hashe1_1');

    console.log(result2);


    var result3 = await client.hget('hashe1_1',"19002");

    console.log(result3);


    var result5 = await client.set("test_01","11123");

    console.log(result5);

    var result6 = await client.get("test_01");

    console.log(result6);


    var result4 = await client.keys();

    console.log(result4);


    var result7 = await client.lrpush("test_01", "t001");

    console.log(result7);

    await client.lrpush("test_01", "t002");


    var result8 = await client.lrange("test_01", 0, -1);

    console.log(result8);

    var result9 = await client.llen("test_01");

    console.log(result9);


}


test01()

