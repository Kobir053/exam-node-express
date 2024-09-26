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
import { insertBeeperToJson } from '../DAL/jsonBeepers.js';
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
