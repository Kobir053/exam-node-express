import { NextFunction, Request, Response } from 'express';

export function idIsRequireMiddleware (req: Request, res: Response, next: NextFunction) {
    
    if(!req.params.id){
        res.status(400).json({message: "this is message from middleware, please enter the id of the beeper at the params of url"});
    }

    next();
}