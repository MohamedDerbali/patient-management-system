import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Patient } from '@domain/entities/patient.entity';
import { IPatientRepository } from '@domain/interfaces/patient-repository.interface';

@Injectable()
export class PatientRepository implements IPatientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(patient: Patient): Promise<Patient> {
    const savedPatient = await this.prisma.patient.create({
      data: {
        id: patient.id,
        name: patient.name,
        email: patient.email,
        birthdate: patient.birthdate,
        createdAt: patient.createdAt,
      },
    });

    return new Patient(
      savedPatient.id,
      savedPatient.name,
      savedPatient.email,
      savedPatient.birthdate,
      savedPatient.createdAt,
    );
  }

  async findById(id: string): Promise<Patient | null> {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      return null;
    }

    return new Patient(
      patient.id,
      patient.name,
      patient.email,
      patient.birthdate,
      patient.createdAt,
    );
  }

  async findByEmail(email: string): Promise<Patient | null> {
    const patient = await this.prisma.patient.findUnique({
      where: { email },
    });

    if (!patient) {
      return null;
    }

    return new Patient(
      patient.id,
      patient.name,
      patient.email,
      patient.birthdate,
      patient.createdAt,
    );
  }

  async findAll(): Promise<Patient[]> {
    const patients = await this.prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return patients.map(
      (patient) =>
        new Patient(
          patient.id,
          patient.name,
          patient.email,
          patient.birthdate,
          patient.createdAt,
        ),
    );
  }
}
