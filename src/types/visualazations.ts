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
