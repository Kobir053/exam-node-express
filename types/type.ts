export interface Beeper {
    id?: string;
    name: string;
    status: Status;
    created_at: Date;
    detonated_at?: Date;
    longitude?: number;
    latitude?: number;
}

export enum Status {
    manufactured,
    assembled,
    shipped,
    deployed,
    detonated
};

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