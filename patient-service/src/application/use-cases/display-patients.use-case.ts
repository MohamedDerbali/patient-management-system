import { Injectable, Inject } from '@nestjs/common';
import { IPatientRepository } from '@domain/interfaces/patient-repository.interface';
import { PATIENT_REPOSITORY } from '@domain/interfaces/injection-tokens';
import { Patient } from '@domain/entities/patient.entity';

@Injectable()
export class DisplayPatientsUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: IPatientRepository,
  ) {}

  async execute(): Promise<Patient[]> {
    try {
      const patients = await this.patientRepository.findAll();
      return patients;
    } catch (error) {
      throw new Error('Failed to retrieve patients');
    }
  }
}
