import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashingService {
    async gen_hash(pwd: string): Promise<string> {
        return bcrypt.hash(pwd, 10);
    }
    async compare_hash(pwd: string, hash: string): Promise<boolean> {
        return bcrypt.compare(pwd, hash);
    }
}
