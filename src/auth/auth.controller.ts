import { Body, Controller, HttpCode, Get, Post, Res, Query } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { OkRespone } from 'src/commons/okResponse';
import { AuthService } from './auth.service';
import { UserRefreshToken } from './dto/refresh-token.dto';
import { RegisterUserDto } from './dto/register.dto';
import { UserLoginDto } from './dto/userLogin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() req: UserLoginDto) {
        return this.authService.login(req.username, req.password);
    }

    @Post('refresh_token')
    refreshToken(@Body() req: UserRefreshToken) {
        return this.authService.refreshToken(req);
    }

    // @Post('register')
    // async register(@Body() info: RegisterUserDto) {
    //     const result = await this.authService.register(info);
    //     return new OkRespone({
    //         data: {
    //             _id: result._id,
    //             username: result.username,
    //             role: result.role,
    //         }
    //     });
    // }

}
