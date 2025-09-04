import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CreatePatientRequest {
  name: string;
  email: string;
  birthdate: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  birthdate: string;
  createdAt: string;
}

export interface CreatePatientResponse {
  success: boolean;
  data: Patient;
  message: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}

export const patientApi = {
  createPatient: async (data: CreatePatientRequest): Promise<CreatePatientResponse> => {
    try {
      const response = await api.post<CreatePatientResponse>('/patients', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to create patient');
      }
      throw new Error('Network error occurred');
    }
  },
};
