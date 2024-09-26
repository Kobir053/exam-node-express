import { Request, Response } from 'express';
import { Beeper, Status } from '../types/type.js';
import { deleteSpecificBeeper, getSpecificBeeper, makeBeeper, searchBeepersByStatus } from '../services/beeperService.js';
import { readFromJsonFile } from '../DAL/jsonBeepers.js';

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

export async function getAllBeepers (req: Request, res: Response) {
    try {
        const beepers: Beeper[] = await readFromJsonFile();
        if(!beepers){
            res.status(404).json({message: "didn't found any beepers"});
        }

        res.status(200).json({beepers: beepers});
    } 
    catch (error: any) {
        res.status(500).json({message: "couldn't get all beepers due to error: " + error.message});
    }
}

export async function getBeeperById (req: Request, res: Response) {
    try {

        const myBeeper = await getSpecificBeeper(req.params.id);
        if(!myBeeper){
            res.status(404).json({message: "didn't found a beeper with this id"});
            return;
        }
        
        res.status(200).json({myBeeper: myBeeper});
    } 
    catch (error: any) {
        res.status(500).json({message: "couldn't get beeper by id due to error: " + error.message});
    }
}

export async function deleteBeeperById (req: Request, res: Response) {
    try {
        if(!req.params.id){
            res.status(400).json({message: "please enter id in params of url"});
            return;
        }
        const myBeeper = await getSpecificBeeper(req.params.id);
        if(!myBeeper){
            res.status(404).json({message: "didn't found a beeper with this id"});
            return;
        }
        await deleteSpecificBeeper(req.params.id);
        res.status(200).json({message: "deleted successfully"});
    } 
    catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export async function getBeepersByStatus(req: Request, res: Response) {
    try {
        if(!req.params.status){
            res.status(400).json({message: "please enter a status in the params of url"});
            return;
        }
        if(!Object.keys(Status).includes(req.params.status)){
            res.status(400).json({message: "This status is not valid"});
            return;
        }
        const specificBeepers = await searchBeepersByStatus(req.params.status);
        if(specificBeepers.length == 0){
            res.status(404).json({message: "didn't found any beepers with that status"});
            return;
        }

        res.status(200).json({beepersByStatus: specificBeepers});
    } 
    catch (error: any) {
        res.status(500).json({message: "couldn't get beepers by status due to error: " + error.message});
    }
}