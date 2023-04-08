import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class ApiPermissionCheckerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(!req.headers["authorization"]) throw new BadRequestException('Usuário não autorizado.');
    next();
  }
}
