var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from 'uuid';
import { Status } from '../types/type.js';
import { insertBeeperToJson, readFromJsonFile, updateBeeperInJson, writeUpdatedBeepersToJson } from '../DAL/jsonBeepers.js';
import { coordinates } from '../constantVariables/constants.js';
let timeoutIdList = [];
export function makeBeeper(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const newBeeper = {
            id: uuidv4(),
            name: name,
            status: Status.manufactured,
            created_at: new Date()
        };
        yield insertBeeperToJson(newBeeper);
        return newBeeper;
    });
}
export function getSpecificBeeper(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const beepers = yield readFromJsonFile();
        if (!beepers) {
            throw new Error("there isn't any beepers in the jsom file");
        }
        const beeperIndex = beepers.findIndex((b) => b.id === id);
        return beepers[beeperIndex] ? beepers[beeperIndex] : null;
    });
}
export function deleteSpecificBeeper(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const myBeepers = yield readFromJsonFile();
        if (!myBeepers) {
            throw new Error("there isn't any beepers in the jsom file");
        }
        const beeperIndex = myBeepers.findIndex((b) => b.id === id);
        if (beeperIndex < 0) {
            throw new Error("beeper with that id didn't found so it can't be deleted");
        }
        if (myBeepers[beeperIndex].status == Status.deployed) {
            const timeOutIndex = timeoutIdList.findIndex((val) => val.beeperId === myBeepers[beeperIndex].id);
            clearTimeout(timeoutIdList[timeOutIndex].timeOutId);
            timeoutIdList.splice(timeOutIndex, 1);
        }
        myBeepers.splice(beeperIndex, 1);
        yield writeUpdatedBeepersToJson(myBeepers);
    });
}
export function searchBeepersByStatus(status) {
    return __awaiter(this, void 0, void 0, function* () {
        const myBeepers = yield readFromJsonFile();
        if (!myBeepers) {
            throw new Error("there isn't any beepers in the json file at all");
        }
        const filteredBeepers = myBeepers.filter((beeper) => {
            return Status[beeper.status] === status;
        });
        return filteredBeepers;
    });
}
export function handleUpdateStatus(id, lon, lat) {
    return __awaiter(this, void 0, void 0, function* () {
        const beeper = yield getSpecificBeeper(id);
        if (!beeper) {
            throw new Error("there isn't beeper with this id");
        }
        if (beeper.status >= Status.deployed) {
            throw new Error("the beeper was already deployed");
        }
        if (beeper.status == Status.shipped) {
            if (!isValidLocation(lon, lat)) {
                throw new Error("you need to insert valid coordinates");
            }
            beeper.status += 1;
            beeper.longitude = lon;
            beeper.latitude = lat;
            yield updateBeeperInJson(beeper);
            deployBeeper(beeper, lat, lon);
        }
        else {
            beeper.status += 1;
            yield updateBeeperInJson(beeper);
        }
    });
}
function deployBeeper(beeper, lat, lon) {
    const timeOutId = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
        beeper.status += 1;
        beeper.detonated_at = new Date();
        yield updateBeeperInJson(beeper);
    }), 10000);
    timeoutIdList.push({ beeperId: beeper.id, timeOutId: timeOutId });
}
function isValidLocation(lon, lat) {
    if (!lon || !lat)
        return false;
    const locationIndex = coordinates.findIndex((val) => {
        return val.lat == lat && val.lon == lon;
    });
    if (locationIndex < 0)
        return false;
    return true;
}
