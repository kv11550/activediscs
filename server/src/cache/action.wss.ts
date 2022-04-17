import * as actionService from "./action.service";
import moment from 'moment';

const NodeCache = require("node-cache");
const myCache = new NodeCache();


var received: number = 0;

const testsetNodeCache = async (key: any) => {

    await myCache.set(`key_${key}`, `testing value : ${key}`);

}


export const cacheWssRouter = (data: any): any => {

    var result: any = "";
    // console.log('cacheWssRouter received: %s', data);

    try {

        // var body: any = JSON.parse(data);

        var body = data;

        received++;
        if (received % 5000 === 0) {
            const format1 = "YYYY-MM-DD HH:mm:ss";
            var current = moment().format(format1)
            console.log(`current time --- ${current}`);
            console.log(`cacheWssRouter received ${received}`);
        }

        var cmd: string = body.cmd;

        if (cmd) {

            switch (cmd) {

                case "set":
                    actionService.set(body);
                    result = "ok";
                    break;
                case "get":
                    result = actionService.get(body);
                    break;
                case "hmset":
                    result = actionService.hmset(body);
                    break;
                case "hget":
                    result = actionService.hget(body);
                    break;
                case "hset":
                    result = actionService.hset(body);
                    break;
                case "hvals":
                    result = actionService.hvals(body);
                    break;
                case "keys":
                    result = actionService.keys();
                    break;
                case "hkeys":
                    result = actionService.hkeys(body);
                    break;
                case "lrpush":
                    result = actionService.lrpush(body);
                    break;
                case "lrange":
                    result = actionService.lrange(body);
                    break;
                case "llen":
                    result = actionService.llen(body);
                    break;
                case "incr":
                    result = actionService.incr(body);
                    break;

            }

        }

    } catch (err) {

        console.log(err);

    }

    //testsetNodeCache(data);

    return result;

};