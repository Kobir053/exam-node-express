import {v4 as uuidv4} from 'uuid';
import { Beeper, Status } from '../types/type.js';
import { insertBeeperToJson, readFromJsonFile, writeUpdatedBeepersToJson } from '../DAL/jsonBeepers.js';

export async function makeBeeper (name: string) : Promise<Beeper> {
    const newBeeper: Beeper = {
        id: uuidv4(),
        name: name,
        status: Status.manufactured,
        created_at: new Date()
    };

    await insertBeeperToJson(newBeeper);
    return newBeeper;
}

export async function getSpecificBeeper (id: string) : Promise<Beeper | null> {
    const beepers: Beeper[] = await readFromJsonFile();
    if(!beepers){
        throw new Error("there isn't any beepers in the jsom file");
    }
    const beeperIndex =  beepers.findIndex((b: Beeper) => b.id === id);
    return beepers[beeperIndex]? beepers[beeperIndex]: null;
}

export async function deleteSpecificBeeper(id: string) {
    const myBeepers: Beeper[] = await readFromJsonFile();
    if(!myBeepers){
        throw new Error("there isn't any beepers in the jsom file");
    }

    const beeperIndex = myBeepers.findIndex((b: Beeper) => b.id === id);
    if(beeperIndex < 0){
        throw new Error("beeper with that id didn't found so it can't be deleted");
    }

    myBeepers.splice(beeperIndex, 1);
    await writeUpdatedBeepersToJson(myBeepers);
}

export async function searchBeepersByStatus(status: string) : Promise<Beeper[]> {
    const myBeepers: Beeper[] = await readFromJsonFile();
    if(!myBeepers){
        throw new Error("there isn't any beepers in the json file at all");
    }

    const filteredBeepers = myBeepers.filter((beeper: Beeper) => {
        return Status[beeper.status] === status;
    });

    return filteredBeepers;
}