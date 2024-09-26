var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { makeBeeper } from '../services/beeperService.js';
export function createBeeper(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.name) {
                res.status(400).json({ message: "the body has to contain name" });
            }
            const newBeeper = yield makeBeeper(req.body.name);
            res.status(201).json({ newBeeper: newBeeper });
        }
        catch (error) {
            res.status(500).json({ message: "could not create a beeper due to the error: " + error.message });
        }
    });
}
