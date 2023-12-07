import { User, UserRole } from "./user.model";

const SALT = "kjfkfdfkfkllkfd";

const users: User[] = [
    { id: 1, email: "admin@simpletask", passwordHash: '', firstName: "Admin", lastName: "Admin", role: "Admin"},
    { id: 2, email: "user@simpletask", passwordHash: '', firstName: "Jan", lastName: "Kowalski", role: "Regular"},
];

export const verifyUser = (email: string, password: string): User|null => {
    const user = users.find(u => u.email === email);
    if (user && user.passwordHash === createHash(password)){
        return user;
    }
    return null;
};

export const checkUserPermission = (userId: number, role: UserRole): boolean => {
    const user = users.find(u => u.id === userId);
    return user?.role === role;
}

const createHash = (password: string): string => {
    return CryptoJS.HmacSHA256(password, SALT).toString();
}