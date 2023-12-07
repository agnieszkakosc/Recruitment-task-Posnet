import { User } from "./user.model";

const SALT = "kjfkfdfkfkllkfd";

const users: User[] = [
    { id: 1, email: "admin@simpletask", passwordHash: '', firstName: "Admin", lastName: "Admin", userRole: "Admin"},
    { id: 2, email: "user@simpletask", passwordHash: '', firstName: "Jan", lastName: "Kowalski", userRole: "Regular"},
];

export const verify = (email: string, password: string): User|null => {
    const user = users.find(u => u.email === email);
    if (user && user.passwordHash === createHash(password)){
        return user;
    }
    return null;
};

const createHash = (password: string): string => {
    return CryptoJS.HmacSHA256(password, SALT).toString();
}