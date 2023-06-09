import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    @Post("/signup")
    async signup(@Body() body: SignupDto) {
        return this.authService.signup(body);
    }
    @Post("/login")
    async login(@Body() body: SignupDto) {
        return this.authService.login(body);
    }
}
