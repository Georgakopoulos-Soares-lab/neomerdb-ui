import type {
  CancerTypeDistributionResponse,
  CancerTypesResponse,
  JaccardIndexResponse,
  OrganDistributionResponse,
  OrgansResponse,
} from '../types/visualazations';
import httpClient from './http-client';

export const fetchJaccardIndex = async (K: number): Promise<JaccardIndexResponse> => {
  if (!K) {
    throw new Error('K is required');
  }
  const { data } = await httpClient.get(`/jaccard_index?K=${K}`);
  return data;
};

export const fetchOrgans = async (): Promise<OrgansResponse> => {
  const { data } = await httpClient.get(`/distribution_neomer/13/organs`);
  return data;
};

export const fetchCancerTypes = async (): Promise<CancerTypesResponse> => {
  const { data } = await httpClient.get(`/distribution_neomer/13/cancer_types`);
  return data;
};

export const fetchDistributionNeomerKDataByOrgan = async (
  K: number,
  organ: string,
): Promise<OrganDistributionResponse> => {
  if (!K || !organ) {
    throw new Error('K and organ are required');
  }
  const { data } = await httpClient.get(`/distribution_neomer/${K}/data_by_organ`, {
    params: { organ: organ },
  });
  return data;
};

export const fetchDistributionNeomerKDataByCancerType = async (
  K: number,
  cancerType: string,
): Promise<CancerTypeDistributionResponse> => {
  if (!K || !cancerType) {
    throw new Error('K and organ are required');
  }
  const { data } = await httpClient.get(`/distribution_neomer/${K}/data_by_cancer_type`, {
    params: { cancerType },
  });
  return data;
};
