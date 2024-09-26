import {v4 as uuidv4} from 'uuid';
import { Beeper, Status } from '../types/type.js';
import { insertBeeperToJson, readFromJsonFile } from '../DAL/jsonBeepers.js';

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
    const beeperIndex =  beepers.findIndex((b: Beeper) => b.id === id);
    return beepers[beeperIndex]? beepers[beeperIndex]: null;
}