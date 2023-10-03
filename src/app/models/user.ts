import { Client } from "./client";
import { Company } from "./company";
import { Permissions } from "./permissions";
import { Role } from "./role";

export class User {
    id : string;
    email : string;
    password : string;
    name: string;
    picture: string;
    companyPosition : string;
    dni : string;
    country : string;
    city : string;    
    address : string;
    phone : string;
    mainSecondaryUser : number;
    canBuy : number;
    isCoorporative : number;
    isActive : boolean;
    createdAt : string;
    updatedAt: string;
    admin : any;
    client : any;
    supplier : any;
    company: Company;
    roles: Role[];
    permissions: Permissions[];
    clients: Client[];
    privileges: [];
}