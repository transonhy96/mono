import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { APP_CONFIG } from 'src/configs';
@Injectable()
export class JwtService {

    async sign(payload: JwtPayload) {
        return jwt.sign(payload, process.env.SECRET, {
            expiresIn: APP_CONFIG.JWT_EXPIRED
        })
    }

    async decode(token: string) {
        return jwt.decode(token)
    }

    async verify(token: string) {
        return jwt.verify(token, process.env.SECRET)
    }
}
