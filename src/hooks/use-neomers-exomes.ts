import { useQuery } from '@tanstack/react-query';
import { fetchExomes, fetchExomeStats, fetchExomeSuggestions } from '../services/nullomers.service';
import type {
  NullomerQueryParameters,
  NullomerStatsParameters,
  SuggestionParameters,
} from '../types/nullomers';

export const useExomes = (parameters: NullomerQueryParameters) => {
  return useQuery({
    queryKey: ['exomes', parameters],
    queryFn: () => fetchExomes(parameters),
  });
};

export const useExomesStats = (parameters: NullomerStatsParameters, enabled = true) => {
  return useQuery({
    queryKey: ['exomes_stats', parameters],
    queryFn: () => fetchExomeStats(parameters),
    enabled: enabled,
  });
};
export const useSuggestionsExomes = (parameters: SuggestionParameters) => {
  return useQuery({
    queryKey: ['exomes_suggestions', parameters],
    queryFn: () => fetchExomeSuggestions(parameters),
    enabled: Boolean(parameters.input && parameters.column),
  });
};
