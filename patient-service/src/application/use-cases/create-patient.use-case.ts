import { Injectable, Inject } from '@nestjs/common';
import { Patient } from '@domain/entities/patient.entity';
import { IPatientRepository } from '@domain/interfaces/patient-repository.interface';
import { IEventPublisher, PatientCreatedEvent } from '@domain/interfaces/event-publisher.interface';
import { PATIENT_REPOSITORY, EVENT_PUBLISHER } from '@domain/interfaces/injection-tokens';
import { v4 as uuidv4 } from 'uuid';

export interface CreatePatientRequest {
  name: string;
  email: string;
  birthdate: string;
}

@Injectable()
export class CreatePatientUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: IPatientRepository,
    @Inject(EVENT_PUBLISHER)
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async execute(request: CreatePatientRequest): Promise<Patient> {
    // Check if patient with email already exists
    const existingPatient = await this.patientRepository.findByEmail(request.email);
    if (existingPatient) {
      throw new Error(`Patient with email ${request.email} already exists`);
    }

    // Create patient entity
    const patient = new Patient(
      uuidv4(),
      request.name,
      request.email,
      new Date(request.birthdate),
    );

    // Save patient
    const savedPatient = await this.patientRepository.save(patient);

    // Publish domain event
    const event: PatientCreatedEvent = {
      patientId: savedPatient.id,
      name: savedPatient.name,
      email: savedPatient.email,
      birthdate: request.birthdate,
      createdAt: savedPatient.createdAt.toISOString(),
    };

    await this.eventPublisher.publishPatientCreated(event);

    return savedPatient;
  }
}
