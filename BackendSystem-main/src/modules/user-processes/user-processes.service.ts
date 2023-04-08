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

  async index(token: string) {
    const userProcesses = await this.prisma.studentProcesses.findMany({
      where: {
        studentId: token
      }
    })
    
    return { status: 200, message: "Sucesso", userProcesses}
  }
}
