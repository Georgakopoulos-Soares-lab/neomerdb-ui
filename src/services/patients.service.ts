import type {
  CancerTypesResponse,
  PatientDetailsResponse,
  PatientNeomersResponse,
  PatientResponse,
} from '../types/patients';
import httpClient from './http-client';

export const fetchGenomesPatients = async (): Promise<PatientResponse> => {
  const { data } = await httpClient.get('/donor_data');
  return data;
};

export const fetchExomesPatients = async (): Promise<PatientResponse> => {
  const { data } = await httpClient.get('/exomes_donor_data');
  return data;
};

export const fetchCancerTypesPatients = async (): Promise<CancerTypesResponse> => {
  const { data } = await httpClient.get('/cancer_types');
  return data;
};

export const fetchGPatientDetails = async (patientId: string): Promise<PatientDetailsResponse> => {
  if (!patientId) {
    throw new Error('Patient ID is required');
  }
  const { data } = await httpClient.get(`/patient_details?donor_id=${patientId}`);
  return data;
};

export const fetchEPatientDetails = async (patientId: string): Promise<PatientDetailsResponse> => {
  if (!patientId) {
    throw new Error('Patient ID is required');
  }
  const { data } = await httpClient.get(`/exome_patient_details?donor_id=${patientId}`);
  return data;
};

export const fetchPatientNeomers = async (
  patientId: string,
  length: number,
  topK: number,
  tab: 'genome' | 'exomes',
  prefix?: string,
): Promise<PatientNeomersResponse> => {
  if (!patientId) {
    throw new Error('Patient ID is required');
  }
  const parameters = new URLSearchParams({
    donor_id: patientId,
    length: length.toString(),
    top_n: topK.toString(),
  });
  if (prefix) {
    parameters.append('prefix', prefix);
  }

  const { data } = await (tab === 'genome'
    ? httpClient.get(`/patient_neomers?${parameters.toString()}`)
    : httpClient.get(`/exome_patient_neomers?${parameters.toString()}`));
  return data;
};
