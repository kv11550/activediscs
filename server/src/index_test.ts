import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { checkAuth } from "./middleware/auth";
import { cacheRouter } from "./cache/action.router";
import { userRouter } from "./user/user.router";
import * as bodyParser from "body-parser";
import { WebSocketServer } from 'ws';
import { cacheWssRouter } from "./cache/action.wss";
import { ServerTask } from "./utils/server";
import { config } from './config/config';
import * as http from "http";

// dotenv.config();

/**
 * App Variables
 */
if (!config.port) {
    process.exit(1);
}

const port: number = config.port ? config.port : 10;

var adminPort: number =  config.adminPort ? config.adminPort : 10;

//adminPort = 7000;

const app = express();

/**
 *  App Configuration
 */

//app.use(helmet());
app.use(bodyParser.json());
//app.use(cors());

//app.use(express.json());

app.use(express.static('public'));

app.get('/test', (req, res) => {
    res.send('Hello World!')
  })
  

app.use("/api/cache", cacheRouter);
app.use("/api/user", userRouter);

//app.use(errorHandler);
app.use(notFoundHandler);



/*
  WebSocket Server
*/

const wss = new WebSocketServer({
    port: port,

    verifyClient: function (info, cb) {

        console.log(info.req.headers);

        var auth = info.req.headers.authorization ? info.req.headers.authorization.replace('Basic ', '') : '';
        console.log(auth);
        if (auth) {

            let buff = new Buffer(auth, 'base64');
            let text = buff.toString('ascii');

            console.log(text);
        }
       
        cb(true);
        /*
        var token = info.req.headers.token
        if (!token)
            cb(false, 401, 'Unauthorized')
        else {
            jwt.verify(token, 'secret-key', function (err, decoded) {
                if (err) {
                    cb(false, 401, 'Unauthorized')
                } else {
                    info.req.user = decoded //[1]
                    cb(true)
                }
            })
        }
        */

    }

});

wss.on('connection', function connection(ws) {

    ws.on('message', function message(data) {

        var toSent = {
            id: 0,
            result: null
        }

        var body: any = JSON.parse(data.toString());

        if (body && body.params) {

            var command = body.params;

            var result: any = cacheWssRouter(command);

            toSent.id = body.id;
            toSent.result = result;

        }

        ws.send(JSON.stringify(toSent));

    });

});

const serverTask: any = new ServerTask();
serverTask.queryServerInfo();

/**
 * Server Activation
 */


http.createServer(app).listen(adminPort, () => {
    console.log(`admin site port: ${adminPort}`);
    console.log(`active space port: ${port}`);
});

/*
 app.listen(adminPort, () => {
    console.log(`admin site port: ${adminPort}`);
    console.log(`active space port: ${port}`);
});

*/



