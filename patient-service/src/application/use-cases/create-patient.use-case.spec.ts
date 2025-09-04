import { CreatePatientUseCase } from './create-patient.use-case';
import { IPatientRepository } from '@domain/interfaces/patient-repository.interface';
import { IEventPublisher } from '@domain/interfaces/event-publisher.interface';
import { Patient } from '@domain/entities/patient.entity';
import { v4 as uuidv4 } from 'uuid';

describe('CreatePatientUseCase', () => {
  let useCase: CreatePatientUseCase;
  let mockPatientRepository: jest.Mocked<IPatientRepository>;
  let mockEventPublisher: jest.Mocked<IEventPublisher>;

  beforeEach(() => {
    mockPatientRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
    };

    mockEventPublisher = {
      publishPatientCreated: jest.fn(),
    };

    useCase = new CreatePatientUseCase(mockPatientRepository, mockEventPublisher);
  });

  describe('execute', () => {
    const validPatientData = {
      name: 'John Smith',
      email: 'john.smith@example.com',
      birthdate: '1990-01-01',
    };

    it('should create a patient successfully', async () => {
      // Arrange
      mockPatientRepository.findByEmail.mockResolvedValue(null);
      const expectedPatient = new Patient(
        expect.any(String),
        validPatientData.name,
        validPatientData.email,
        new Date(validPatientData.birthdate),
      );
      mockPatientRepository.save.mockResolvedValue(expectedPatient);

      // Act
      const result = await useCase.execute(validPatientData);

      // Assert
      expect(mockPatientRepository.findByEmail).toHaveBeenCalledWith(validPatientData.email);
      expect(mockPatientRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          name: validPatientData.name,
          email: validPatientData.email,
          birthdate: new Date(validPatientData.birthdate),
        }),
      );
      expect(mockEventPublisher.publishPatientCreated).toHaveBeenCalledWith({
        patientId: expect.any(String),
        name: validPatientData.name,
        email: validPatientData.email,
        birthdate: validPatientData.birthdate,
        createdAt: expect.any(String),
      });
      expect(result).toEqual(expectedPatient);
    });

    it('should throw error if patient with email already exists', async () => {
      // Arrange
      const existingPatient = new Patient(
        uuidv4(),
        'Existing Patient',
        validPatientData.email,
        new Date('1985-01-01'),
      );
      mockPatientRepository.findByEmail.mockResolvedValue(existingPatient);

      // Act & Assert
      await expect(useCase.execute(validPatientData)).rejects.toThrow(
        'Patient with email john.smith@example.com already exists',
      );
      expect(mockPatientRepository.save).not.toHaveBeenCalled();
      expect(mockEventPublisher.publishPatientCreated).not.toHaveBeenCalled();
    });

    it('should handle repository save error', async () => {
      // Arrange
      mockPatientRepository.findByEmail.mockResolvedValue(null);
      mockPatientRepository.save.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(useCase.execute(validPatientData)).rejects.toThrow('Database error');
      expect(mockEventPublisher.publishPatientCreated).not.toHaveBeenCalled();
    });

    it('should handle event publishing error', async () => {
      // Arrange
      mockPatientRepository.findByEmail.mockResolvedValue(null);
      const savedPatient = new Patient(
        uuidv4(),
        validPatientData.name,
        validPatientData.email,
        new Date(validPatientData.birthdate),
      );
      mockPatientRepository.save.mockResolvedValue(savedPatient);
      mockEventPublisher.publishPatientCreated.mockRejectedValue(new Error('Event publishing failed'));

      // Act & Assert
      await expect(useCase.execute(validPatientData)).rejects.toThrow('Event publishing failed');
    });
  });
});
