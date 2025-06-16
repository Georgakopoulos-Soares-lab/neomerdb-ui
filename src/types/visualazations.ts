export interface JaccartIndex {
  cancer_type_a: string;
  cancer_type_b: string;
  intersection_count: number;
  jaccard_index: number;
  union_count: number;
}

export interface JaccardIndexResponse {
  jaccard_indices: JaccartIndex[];
}

export interface OrgansResponse {
  organs: string[];
}

export interface CancerTypesResponse {
  cancerTypes: string[];
}

interface DistributionNeomerKItem {
  donorCount: number;
  numNullomers: number;
}

export interface OrganDistributionResponse {
  organ: string;
  K: number;
  distribution: DistributionNeomerKItem[] | null;
}

export interface CancerTypeDistributionResponse {
  cancer_type: string;
  K: number;
  distribution: DistributionNeomerKItem[] | null;
}
