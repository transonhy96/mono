import * as jwt from 'jsonwebtoken';
import { APP_CONFIG } from 'src/configs';
export interface JwtPayload {
    id: Number
    email: string
}
export const jwt_sign = async (payload: JwtPayload) => {
    return jwt.sign(payload, process.env.SECRET, {
        expiresIn: APP_CONFIG.JWT_EXPIRED
    })
}

export const jwt_decode = async (token: string) => {
    return jwt.decode(token)
}

export const jwt_verify = async (token: string) => {
    return jwt.verify(token, process.env.SECRET)
}