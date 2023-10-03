import { User } from "./user";

export class Client {
    id : string;
    legalStatus: string;
    isCoorporative: string;
    employeesNumber : string;
    contactName : string;
    contactPersonPicture : string;
    contactPersonPosition : string;    
    contactPersonDni : string;
    contactPersonCountry : string;
    contactPersonCity : string;
    contactPersonAddress : string;
    contactPersonEmail : string;
    contactPersonPhone: string;
    margin: number;
    paymentTerms: number;
    annualSalesGoal : number;
    annualMonthlyGoals : number;
    insideUsers : string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    users: User[];
}