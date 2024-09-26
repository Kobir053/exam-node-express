export var Status;
(function (Status) {
    Status[Status["manufactured"] = 0] = "manufactured";
    Status[Status["assembled"] = 1] = "assembled";
    Status[Status["shipped"] = 2] = "shipped";
    Status[Status["deployed"] = 3] = "deployed";
    Status[Status["detonated"] = 4] = "detonated";
})(Status || (Status = {}));
;
// export function getCurrentTime () : string {
//     const dateObj = new Date();
//     const year = dateObj.getFullYear();
//     const month = dateObj.getMonth();
//     const day = dateObj.getDate();
//     const hour = dateObj.getHours();
//     const minutes = dateObj.getMinutes();
//     const seconds = dateObj.getSeconds();
//     return `Date: ${day}/${month}/${year}. Time: ${hour}:${minutes}:${seconds}`;
// }
