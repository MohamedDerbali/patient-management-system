import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PatientCreatedEvent } from '@domain/interfaces/event-publisher.interface';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  @RabbitSubscribe({
    exchange: 'patient',
    routingKey: 'patient.created',
    queue: 'notification.patient.created',
  })
  async handlePatientCreated(event: PatientCreatedEvent): Promise<void> {
    this.logger.log(`📩 New patient registered: ${event.name}`);
    
    // Here you could add additional notification logic like:
    // - Send email
    // - Send SMS
    // - Push notification
    // - Update analytics
    
    this.logger.log(`Notification processed for patient ${event.patientId}`);
  }
}
