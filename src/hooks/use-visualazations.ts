import { useQueries, useQuery, type UseQueryResult } from '@tanstack/react-query';
import {
  fetchCancerTypes,
  fetchDistributionNeomerKDataByCancerType,
  fetchDistributionNeomerKDataByOrgan,
  fetchJaccardIndex,
  fetchOrgans,
} from '../services/visualazation.service';
import type {
  JaccardIndexResponse,
  OrganDistributionResponse,
  CancerTypeDistributionResponse,
} from '../types/visualazations';

export const useJaccardIndex = (K: number): UseQueryResult<JaccardIndexResponse> => {
  return useQuery({
    queryKey: ['jaccard_index', K],
    queryFn: () => fetchJaccardIndex(K),
    enabled: !!K,
  });
};

export const useOrgans = () => {
  return useQuery({
    queryKey: ['organs'],
    queryFn: () => fetchOrgans(),
  });
};

export const useCancerTypes = () => {
  return useQuery({
    queryKey: ['cancer_types'],
    queryFn: () => fetchCancerTypes(),
  });
};

export const useOrgansAndCancerTypes = () => {
  return useQueries({
    queries: [
      {
        queryKey: ['organs'],
        queryFn: () => fetchOrgans(),
      },
      {
        queryKey: ['cancer_types'],
        queryFn: () => fetchCancerTypes(),
      },
    ],
  });
};

export const useDistributionNeomerKDataByOrgan = (K: number, organ: string) => {
  return useQuery({
    queryKey: ['distribution_neomer', K, 'data_by_organ', organ],
    queryFn: () => fetchDistributionNeomerKDataByOrgan(K, organ),
    enabled: !!K && !!organ,
  });
};
export const useDistributionNeomerKDataByCancerType = (K: number, cancerType: string) => {
  return useQuery({
    queryKey: ['distribution_neomer', K, 'data_by_cancer_type', cancerType],
    queryFn: () => fetchDistributionNeomerKDataByCancerType(K, cancerType),
    enabled: !!K && !!cancerType,
  });
};

export const useDistributionNeomerKData = (
  K: number,
  groupBy: 'organ' | 'cancerType',
  selectedValue: string,
) => {
  return useQuery<OrganDistributionResponse | CancerTypeDistributionResponse>({
    queryKey: ['distribution_neomer', K, groupBy, selectedValue],
    queryFn: () =>
      groupBy === 'organ'
        ? fetchDistributionNeomerKDataByOrgan(K, selectedValue)
        : fetchDistributionNeomerKDataByCancerType(K, selectedValue),
    enabled: !!K && !!selectedValue,
  });
};
