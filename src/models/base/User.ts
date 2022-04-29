import { Role } from '../enums/Role';

export interface User {
    id: string;
    name: string;
    role: Role;
    username: string;
    password: string;
}
