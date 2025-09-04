import { Injectable, Logger } from '@nestjs/common';
import { IEventPublisher, PatientCreatedEvent } from '@domain/interfaces/event-publisher.interface';

@Injectable()
export class RabbitMQEventPublisher implements IEventPublisher {
  private readonly logger = new Logger(RabbitMQEventPublisher.name);

  async publishPatientCreated(event: PatientCreatedEvent): Promise<void> {
    // Mock event publisher for demo - no RabbitMQ connection required
    this.logger.log(`[DEMO MODE] Published patient created event for patient ${event.patientId}`);
    this.logger.log(`[DEMO MODE] Event details: ${JSON.stringify(event, null, 2)}`);
  }
}
