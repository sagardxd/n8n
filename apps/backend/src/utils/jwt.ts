import { config } from '@repo/config'
import jwt, { type JwtPayload } from 'jsonwebtoken'

export const jwtSign = (email: string) => {
    return jwt.sign(email, config.JWT_TOKEN_PASS);
}   

export const jwtVerify = (token: string) => {
    return jwt.verify(token, config.JWT_TOKEN_PASS) as JwtPayload;
}   