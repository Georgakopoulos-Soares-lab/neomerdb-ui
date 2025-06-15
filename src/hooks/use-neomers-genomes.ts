import { useQuery } from '@tanstack/react-query';
import { fetchGenomes, fetchGenomeStats, fetchSuggestions } from '../services/nullomers.service';
import type {
  NullomerQueryParameters,
  NullomerStatsParameters,
  SuggestionParameters,
} from '../types/nullomers';

export const useGenomes = (parameters: NullomerQueryParameters) => {
  return useQuery({
    queryKey: ['genomes', parameters],
    queryFn: () => fetchGenomes(parameters),
  });
};

export const useGenomesStats = (parameters: NullomerStatsParameters, enabled = true) => {
  return useQuery({
    queryKey: ['genomes_stats', parameters],
    queryFn: () => fetchGenomeStats(parameters),
    enabled: enabled,
  });
};

export const useSuggestions = (parameters: SuggestionParameters) => {
  return useQuery({
    queryKey: ['genomes_suggestions', parameters],
    queryFn: () => fetchSuggestions(parameters),
    enabled: Boolean(parameters.input && parameters.column),
  });
};
