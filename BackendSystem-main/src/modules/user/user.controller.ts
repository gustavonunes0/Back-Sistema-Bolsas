import { Body, Post, Get, Res, Headers, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  @Post("register")
  async create(@Body() data: UserDTO, @Res() res: Response) {
    const query = await this.userService.create(data)
    res.statusCode = query.status
    res.json(query).send()
  }

  @Get()
  async indexOne(@Headers("authorization") token: string, @Res() res: Response) {
    if(!token) return res.statusCode = 404, res.json({message: "Token inválido"}).send()
    const query = await this.userService.indexOne(token)
    res.statusCode = query.status
    res.json(query).send()
  }

  @Post("login")
  async login(@Body() data: UserDTO, @Res() res: Response) {
    const query = await this.userService.login(data)
    res.statusCode = query.status
    res.json(query).send()
  }
}
