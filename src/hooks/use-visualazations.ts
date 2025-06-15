import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchJaccardIndex } from '../services/visualazation.service';
import type { JaccardIndexResponse } from '../types/visualazations';

export const useJaccardIndex = (K: number): UseQueryResult<JaccardIndexResponse> => {
  return useQuery({
    queryKey: ['jaccard_index', K],
    queryFn: () => fetchJaccardIndex(K),
    enabled: !!K,
  });
};
