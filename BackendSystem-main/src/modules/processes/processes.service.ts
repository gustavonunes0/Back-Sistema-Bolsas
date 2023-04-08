import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ProcessesDTO } from './process.dto';

@Injectable()
export class ProcessesService {

  constructor(private prisma: PrismaService) { }
  
  async create(data: ProcessesDTO, token: string) {

    const isValidCreator = await this.prisma.user.findFirst({
      where: {
        id: token
      }
    })

    if (!isValidCreator) return { status: 400, message: "Autorização não permitida!" }
    
    if (isValidCreator.role === "Estudante") return { status: 400, message: 'Autorização não permitida!' };

    const process = await this.prisma.selection_Process.create({
      data: {
        name: data.name,
        description: data.description || '',
        startDate: new Date(data.startDate) || null,
        endDate: new Date(data.endDate) || null,
        spots: data.spots || 0,
        scholarships: data.scholarships || 0,
        course: data.course,
        creatorId: token,
        status: data.status || "Aberto"
      }
    })

    if (!process) return { status: 500, message: "Erro ao criar o processo, tente novamente." }
    
    return { status: 201, message: "Processo criado com sucesso!" }
  }

  async indexOne(processId: string) {
    return await this.prisma.selection_Process.findFirst({
      where: {
        id: processId
      }
    })
  }

  async indexAll() {

    return await this.prisma.selection_Process.findMany();
  }

  async close(token: string, processId: string) {
    const isAuthorized = this.prisma.user.findFirst({
      where: {
        id: token
      }
    })

    if (!isAuthorized || (await isAuthorized).role === "Estudante") return { status: 401, message: "Usuário não autorizado." }

    await this.prisma.selection_Process.update({
      where: {
        id: processId
      },
      data: {
        status: "Fechado"
      }
    })

    return {status: 200, message: "Processo fechado com sucesso!"}
  }
}
