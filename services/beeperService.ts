import {v4 as uuidv4} from 'uuid';
import { Beeper, Status } from '../types/type.js';
import { insertBeeperToJson, readFromJsonFile, updateBeeperInJson, writeUpdatedBeepersToJson } from '../DAL/jsonBeepers.js';
import { coordinates } from '../constantVariables/constants.js';

let timeoutIdList: {beeperId: string, timeOutId: NodeJS.Timeout}[] = [];

// create a beeper
export async function makeBeeper (name: string) : Promise<Beeper> {

    // initialize a beeper
    const newBeeper: Beeper = {
        id: uuidv4(),
        name: name,
        status: Status.manufactured,
        created_at: new Date()
    };

    // insert the beeper to the json file
    await insertBeeperToJson(newBeeper);
    return newBeeper;
}

// gets an id and return beeper with that id or null if it didn't found
export async function getSpecificBeeper (id: string) : Promise<Beeper | null> {

    const beepers: Beeper[] = await readFromJsonFile();
    if(!beepers){
        throw new Error("there isn't any beepers in the jsom file");
    }

    const beeperIndex =  beepers.findIndex((b: Beeper) => b.id === id);
    return beepers[beeperIndex]? beepers[beeperIndex]: null;
}

// gets an id and delete the beeper with that id
export async function deleteSpecificBeeper(id: string) {

    // get the beepers array from the json file and checks if there are any beepers in there
    const myBeepers: Beeper[] = await readFromJsonFile();
    if(!myBeepers){
        throw new Error("there isn't any beepers in the jsom file");
    }

    // search beeper by id and checks if there are beeper with that id
    const beeperIndex = myBeepers.findIndex((b: Beeper) => b.id === id);
    if(beeperIndex < 0){
        throw new Error("beeper with that id didn't found so it can't be deleted");
    }

    // if the beeper is in progress to detonate then it clears the timeout and delete it from the list of timeouts
    if(myBeepers[beeperIndex].status == Status.deployed){
        const timeOutIndex = timeoutIdList.findIndex((val) => val.beeperId === myBeepers[beeperIndex].id);
        clearTimeout(timeoutIdList[timeOutIndex].timeOutId);
        timeoutIdList.splice(timeOutIndex, 1);
    }

    // delete that beeper from the beepers array
    myBeepers.splice(beeperIndex, 1);
    // updates the array of beepers in the json file
    await writeUpdatedBeepersToJson(myBeepers);
}

// gets a status and returns list of beepers that are with this status
export async function searchBeepersByStatus(status: string) : Promise<Beeper[]> {

    const myBeepers: Beeper[] = await readFromJsonFile();
    if(!myBeepers){
        throw new Error("there isn't any beepers in the json file at all");
    }
    
    // get array of beepers that have status on specific status
    const filteredBeepers = myBeepers.filter((beeper: Beeper) => {
        return Status[beeper.status] === status;
    });

    return filteredBeepers;
}
// handle updating status
export async function handleUpdateStatus(id: string, lon: number | null, lat: number | null) {

    const beeper: Beeper | null = await getSpecificBeeper(id);
    if(!beeper){
        throw new Error("there isn't beeper with this id");
    }

    // if the beeper has been deployed then it can't change from API
    if(beeper.status >= Status.deployed){
        throw new Error("the beeper was already deployed");
    }

    // if the API want to deploy the beeper..
    if(beeper.status == Status.shipped){
        // if the location is not valid throw an error
        if(!isValidLocation(lon, lat)){
            throw new Error("you need to insert valid coordinates");
        }
        // updates the beeper status and set its location
        beeper.status += 1;
        beeper.longitude = lon!;
        beeper.latitude = lat!;
        // update the beeper in the json file
        await updateBeeperInJson(beeper);
        // set timer to the beeper to detonate it
        deployBeeper(beeper, lat!, lon!);
    }
    // if its status is manufactured or assembled
    else{
        beeper.status += 1;
        await updateBeeperInJson(beeper);
    }
}

// function for this service that sets timer for beeper to expload and insert the timeoutID to list of timeouts
function deployBeeper(beeper: Beeper, lat: number, lon: number) {
    const timeOutId = setTimeout( async() => {
        beeper.status += 1;
        beeper.detonated_at = new Date();
        await updateBeeperInJson(beeper);
    }, 10000);
    timeoutIdList.push({beeperId: beeper.id!,timeOutId: timeOutId});
}

// function for this service that checks if the variables are valid, and if they match..
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