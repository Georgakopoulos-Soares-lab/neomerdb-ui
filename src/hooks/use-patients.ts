import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import {
  fetchExomesPatients,
  fetchGenomesPatients,
  fetchGPatientDetails,
  fetchPatientNeomers,
} from '../services/patients.service';
import { fetchNeomerAnalysis } from '../services/nullomers.service';
import type { NullomerAnalysisResponse } from '../types/nullomers';

export const usePatientGenomes = () => {
  return useQuery({
    queryKey: ['patient/genomes'],
    queryFn: fetchGenomesPatients,
  });
};

export const usePatientExomes = () => {
  return useQuery({
    queryKey: ['patient/exomes'],
    queryFn: fetchExomesPatients,
  });
};

export const usePatientDetails = (patientId: string) => {
  return useQuery({
    queryKey: ['patient/details', patientId],
    queryFn: async () => await fetchGPatientDetails(patientId),
    enabled: !!patientId,
  });
};

export const usePatientNeomers = (
  patientId: string,
  length: number,
  topK: number,
  tab: 'genome' | 'exomes',
  prefix?: string,
  onSuccess?: () => void,
) => {
  return useQuery({
    queryKey: ['patient/neomers', patientId, length, topK, prefix],
    queryFn: async () => {
      return await fetchPatientNeomers(patientId, length, topK, tab, prefix);
    },
    enabled: !!patientId,
    ...(onSuccess ? { onSuccess } : {}),
  });
};

export const useNeomerAnalysis = (
  neomer: string | undefined,
  tab: 'genome' | 'exomes' = 'genome',
): UseQueryResult<NullomerAnalysisResponse, Error> => {
  return useQuery<NullomerAnalysisResponse, Error>({
    queryKey: ['neomer/analysis', neomer],
    queryFn: async () => await fetchNeomerAnalysis(neomer, tab),
    enabled: !!neomer,
  });
};
