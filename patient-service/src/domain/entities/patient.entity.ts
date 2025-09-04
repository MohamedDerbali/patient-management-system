export class Patient {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly birthdate: Date,
    public readonly createdAt: Date = new Date(),
  ) {
    this.validateName(name);
    this.validateEmail(email);
    this.validateBirthdate(birthdate);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Patient name cannot be empty');
    }
    if (name.length > 255) {
      throw new Error('Patient name cannot exceed 255 characters');
    }
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  private validateBirthdate(birthdate: Date): void {
    if (!birthdate) {
      throw new Error('Birthdate is required');
    }
    if (birthdate > new Date()) {
      throw new Error('Birthdate cannot be in the future');
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      birthdate: this.birthdate.toISOString(),
      createdAt: this.createdAt.toISOString(),
    };
  }
}
