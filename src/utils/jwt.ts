import * as jwt from 'jsonwebtoken';
import { APP_CONFIG } from 'src/configs';
export const jwt_sign = async (payload: any) => {
    return jwt.sign(payload, process.env.SECRET, {
        expiresIn: APP_CONFIG.JWT_EXPIRED
    })
}