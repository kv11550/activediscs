import * as actionService from "./action.service";

var received: number = 0;

export const cacheWssRouter = (data: any): any => {

    var result: any = "" ;
    // console.log('cacheWssRouter received: %s', data);

    try {

        var body: any = JSON.parse(data);

        received++;
        if (received % 1000 === 0)
            console.log(`cacheWssRouter received ${received}`);

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

            }

        }

    } catch (err) {

        console.log(err);

    }



    return result;

};