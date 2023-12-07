export type UserRole = "Admin" | "Regular";

export interface UserLogin {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: UserRole
}