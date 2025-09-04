import { ApiProperty } from '@nestjs/swagger';

export class PatientResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the patient',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Full name of the patient',
    example: 'John Smith',
  })
  name: string;

  @ApiProperty({
    description: 'Email address of the patient',
    example: 'john.smith@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Birth date of the patient in ISO format',
    example: '1990-01-01T00:00:00.000Z',
  })
  birthdate: string;

  @ApiProperty({
    description: 'Timestamp when the patient was created',
    example: '2024-03-15T14:30:00.000Z',
  })
  createdAt: string;
}

export class CreatePatientSuccessResponseDto {
  @ApiProperty({
    description: 'Indicates if the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Patient data',
    type: PatientResponseDto,
  })
  data: PatientResponseDto;

  @ApiProperty({
    description: 'Success message',
    example: 'Patient created successfully',
  })
  message: string;
}

export class DisplayPatientsSuccessResponseDto {
  @ApiProperty({
    description: 'Indicates if the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Array of patients',
    type: [PatientResponseDto],
  })
  data: PatientResponseDto[];

  @ApiProperty({
    description: 'Success message',
    example: 'Patients retrieved successfully',
  })
  message: string;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Indicates if the operation was successful',
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'Error message',
    example: 'Patient with email john.smith@example.com already exists',
  })
  message: string;
}
