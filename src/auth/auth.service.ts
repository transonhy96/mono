import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/auth.dto';
import { get_app_exeption } from 'src/utils/error';
import { AppError } from 'src/configs/constants';
import { jwt_sign } from 'src/utils/jwt';
import { compare_hash, gen_hash } from 'src/utils/hashing';
import { dev } from 'src/configs';
import { CreateUserReponseDto } from 'src/user/dto/user.dto';
@Injectable()
export class AuthService {

    constructor(private userService: UserService) { }

    async signup(body: SignupDto): Promise<CreateUserReponseDto> {
        let { email, password } = body;
        let existed = await this.userService.get_user_by_email(email);
        if (existed) throw get_app_exeption(AppError.EMAIL_EXISTED);
        let password_hash = await gen_hash(password);
        if (password_hash) {
            let user = await this.userService.create_user({
                email,
                password: password_hash
            });
            let user_token = await jwt_sign({
                id: user.id,
                email: user.email
            });
            return {
                email,
                id: user.id,
                token: user_token
            };
        }
    }

    async login(body: SignupDto) {
        let { email, password } = body;
        let existed = await this.userService.get_user_by_email(email);
        if (!existed) throw dev() ? get_app_exeption(AppError.USER_NOT_EXISTED) : get_app_exeption(AppError.GENERIC);
        let match = await compare_hash(password, existed.password);
        if (!match) throw dev() ? get_app_exeption(AppError.INCORRECT_PASSWORD) : get_app_exeption(AppError.GENERIC);
        const token = await jwt_sign({
            id: existed.id,
            email: existed.email
        });
        return {
            token
        };
    }
}
