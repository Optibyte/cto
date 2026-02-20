import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.account.findMany({
      include: {
        market: true,
        teams: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.account.findUnique({
      where: { id },
      include: {
        market: true,
        teams: true,
      },
    });
  }
}
