import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class ApiInfoCheckerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    const { email, password } = req.body
    if (!email || !password) throw new BadRequestException('Email e/ou senha inválidos.');
    next();
  }
}
