var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from 'jsonfile';
import fs from 'fs';
const DB_PATH = './data/db.json';
// gets the array of beepers and insert to it the new beeper
export function insertBeeperToJson(beeper) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const beepers = yield jsonfile.readFile(DB_PATH);
            beepers.push(beeper);
            yield jsonfile.writeFile(DB_PATH, beepers);
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
// gets the array of beepers and return it
export function readFromJsonFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const beepers = yield jsonfile.readFile(DB_PATH);
        return beepers;
    });
}
// updates specific beeper in the json file
export function updateBeeperInJson(beeper) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const beepers = yield jsonfile.readFile(DB_PATH);
            if (!beepers) {
                throw new Error("there isn't any beepers in the json file");
            }
            const beeperIndex = beepers.findIndex((b) => b.name === beeper.name && b.id === beeper.id);
            if (beeperIndex < 0) {
                throw new Error("beeper not founded while trying to update him");
            }
            beepers[beeperIndex] = beeper;
            yield jsonfile.writeFile(DB_PATH, beepers);
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
// updates the array of beepers with given beepers array 
export function writeUpdatedBeepersToJson(beepers) {
    return __awaiter(this, void 0, void 0, function* () {
        yield jsonfile.writeFile(DB_PATH, beepers);
    });
}
// make sure we'll have that json file with array
export function ensureDatabaseExist() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!fs.readFileSync(DB_PATH)) {
            yield jsonfile.writeFile(DB_PATH, []);
        }
    });
}
