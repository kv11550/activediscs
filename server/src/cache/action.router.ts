import express, { Request, Response } from "express";
import { checkAuth } from "../middleware/auth";
import * as actionService from "./action.service";

const NodeCache = require("node-cache");
const myCache = new NodeCache();

var callNumber: number = 0;

/**
 * Router Definition
 */
export const cacheRouter = express.Router();

// GET items
cacheRouter.get("/", async (req: Request, res: Response) => {
    try {
        callNumber++;
        if (callNumber % 100 === 0)
            console.log(callNumber);
        res.status(200).send("hello 2");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

cacheRouter.use(checkAuth);

cacheRouter.post("/mset", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        // console.log(body);
        res.status(200).send("hello");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


cacheRouter.post("/set", async (req: Request, res: Response) => {
    try {
        var body = req.body;

        actionService.set(body);
        res.status(200).send("ok");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


cacheRouter.post("/get", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var value = actionService.get(body);
        res.status(200).send(value);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


cacheRouter.post("/hmset", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var result = actionService.hmset(body);
        res.status(200).send(result);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

cacheRouter.post("/hget", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var value = actionService.hget(body);
        res.status(200).send(value);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

cacheRouter.post("/hset", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var value = actionService.hset(body);
        res.status(200).send(value);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

cacheRouter.post("/hvals", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var value = actionService.hvals(body);
        res.status(200).send(value);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


cacheRouter.post("/keys", async (req: Request, res: Response) => {
    try {
        var value = actionService.keys();
        res.status(200).send(value);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


cacheRouter.post("/hkeys", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        //var key = body.key;
        var value = actionService.hkeys(body);
        res.status(200).send(value);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


cacheRouter.post("/lrpush", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var value = actionService.lrpush(body);
        res.status(200).send(value);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


cacheRouter.post("/lrange", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var value = actionService.lrange(body);
        res.status(200).send(value);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


cacheRouter.post("/llen", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var value = actionService.llen(body);
        res.status(200).send(value);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


cacheRouter.post("/incr", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var value = actionService.incr(body);
        res.status(200).send(value);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


cacheRouter.post("/setInternal", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var value = actionService.setInternal(body);
        res.status(200).send(value);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


cacheRouter.post("/getInternal", async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var value = actionService.getInternal(body);
        res.status(200).send(value);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});








