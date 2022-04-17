
import { Request, Response, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {

   // console.log('debug for auth');
   // console.log(req);
    next();

};


/*

export const checkAuth = (
    error: Request,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log('debug for auth');
    console.log(request);
    next();

};

*/
