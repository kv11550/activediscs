const WebSocket = require('ws');
const WebSocketAsPromised = require('websocket-as-promised');
//import WebSocketAsPromised from 'websocket-as-promised';

var activemem = null;

const ActiveMem = async (option) => {

    /*
    return new Promise(function (resolve, reject) {
        var server = new WebSocket('ws://localhost:7020');
        server.onopen = function () {
            activemem = server;
            resolve(server);
        };
        server.onerror = function (err) {
            reject(err);
        };

    });
    */

    if (option) {

        var host = option.host;
        var port = option.port;
        var user = option.user;
        var password = option.password;

        var auth = user && password ? 'Basic ' + Buffer.from(user + ':' + password).toString('base64') : "";

        activemem = new WebSocketAsPromised(`ws://${host}:${port}`, {
            createWebSocket: url => new WebSocket(url, {
                headers: {
                 //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaW9zdHJlYW1lciJ9.oNx-4e9hldyATpdPZghd_sjX8DhTkQFVDBxIhKh4MC4"
                    authorization: auth
                }
            }),
            extractMessageData: event => event,
            packMessage: data => JSON.stringify(data),
            unpackMessage: data => JSON.parse(data),
            attachRequestId: (data, requestId) => Object.assign({ id: requestId }, {method: "jsCommand", params: data}), // attach requestId to message as `id` field
            extractRequestId: data => data && data.id,
    
            //   attachRequestId: (data, requestId) => Object.assign({id: requestId}, data)
        });
    
        try {
            await activemem.open();
        } catch (err) {
            console.log(`Active Mem Error: Connection Error: ${err}`);
        }

    }

  

}


const sendCmd = async (cmdName, payload) => {

    var result = null;

    try {
        if (typeof payload === "object") {

            var cmd = Object.assign({}, payload);
            cmd.cmd = cmdName;

            var cacheResult = await activemem.sendRequest(cmd);

            if (cacheResult) {
                result = cacheResult.result;
            }

        } 
    } catch (err) {
        console.log(`Active Mem Error: Can not send data to Active Mem Server, please check if the server is up or the connection is in good status.`);
    }


    return result

}




ActiveMem.createClient = async (option) => {

    //const connect = new ActiveMem()
    await ActiveMem(option);
    return ActiveMem;
};

ActiveMem.get = async (key) => {

    var result = null;

    var cmd = {
        "key": key
    }

    result = await sendCmd("get", cmd)
    return result;

}

ActiveMem.set = async (key, value) => {

    var cmd = {
        "key": key,
        "value": value
    }
    return await sendCmd("set", cmd)

}

ActiveMem.hmset = async (key, payload) => {

    var cmd = {
        "key": key,
        "value": payload
    }
    return await sendCmd("hmset", cmd)

}

ActiveMem.hget = async (key, field) => {

    var cmd = {
        "key": key,
        "field": field
    }
    return await sendCmd("hget", cmd)

}


ActiveMem.hset = async (key, field, value) => {

    var cmd = {
        "key": key,
        "field": field,
        "value": value
    }
    return await sendCmd("hset", cmd)

}



ActiveMem.hvals = async (key) => {

    var cmd = {
        "key": key
    }
    return await sendCmd("hvals", cmd)

}


ActiveMem.keys = async () => {

    var cmd = {
    }
    return await sendCmd("keys", cmd)

}

ActiveMem.hkeys = async (key) => {

    var cmd = {
        "key": key
    }
    return await sendCmd("hkeys", cmd)

}

ActiveMem.lrpush = async (key, value) => {

    var cmd = {
        "key": key,
        "value": value
    }
    return await sendCmd("lrpush", cmd)

}

ActiveMem.lrange = async (key, start, end) => {

    var cmd = {
        "key": key,
        "start": start,
        "end": end
    }
    return await sendCmd("lrange", cmd)

}

ActiveMem.llen = async (key) => {

    var cmd = {
        "key": key
    }
    return await sendCmd("llen", cmd)

}

ActiveMem.incr = async (key) => {

    var cmd = {
        "key": key
    }
    return await sendCmd("incr", cmd)

}


module.exports = ActiveMem
