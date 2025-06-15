import type { JaccardIndexResponse } from '../types/visualazations';
import httpClient from './http-client';

export const fetchJaccardIndex = async (K: number): Promise<JaccardIndexResponse> => {
  if (!K) {
    throw new Error('K is required');
  }
  const { data } = await httpClient.get(`/jaccard_index?K=${K}`);
  return data;
};
