import { Body, Controller, Post, Get, ValidationPipe, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreatePatientDto } from '@application/dto/create-patient.dto';
import { CreatePatientSuccessResponseDto, DisplayPatientsSuccessResponseDto, ErrorResponseDto } from '@application/dto/patient-response.dto';
import { CreatePatientUseCase } from '@application/use-cases/create-patient.use-case';
import { DisplayPatientsUseCase } from '@application/use-cases/display-patients.use-case';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly displayPatientsUseCase: DisplayPatientsUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new patient',
    description: 'Creates a new patient record and publishes a patient.created event to RabbitMQ',
  })
  @ApiBody({
    type: CreatePatientDto,
    description: 'Patient information to create',
  })
  @ApiResponse({
    status: 201,
    description: 'Patient created successfully',
    type: CreatePatientSuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error or patient already exists',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorResponseDto,
  })
  async createPatient(@Body(ValidationPipe) createPatientDto: CreatePatientDto) {
    try {
      const patient = await this.createPatientUseCase.execute({
        name: createPatientDto.name,
        email: createPatientDto.email,
        birthdate: createPatientDto.birthdate,
      });

      return {
        success: true,
        data: patient.toJSON(),
        message: 'Patient created successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          {
            success: false,
            message: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      
      throw new HttpException(
        {
          success: false,
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all patients',
    description: 'Retrieves a list of all patients ordered by creation date (most recent first)',
  })
  @ApiResponse({
    status: 200,
    description: 'Patients retrieved successfully',
    type: DisplayPatientsSuccessResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorResponseDto,
  })
  async getPatients() {
    try {
      const patients = await this.displayPatientsUseCase.execute();

      return {
        success: true,
        data: patients.map(patient => patient.toJSON()),
        message: 'Patients retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve patients',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
