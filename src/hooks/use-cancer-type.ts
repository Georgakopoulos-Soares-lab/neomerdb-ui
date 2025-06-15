import { useQuery } from '@tanstack/react-query';

import type { CancerTypesResponse } from '../types/patients';
import { fetchCancerTypesPatients } from '../services/patients.service';

export const useCancerTypes = () => {
  return useQuery<CancerTypesResponse>({
    queryKey: ['cancer_types'],
    queryFn: fetchCancerTypesPatients,
  });
};
