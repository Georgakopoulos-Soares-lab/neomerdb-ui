export type PatientsEntry = (string | number | null)[];

export type PatientsHeader =
  | 'bcr_patient_barcode'
  | '# donor_unique_id'
  | 'project_code'
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
  | 'donor_wgs_included_excluded';

export interface PatientResponse {
  data: PatientsEntry[];
  headers: PatientsHeader[];
}

export interface CancerType {
  cancerType: string;
  acronym: string;
  projects: string[];
  organ: string;
}

export interface CancerTypesResponse {
  data: [string, string, string, string][];
  headers: ['Cancer type', 'Acronym', 'Projects', 'Organ'];
}

export interface GPatient {
  donor_unique_id: string;
  Cancer_Type: string;
  Organ: string;
  alcohol_history: string | null;
  alcohol_history_intensity: string | null;
  donor_age_at_diagnosis: number;
  donor_diagnosis_icd10: string;
  donor_interval_of_last_followup: number | null;
  donor_sex: 'male' | 'female' | string;
  donor_survival_time: number;
  donor_vital_status: 'deceased' | 'alive' | string;
  donor_wgs_included_excluded: 'Included' | 'Excluded' | string;
  first_therapy_response: string | null;
  first_therapy_type: string | null;
  icgc_donor_id: string;
  project_code: string;
  submitted_donor_id: string;
  tcga_donor_uuid: string;
  tobacco_smoking_history_indicator: string | null;
  tobacco_smoking_intensity: string | null;
}

export interface EPatient {
  Cancer_Type: string;
  Organ: string;
  additional_radiation_therapy: string | null;
  age_at_initial_pathologic_diagnosis: string;
  bcr_patient_barcode: string;
  bcr_patient_uuid: string;
  clinical_N: string | null;
  clinical_T: string | null;
  clinical_stage: string | null;
  days_to_birth: string;
  days_to_death: string;
  days_to_initial_pathologic_diagnosis: string;
  days_to_last_followup: string | null;
  ethnicity: string | null;
  external_beam_radiation_therapy_administered_paraaortic_region_lymph_node_dose: string | null;
  extranodal_involvement: string | null;
  gender: string;
  history_of_neoadjuvant_treatment: string;
  icd_10: string;
  new_tumor_event_after_initial_treatment: string;
  pathologic_M: string | null;
  pathologic_N: string | null;
  pathologic_T: string | null;
  pathologic_stage: string | null;
  person_neoplasm_cancer_status: string;
  prior_dx: string;
  project_code: string | null;
  race: string;
  radiation_therapy: string;
  tissue_prospective_collection_indicator: string;
  tissue_retrospective_collection_indicator: string;
  tumor_tissue_site: string;
  vital_status: string;
  year_of_initial_pathologic_diagnosis: string;
}
export type PatientDetailsResponse = {
  patient: GPatient | EPatient;
};

export interface PatientNeomersResponse {
  neomers: {
    neomer: string;
    count: number;
  }[];
}
