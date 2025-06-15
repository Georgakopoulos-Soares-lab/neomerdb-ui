import type {
  NullomerAnalysisResponse,
  NullomerQueryParameters,
  NullomerResponse,
  NullomerStatsParameters,
  SuggestionParameters,
} from '../types/nullomers';
import httpClient from './http-client';

export const fetchGenomes = async (
  parameters: NullomerQueryParameters,
): Promise<NullomerResponse> => {
  const { data } = await httpClient.get('/get_nullomers', { params: parameters });
  return data;
};

export const fetchGenomeStats = async (parameters: NullomerStatsParameters) => {
  const { data } = await httpClient.get('/get_nullomers_stats', { params: parameters });
  return data;
};

export const fetchSuggestions = async (parameters: SuggestionParameters) => {
  const { data } = await httpClient.get('/get_suggestions', { params: parameters });
  return data.suggestions;
};

export const fetchExomes = async (
  parameters: NullomerQueryParameters,
): Promise<NullomerResponse> => {
  const { data } = await httpClient.get('/get_exome_nullomers', { params: parameters });
  return data;
};
export const fetchExomeStats = async (parameters: NullomerStatsParameters) => {
  const { data } = await httpClient.get('/get_exome_nullomers_stats', { params: parameters });
  return data;
};

export const fetchExomeSuggestions = async (parameters: SuggestionParameters) => {
  const { data } = await httpClient.get('/get_exome_suggestions', { params: parameters });
  return data.suggestions;
};

export const fetchNeomerAnalysis = async (
  neomer: string | undefined,
  tab: 'genome' | 'exomes' = 'genome',
): Promise<NullomerAnalysisResponse> => {
  const { data } = await (tab == 'exomes'
    ? httpClient.get('/exome_analyze_neomer', { params: { neomer } })
    : httpClient.get('/analyze_neomer', { params: { neomer } }));
  return data;
};
