import { Patient } from '../entities/patient.entity';

export interface IPatientRepository {
  save(patient: Patient): Promise<Patient>;
  findById(id: string): Promise<Patient | null>;
  findByEmail(email: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
}
