import {v4 as uuidv4} from 'uuid';
import { Beeper, Status } from '../types/type.js';
import { insertBeeperToJson, readFromJsonFile, updateBeeperInJson, writeUpdatedBeepersToJson } from '../DAL/jsonBeepers.js';
import { coordinates } from '../constantVariables/constants.js';

let timeoutIdList: {beeperId: string, timeOutId: NodeJS.Timeout}[] = [];

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

    if(myBeepers[beeperIndex].status == Status.deployed){
        const timeOutIndex = timeoutIdList.findIndex((val) => val.beeperId === myBeepers[beeperIndex].id);
        clearTimeout(timeoutIdList[timeOutIndex].timeOutId);
        timeoutIdList.splice(timeOutIndex, 1);
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

export async function handleUpdateStatus(id: string, lon: number | null, lat: number | null) {
    const beeper: Beeper | null = await getSpecificBeeper(id);
    if(!beeper){
        throw new Error("there isn't beeper with this id");
    }
    if(beeper.status >= Status.deployed){
        throw new Error("the beeper was already deployed");
    }
    if(beeper.status == Status.shipped){
        if(!isValidLocation(lon, lat)){
            throw new Error("you need to insert valid coordinates");
        }
        beeper.status += 1;
        beeper.longitude = lon!;
        beeper.latitude = lat!;
        await updateBeeperInJson(beeper);
        deployBeeper(beeper, lat!, lon!);
    }
    else{
        beeper.status += 1;
        await updateBeeperInJson(beeper);
    }
}

function deployBeeper(beeper: Beeper, lat: number, lon: number) {
    const timeOutId = setTimeout( async() => {
        beeper.status += 1;
        beeper.detonated_at = new Date();
        await updateBeeperInJson(beeper);
    }, 10000);
    timeoutIdList.push({beeperId: beeper.id!,timeOutId: timeOutId});
}

function isValidLocation(lon: number | null, lat: number | null){

    if(!lon || !lat)
        return false;

    const locationIndex = coordinates.findIndex((val) => {
        return val.lat == lat && val.lon == lon
    })
    if(locationIndex < 0)
        return false;
    return true;
}