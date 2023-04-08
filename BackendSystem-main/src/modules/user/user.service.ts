import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ name, email, password, role }: UserDTO) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) return { status: 400, message: 'Email já registrado.' };

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        role: role || 'Estudante',
        course: '',
        historic: '',
      },
    });

    if (!user) return { status: 400, message: 'Erro ao criar usuário' };

    return { status: 201, message: 'Usuário registrado com sucesso!' };
  }

  async indexAll(token: string) {
    const isAuthorized = this.prisma.user.findFirst({
      where: {
        id: token,
      },
    });

    if (!isAuthorized || (await isAuthorized).role === 'Estudante')
      return { status: 401, message: 'Usuário não autorizado.' };

    const users = await this.prisma.user.findMany();

    return { status: 200, message: 'Sucesso ao resgatar ususários', users };
  }

  async indexOne(token: string) {
    const user: UserDTO = await this.prisma.user.findFirst({
      where: {
        id: token,
      },
    });

    if (!user) return { status: 404, message: 'Usuário não encontrado.' };

    return { status: 200, token, user };
  }

  async login({ name, email, password }: UserDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        name,
        email,
        password,
      },
    });

    if (!user) return { status: 404, message: 'Usuário não encontrado.' };

    return { status: 200, token: user.id, user: { name, email } };
  }
}
