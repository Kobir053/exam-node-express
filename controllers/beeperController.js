var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Status } from '../types/type.js';
import { deleteSpecificBeeper, getSpecificBeeper, handleUpdateStatus, makeBeeper, searchBeepersByStatus } from '../services/beeperService.js';
import { readFromJsonFile } from '../DAL/jsonBeepers.js';
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
export function getAllBeepers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const beepers = yield readFromJsonFile();
            if (!beepers) {
                res.status(404).json({ message: "didn't found any beepers" });
            }
            res.status(200).json({ beepers: beepers });
        }
        catch (error) {
            res.status(500).json({ message: "couldn't get all beepers due to error: " + error.message });
        }
    });
}
export function getBeeperById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const myBeeper = yield getSpecificBeeper(req.params.id);
            if (!myBeeper) {
                res.status(404).json({ message: "didn't found a beeper with this id" });
                return;
            }
            res.status(200).json({ myBeeper: myBeeper });
        }
        catch (error) {
            res.status(500).json({ message: "couldn't get beeper by id due to error: " + error.message });
        }
    });
}
export function deleteBeeperById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id) {
                res.status(400).json({ message: "please enter id in params of url" });
                return;
            }
            const myBeeper = yield getSpecificBeeper(req.params.id);
            if (!myBeeper) {
                res.status(404).json({ message: "didn't found a beeper with this id" });
                return;
            }
            yield deleteSpecificBeeper(req.params.id);
            res.status(200).json({ message: "deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
export function getBeepersByStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.status) {
                res.status(400).json({ message: "please enter a status in the params of url" });
                return;
            }
            // checks if the status that sent in the params is valid
            if (!Object.keys(Status).includes(req.params.status)) {
                res.status(400).json({ message: "This status is not valid" });
                return;
            }
            const specificBeepers = yield searchBeepersByStatus(req.params.status);
            if (specificBeepers.length == 0) {
                res.status(404).json({ message: "didn't found any beepers with that status" });
                return;
            }
            res.status(200).json({ beepersByStatus: specificBeepers });
        }
        catch (error) {
            res.status(500).json({ message: "couldn't get beepers by status due to error: " + error.message });
        }
    });
}
export function updateStatusById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id) {
                res.status(400).json({ message: "please enter id in the url params" });
                return;
            }
            const longitude = req.body.longitude;
            const latitude = req.body.latitude;
            yield handleUpdateStatus(req.params.id, longitude, latitude);
            res.status(200).json({ message: "status updated successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "could not update the status for the beeper due to error: " + error.message });
        }
    });
}
