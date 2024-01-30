import { Address } from "./address";

export class User {
    id:number;
    firstName:string;
    lastName:string;
    birthdate:string;
    email:string;
    password:string;
    password2:string;
    password3:string;
    telnumber:string;
    address:Address = new Address();

    constructor(){}
}
