import { Address } from "./address";

export class User {
    id:number|undefined;
    firstName:string|undefined;
    lastName:string|undefined;
    email:string|undefined;
    password:string|undefined;
    password2:string|undefined;
    password3:string|undefined;
    telnumber:string|undefined;
    address:Address|undefined;

    constructor(){}
}
