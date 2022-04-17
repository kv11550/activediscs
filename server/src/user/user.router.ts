import express, { Request, Response } from "express";
import { checkAuth } from "../middleware/auth";
import * as userService from "./user.service";

const NodeCache = require("node-cache");
const myCache = new NodeCache();

/**
 * Router Definition
 */
export const userRouter = express.Router();

userRouter.post("/login", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var result = userService.validateUser(body);
        // console.log(body);
        res.status(200).send(result);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.post("/getServerStatus", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var result = userService.getServerStatus(body);
        // console.log(body);
        res.status(200).send(result);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});




