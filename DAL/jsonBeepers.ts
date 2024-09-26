import jsonfile from 'jsonfile';
import fs from 'fs';
import { Beeper } from '../types/type.js';
const DB_PATH = './data/db.json'; 

// gets the array of beepers and insert to it the new beeper
export async function insertBeeperToJson (beeper: Beeper) : Promise<void> {
    try {

        const beepers: Beeper[] = await jsonfile.readFile(DB_PATH);
        beepers.push(beeper);
        await jsonfile.writeFile(DB_PATH, beepers);

    } 
    catch (error: any) {
        throw new Error(error.message)
    }
}

// gets the array of beepers and return it
export async function readFromJsonFile () : Promise<Beeper[]> {
    const beepers: Beeper[] = await jsonfile.readFile(DB_PATH);
    return beepers;
}

// updates specific beeper in the json file
export async function updateBeeperInJson (beeper: Beeper) : Promise<void> {
    try {

        const beepers: Beeper[] = await jsonfile.readFile(DB_PATH);
        if(!beepers){
            throw new Error("there isn't any beepers in the json file");
        }

        const beeperIndex = beepers.findIndex((b: Beeper) => b.name === beeper.name && b.id === beeper.id);
        if(beeperIndex < 0){
            throw new Error("beeper not founded while trying to update him");
        }

        beepers[beeperIndex] = beeper;
        await jsonfile.writeFile(DB_PATH, beepers);

    } 
    catch (error: any) {
        throw new Error(error.message);
    }
}

// updates the array of beepers with given beepers array 
export async function writeUpdatedBeepersToJson (beepers: Beeper[] ) {
    await jsonfile.writeFile(DB_PATH, beepers);
}

// make sure we'll have that json file with array
export async function ensureDatabaseExist () {
    if(!fs.readFileSync(DB_PATH)){
        await jsonfile.writeFile(DB_PATH, []);
    }
}