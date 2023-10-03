export class Profile {
    user: {
        userId: string;
        username: string;
        dni: string;
        city: string;
        address: string;
    };
    company : {
        companyId: string;
        billingEmail: string;
        nit: string;
    };
    roles : [ { name : string; }];
    permissions : [ { name : string; }];
}