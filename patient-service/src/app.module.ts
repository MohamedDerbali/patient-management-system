import { Module } from '@nestjs/common';
import { PatientController } from '@infrastructure/controllers/patient.controller';
import { CreatePatientUseCase } from '@application/use-cases/create-patient.use-case';
import { DisplayPatientsUseCase } from '@application/use-cases/display-patients.use-case';
import { PatientRepository } from '@infrastructure/database/patient.repository';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { RabbitMQEventPublisher } from '@infrastructure/messaging/rabbitmq-event-publisher';
import { NotificationService } from '@infrastructure/messaging/notification.service';
import { PATIENT_REPOSITORY, EVENT_PUBLISHER } from '@domain/interfaces/injection-tokens';

@Module({
  imports: [
    // RabbitMQ module removed for demo mode
  ],
  controllers: [PatientController],
  providers: [
    PrismaService,
    CreatePatientUseCase,
    DisplayPatientsUseCase,
    NotificationService,
    {
      provide: PATIENT_REPOSITORY,
      useClass: PatientRepository,
    },
    {
      provide: EVENT_PUBLISHER,
      useClass: RabbitMQEventPublisher,
    },
  ],
})
export class AppModule {}
