import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UserProcessesService {

  constructor(private prisma: PrismaService) { }
  
  async create(token: string, processId: string) {
    const storeProcess = await this.prisma.studentProcesses.create({
      data: {
        studentId: token,
        processId
      }
    })
    
    if (!storeProcess) return { status: 500, message: "Erro ao armazenar no historico" }
    
    return { status: 200, message: "Sucesso ao armazenar no historico"}
  }

  async indexAll(token: string) {
    const isAuthorized = this.prisma.user.findFirst({
      where: {
        id: token,
      },
    });

    if (!isAuthorized || (await isAuthorized).role === 'Estudante') return { status: 401, message: 'Usuário não autorizado.' };
    
    const processes = await this.prisma.studentProcesses.findMany()

    return { status: 200, message: "Sucesso ao resgatar todos os processos.", processes}
  }

  async index(token: string) {
    const userProcesses = await this.prisma.studentProcesses.findMany({
      where: {
        studentId: token
      }
    })
    
    return { status: 200, message: "Sucesso", userProcesses}
  }
}
