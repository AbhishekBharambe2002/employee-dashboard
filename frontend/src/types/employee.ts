import { Department } from "./department";


export interface Employee {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    department: Department;
    supervisor?: string;
    country: string;
    state: string;
    city: string;
}
