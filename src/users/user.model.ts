export type UserRole = "Admin" | "Regular";

export interface User {
    id: number;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    userRole: UserRole
}