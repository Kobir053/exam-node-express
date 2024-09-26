import { Request, Response } from 'express';
import { Beeper } from '../types/type.js';
import { makeBeeper } from '../services/beeperService.js';

export async function createBeeper (req: Request, res: Response) : Promise<void> {
    try {
        if(!req.body.name){
            res.status(400).json({message: "the body has to contain name"});
        }

        const newBeeper: Beeper = await makeBeeper(req.body.name);
        res.status(201).json({newBeeper: newBeeper});
    } 
    catch (error: any) {
        res.status(500).json({message: "could not create a beeper due to the error: " + error.message});
    }
}