export interface NullomerQueryParameters {
  length: number;
  page: number;
  limit: number;
}

export interface NullomerStatsParameters {
  length: number;
  filters: Record<string, string[]>;
  groupBy: string;
  topN: number;
}

export interface SuggestionParameters {
  column: string;
  input: string;
  filterType: string;
  length: number;
}

export type NullomerEntry = (string | number | null)[];

export type NullomerHeader =
  | 'Project_Code'
  | 'Hugo_Symbol'
  | 'Variant_Classification'
  | 'nullomers_created'
  | 'AF'
  | 'AF_eas'
  | 'AF_afr'
  | 'AF_fin'
  | 'AF_ami'
  | 'AF_amr'
  | 'AF_nfe'
  | 'AF_sas'
  | 'AF_asj'
  | 'Project_Code_1'
  | 'Cancer_Type'
  | 'Acronym'
  | 'Projects'
  | 'Organ'
  | '# donor_unique_id'
  | 'project_code_2'
  | 'icgc_donor_id'
  | 'submitted_donor_id'
  | 'tcga_donor_uuid'
  | 'donor_sex'
  | 'donor_vital_status'
  | 'donor_diagnosis_icd10'
  | 'first_therapy_type'
  | 'first_therapy_response'
  | 'donor_age_at_diagnosis'
  | 'donor_survival_time'
  | 'donor_interval_of_last_followup'
  | 'tobacco_smoking_history_indicator'
  | 'tobacco_smoking_intensity'
  | 'alcohol_history'
  | 'alcohol_history_intensity'
  | 'donor_wgs_included_excluded'
  | 'Tumor_Sample_Barcode'
  | 'Matched_Norm_Sample_Barcode'
  | 'gc_content'
  | 'bcr_patient_uuid'
  | 'bcr_patient_barcode'
  | 'gender'
  | 'vital_status'
  | 'days_to_birth'
  | 'days_to_death'
  | 'days_to_last_followup'
  | 'days_to_initial_pathologic_diagnosis'
  | 'age_at_initial_pathologic_diagnosis'
  | 'icd_10'
  | 'tissue_retrospective_collection_indicator'
  | 'tissue_prospective_collection_indicator'
  | 'history_of_neoadjuvant_treatment'
  | 'tumor_tissue_site'
  | 'new_tumor_event_after_initial_treatment'
  | 'radiation_therapy'
  | 'race'
  | 'project_code'
  | 'prior_dx'
  | 'ethnicity'
  | 'person_neoplasm_cancer_status'
  | 'year_of_initial_pathologic_diagnosis'
  | 'pathologic_T'
  | 'pathologic_M'
  | 'pathologic_N'
  | 'pathologic_stage'
  | 'clinical_stage'
  | 'clinical_T'
  | 'clinical_N'
  | 'extranodal_involvement'
  | 'additional_radiation_therapy'
  | 'external_beam_radiation_therapy_administered_paraaortic_region_lymph_node_dose';

export interface NullomerResponse {
  data: NullomerEntry[];
  headers: NullomerHeader[];
  totalCount: number;
}

export interface OrganBreakdownItem {
  organ: string;
  count: number;
}

export interface CancerBreakdownItem {
  cancerType: string;
  count: number;
  organs?: OrganBreakdownItem[];
}

export interface ExomeAnalysisResponse {
  analysis: {
    cancerBreakdown: CancerBreakdownItem[];
    organBreakdown: OrganBreakdownItem[];
    distinctDonorIDs: string[];
  };
}

export interface GenomeAnalysisResponse {
  analysis: {
    cancerBreakdown: CancerBreakdownItem[];
    distinctDonorIDs: string[];
    distinctDonors: number;
    distinctCancerTypes: number;
    distinctOrgans: number;
    totalNeomers: number;
  };
}

export type NullomerAnalysisResponse = ExomeAnalysisResponse | GenomeAnalysisResponse;
