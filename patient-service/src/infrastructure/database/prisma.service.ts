import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService {
  // Mock Prisma service for demo - no database connection required
  patient = {
    create: async (data: any) => ({
      id: Math.random().toString(36).substr(2, 9),
      ...data.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    findMany: async () => [],
    findUnique: async (params: any) => null,
    update: async (params: any) => ({ id: params.where.id, ...params.data }),
    delete: async (params: any) => ({ id: params.where.id }),
  };
}
