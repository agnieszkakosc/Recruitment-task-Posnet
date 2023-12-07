export type UserRole = "Admin" | "Regular";

export interface User {
    id: number;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: UserRole
}

export interface UserToken {
    userId: number;
    email: string;
    role: UserRole;
}