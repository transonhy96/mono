import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthUser } from 'src/auth/auth.decorator';
import { ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Get("")
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token',
    })
    async get(@AuthUser() user) {
        console.log({ user })
    }
    @UseGuards(AuthGuard)
    @Delete()
    async remove(@AuthUser() user) {
        console.log({ user })
    }
}
