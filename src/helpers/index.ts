import type { ColumnDef } from '@tanstack/react-table';
import { CANCER_METADATA } from '../constants';

export const mapHeaderToLabel = (header: string): string => {
  const mappings: Record<string, string> = {
    Project_Code: 'Project Code',
    Hugo_Symbol: 'Hugo Symbol',
    Variant_Classification: 'Variant Classification',
    nullomers_created: 'Nullomers Created',
    AF: 'AF',
    AF_eas: 'AF EAS',
    AF_afr: 'AF AFR',
    AF_fin: 'AF FIN',
    AF_ami: 'AF AMI',
    AF_amr: 'AF AMR',
    AF_nfe: 'AF NFE',
    AF_sas: 'AF SAS',
    AF_asj: 'AF ASJ',
    Project_Code_1: 'Project Code 1',
    Cancer_Type: 'Cancer Type',
    Acronym: 'Acronym',
    Projects: 'Projects',
    Organ: 'Organ',
    '# donor_unique_id': 'Donor Unique ID',
    project_code_2: 'Project Code 2',
    icgc_donor_id: 'ICGC Donor ID',
    submitted_donor_id: 'Submitted Donor ID',
    tcga_donor_uuid: 'TCGA Donor UUID',
    donor_sex: 'Sex',
    donor_vital_status: 'Vital Status',
    donor_diagnosis_icd10: 'ICD-10 Diagnosis Code',
    first_therapy_type: 'First Therapy Type',
    first_therapy_response: 'First Therapy Response',
    donor_age_at_diagnosis: 'Age at Diagnosis',
    donor_survival_time: 'Survival Time (days)',
    donor_interval_of_last_followup: 'Last Follow-Up (days)',
    tobacco_smoking_history_indicator: 'Smoking History',
    tobacco_smoking_intensity: 'Smoking Intensity',
    alcohol_history: 'Alcohol History',
    alcohol_history_intensity: 'Alcohol Intensity',
    donor_wgs_included_excluded: 'WGS Status',
    Tumor_Sample_Barcode: 'Tumor Sample Barcode',
    Matched_Norm_Sample_Barcode: 'Matched Normal Sample Barcode',
    gc_content: 'GC Content (%)',
  };

  return mappings[`${header}`] ?? header;
};

export const generateColumns = <T extends Record<string, unknown>>(
  headers: string[],
): ColumnDef<T>[] => {
  return headers.map((header) => ({
    id: header,
    accessorKey: header,
    header: () => mapHeaderToLabel(header),
    cell: (info) => {
      const value = info.getValue();
      return value !== undefined && value !== null ? String(value) : 'N/A';
    },
    enableSorting: true,
    enableHiding: true,
  }));
};

export function normalizeTableData<H extends readonly string[], R extends readonly unknown[]>(
  headers: H,
  rows: readonly R[],
): Array<{ [K in H[number]]: unknown }> {
  if (!rows || rows.length === 0) return [];
  if (!headers || headers.length === 0) return [];

  return rows.map((row) => {
    const entry = {} as { [K in H[number]]: unknown };
    for (const [index, key] of headers.entries()) {
      entry[key as H[number]] = row[Number.parseInt(index.toString(), 10)] ?? undefined;
    }
    return entry;
  });
}

export const predictPatient = (patientId: string): 'exomes' | 'genome' => {
  // This function simulates a prediction based on the patient ID.
  // In a real application, this would likely involve an API call or some complex logic.
  return patientId.startsWith('T') ? 'exomes' : 'genome';
};

export const putAcronym = (cancerType: string): string => {
  const acronyms: Record<string, string> = {};
  for (const { Cancer_Type, Acronym } of CANCER_METADATA) {
    acronyms[`${Cancer_Type}`] = Acronym;
  }

  return acronyms[`${cancerType}`] ?? cancerType;
};
