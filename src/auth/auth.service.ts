import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserRole, UserToken } from "../users/user.model";
import { checkUserPermission } from "../users/user.service";

export const PRIVATE_KEY: Secret = 'wwassytgjgfklgfkllktryrysu';

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const verifyAuthorization = (request: Request, response: Response, next: NextFunction) => {
    const token = getAuthorizationToken(request);
    if (token) {
        const verifiedToken = jwt.verify(token, PRIVATE_KEY);
        (request as CustomRequest).token = verifiedToken;
        return next();
    }
    return response.status(401).send();
};

export const verifyPermission = (userRole: UserRole) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request.body.token;
        if (checkUserPermission(userId, userRole)) {
            return next();
        } else {
            return response.status(403).send();
        }
    };
};

export const createToken = (userToken: UserToken): string => {
    return jwt.sign(userToken, PRIVATE_KEY);
}

const getAuthorizationToken = (request: Request): string | undefined => {
    const authHeader = request.header('Authorization');
    if (authHeader) {
        const authHeaderParts = authHeader.split(' ');
        if (authHeaderParts[0] !== 'Bearer'){
            return undefined;
        }
        return authHeader[1];
    }
    return authHeader;
};