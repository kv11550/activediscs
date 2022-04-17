import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as bodyParser from "body-parser";

const port = 3001;

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}



const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

//app.use(express.json());

app.use(express.static('public'));

app.get('/test', (req, res) => {
    res.send('Hello World!')
  })

  

 app.listen(port, () => {
    console.log(`admin site port: ${port}`);
});


