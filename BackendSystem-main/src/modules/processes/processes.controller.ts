import { Body, Post, Get, Res, Headers, Controller } from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { ProcessesDTO } from './process.dto';
import { Response } from 'express';

@Controller('processes')
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) { }
  
  @Post()
  async create(@Body() data: ProcessesDTO, @Headers("authorization") token: string, @Res() res: Response) {
    const query = await this.processesService.create(data, token);
    res.statusCode = query.status;
    res.json(query).send();
  }

  @Get()
  async indexAll() {
    return await this.processesService.indexAll()
  }
}
