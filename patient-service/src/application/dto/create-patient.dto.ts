import { IsEmail, IsNotEmpty, IsDateString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({
    description: 'Full name of the patient',
    example: 'John Smith',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(255, { message: 'Name cannot exceed 255 characters' })
  name: string;

  @ApiProperty({
    description: 'Email address of the patient',
    example: 'john.smith@example.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    description: 'Birth date of the patient in ISO date format',
    example: '1990-01-01',
    format: 'date',
  })
  @IsDateString({}, { message: 'Invalid birthdate format' })
  birthdate: string;
}
