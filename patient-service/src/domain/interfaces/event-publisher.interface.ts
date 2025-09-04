export interface PatientCreatedEvent {
  patientId: string;
  name: string;
  email: string;
  birthdate: string;
  createdAt: string;
}

export interface IEventPublisher {
  publishPatientCreated(event: PatientCreatedEvent): Promise<void>;
}
