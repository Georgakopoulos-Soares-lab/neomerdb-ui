import type {
  NullomerHeader,
  NullomerQueryParameters,
  NullomerStatsParameters,
} from '../types/nullomers';
import type { PatientsHeader } from '../types/patients';

export const INITIAL_NULLOMERS_VISIBLE_COLUMNS: NullomerHeader[] = [
  'nullomers_created',
  'Cancer_Type',
  'Organ',
  'Hugo_Symbol',
  'Variant_Classification',
  'AF',
];

export const INITIAL_NEOMER_PATIENTS_VISIBLE_COLUMNS: PatientsHeader[] = [
  '# donor_unique_id',
  'icgc_donor_id',
  'donor_sex',
  'donor_vital_status',
  'donor_diagnosis_icd10',
  'first_therapy_type',
  'first_therapy_response',
  'first_therapy_response',
  'donor_age_at_diagnosis',
  'donor_survival_time',
  'donor_interval_of_last_followup',
  'tobacco_smoking_history_indicator',
  'tobacco_smoking_intensity',
  'alcohol_history',
  'alcohol_history_intensity',
];

export const INITIAL_EXOMERS_VISIBLE_COLUMNS: NullomerHeader[] = [
  'bcr_patient_barcode',
  'gender',
  'vital_status',
  'days_to_birth',
  'days_to_death',
  'days_to_last_followup',
  'age_at_initial_pathologic_diagnosis',
  'tumor_tissue_site',
  'radiation_therapy',
  'race',
];

export const DEFAULT_NULLOMETER_QUERY_PARAMS: NullomerQueryParameters = {
  length: 11,
  page: 0,
  limit: 20,
};

export const MIN_VISIBLE_COLUMNS = 4;

export const DEFAULT_NULLOMETER_STATS_PARAMS: NullomerStatsParameters = {
  length: 11,
  filters: {},
  groupBy: '',
  topN: 10,
} as const;

export const CACHED_DATA = {
  11: [
    {
      cancer_type: 'Colon adenocarcinoma',
      count: '30',
    },
    {
      cancer_type: 'Skin Cutaneous Melanoma',
      count: '6',
    },
    {
      cancer_type: 'Lung adenocarcinoma',
      count: '10',
    },
    {
      cancer_type: 'Glioblastoma multiforme',
      count: '2',
    },
    {
      cancer_type: 'Lung squamous cell carcinoma',
      count: '18',
    },
    {
      cancer_type: 'Bone Cancer',
      count: '4',
    },
    {
      cancer_type: 'Breast invasive carcinoma',
      count: '2',
    },
    {
      cancer_type: 'Lymphoid Neoplasm Diffuse Large B-cell Lymphoma',
      count: '2',
    },
    {
      cancer_type: 'Stomach adenocarcinoma',
      count: '12',
    },
    {
      cancer_type: 'Head and Neck squamous cell carcinoma',
      count: '2',
    },
    {
      cancer_type: 'Uterine Corpus Endometrial Carcinoma',
      count: '14',
    },
    {
      cancer_type: 'Liver hepatocellular carcinoma',
      count: '4',
    },
  ],
  12: [
    {
      cancer_type: 'Colon adenocarcinoma',
      count: '6262',
    },
    {
      cancer_type: 'Breast invasive carcinoma',
      count: '778',
    },
    {
      cancer_type: 'Lung adenocarcinoma',
      count: '1286',
    },
    {
      cancer_type: 'Glioblastoma multiforme',
      count: '394',
    },
    {
      cancer_type: 'Bone Cancer',
      count: '198',
    },
    {
      cancer_type: 'Skin Cutaneous Melanoma',
      count: '1658',
    },
    {
      cancer_type: 'Lung squamous cell carcinoma',
      count: '2106',
    },
    {
      cancer_type: 'Bladder Urothelial Carcinoma',
      count: '512',
    },
    {
      cancer_type: 'Lymphoid Neoplasm Diffuse Large B-cell Lymphoma',
      count: '184',
    },
    {
      cancer_type: 'Brain Lower Grade Glioma',
      count: '42',
    },
    {
      cancer_type: 'Thyroid carcinoma',
      count: '76',
    },
    {
      cancer_type: 'Uterine Corpus Endometrial Carcinoma',
      count: '2364',
    },
    {
      cancer_type: 'Prostate adenocarcinoma',
      count: '34',
    },
    {
      cancer_type: 'Liver hepatocellular carcinoma',
      count: '682',
    },
    {
      cancer_type: 'Cervical squamous cell carcinoma and endocervical adenocarcinoma',
      count: '100',
    },
    {
      cancer_type: 'Ovarian serous cystadenocarcinoma',
      count: '302',
    },
    {
      cancer_type: 'Kidney Chromophobe',
      count: '114',
    },
    {
      cancer_type: 'Kidney renal clear cell carcinoma',
      count: '500',
    },
    {
      cancer_type: 'Head and Neck squamous cell carcinoma',
      count: '686',
    },
    {
      cancer_type: 'Stomach adenocarcinoma',
      count: '1858',
    },
  ],
  13: [
    {
      cancer_type: 'Thyroid carcinoma',
      count: '1966',
    },
    {
      cancer_type: 'Brain Lower Grade Glioma',
      count: '1270',
    },
    {
      cancer_type: 'Stomach adenocarcinoma',
      count: '52064',
    },
    {
      cancer_type: 'Kidney renal clear cell carcinoma',
      count: '12456',
    },
    {
      cancer_type: 'Head and Neck squamous cell carcinoma',
      count: '18218',
    },
    {
      cancer_type: 'Colon adenocarcinoma',
      count: '173164',
    },
    {
      cancer_type: 'Bone Cancer',
      count: '4856',
    },
    {
      cancer_type: 'Glioblastoma multiforme',
      count: '10730',
    },
    {
      cancer_type: 'Breast invasive carcinoma',
      count: '20790',
    },
    {
      cancer_type: 'Lung adenocarcinoma',
      count: '36070',
    },
    {
      cancer_type: 'Lung squamous cell carcinoma',
      count: '56520',
    },
    {
      cancer_type: 'Skin Cutaneous Melanoma',
      count: '51658',
    },
    {
      cancer_type: 'Bladder Urothelial Carcinoma',
      count: '12430',
    },
    {
      cancer_type: 'Lymphoid Neoplasm Diffuse Large B-cell Lymphoma',
      count: '4064',
    },
    {
      cancer_type: 'Uterine Corpus Endometrial Carcinoma',
      count: '61954',
    },
    {
      cancer_type: 'Prostate adenocarcinoma',
      count: '976',
    },
    {
      cancer_type: 'Kidney Chromophobe',
      count: '3290',
    },
    {
      cancer_type: 'Ovarian serous cystadenocarcinoma',
      count: '9878',
    },
    {
      cancer_type: 'Liver hepatocellular carcinoma',
      count: '18904',
    },
    {
      cancer_type: 'Cervical squamous cell carcinoma and endocervical adenocarcinoma',
      count: '2606',
    },
  ],
  14: [
    {
      cancer_type: 'Thyroid carcinoma',
      count: '19442',
    },
    {
      cancer_type: 'Brain Lower Grade Glioma',
      count: '13766',
    },
    {
      cancer_type: 'Stomach adenocarcinoma',
      count: '560750',
    },
    {
      cancer_type: 'Head and Neck squamous cell carcinoma',
      count: '204892',
    },
    {
      cancer_type: 'Kidney renal clear cell carcinoma',
      count: '131976',
    },
    {
      cancer_type: 'Colon adenocarcinoma',
      count: '2085732',
    },
    {
      cancer_type: 'Lung adenocarcinoma',
      count: '397058',
    },
    {
      cancer_type: 'Lung squamous cell carcinoma',
      count: '628612',
    },
    {
      cancer_type: 'Bladder Urothelial Carcinoma',
      count: '135322',
    },
    {
      cancer_type: 'Breast invasive carcinoma',
      count: '223118',
    },
    {
      cancer_type: 'Skin Cutaneous Melanoma',
      count: '622608',
    },
    {
      cancer_type: 'Glioblastoma multiforme',
      count: '122776',
    },
    {
      cancer_type: 'Bone Cancer',
      count: '53188',
    },
    {
      cancer_type: 'Lymphoid Neoplasm Diffuse Large B-cell Lymphoma',
      count: '44464',
    },
    {
      cancer_type: 'Ovarian serous cystadenocarcinoma',
      count: '105962',
    },
    {
      cancer_type: 'Kidney Chromophobe',
      count: '36470',
    },
    {
      cancer_type: 'Uterine Corpus Endometrial Carcinoma',
      count: '701146',
    },
    {
      cancer_type: 'Prostate adenocarcinoma',
      count: '10802',
    },
    {
      cancer_type: 'Liver hepatocellular carcinoma',
      count: '206596',
    },
    {
      cancer_type: 'Cervical squamous cell carcinoma and endocervical adenocarcinoma',
      count: '28306',
    },
  ],
  15: [
    {
      cancer_type: 'Thyroid carcinoma',
      count: '101494',
    },
    {
      cancer_type: 'Brain Lower Grade Glioma',
      count: '74876',
    },
    {
      cancer_type: 'Stomach adenocarcinoma',
      count: '2957276',
    },
    {
      cancer_type: 'Kidney renal clear cell carcinoma',
      count: '692142',
    },
    {
      cancer_type: 'Head and Neck squamous cell carcinoma',
      count: '1110542',
    },
    {
      cancer_type: 'Colon adenocarcinoma',
      count: '11948004',
    },
    {
      cancer_type: 'Glioblastoma multiforme',
      count: '675118',
    },
    {
      cancer_type: 'Breast invasive carcinoma',
      count: '1186326',
    },
    {
      cancer_type: 'Skin Cutaneous Melanoma',
      count: '3746616',
    },
    {
      cancer_type: 'Lung adenocarcinoma',
      count: '2133336',
    },
    {
      cancer_type: 'Lymphoid Neoplasm Diffuse Large B-cell Lymphoma',
      count: '238822',
    },
    {
      cancer_type: 'Bone Cancer',
      count: '284858',
    },
    {
      cancer_type: 'Lung squamous cell carcinoma',
      count: '3367952',
    },
    {
      cancer_type: 'Bladder Urothelial Carcinoma',
      count: '720532',
    },
    {
      cancer_type: 'Cervical squamous cell carcinoma and endocervical adenocarcinoma',
      count: '153768',
    },
    {
      cancer_type: 'Ovarian serous cystadenocarcinoma',
      count: '557664',
    },
    {
      cancer_type: 'Prostate adenocarcinoma',
      count: '57668',
    },
    {
      cancer_type: 'Liver hepatocellular carcinoma',
      count: '1090394',
    },
    {
      cancer_type: 'Uterine Corpus Endometrial Carcinoma',
      count: '3795940',
    },
    {
      cancer_type: 'Kidney Chromophobe',
      count: '194018',
    },
  ],
  16: [
    {
      cancer_type: 'Thyroid carcinoma',
      count: '357192',
    },
    {
      cancer_type: 'Brain Lower Grade Glioma',
      count: '265288',
    },
    {
      cancer_type: 'Head and Neck squamous cell carcinoma',
      count: '4084560',
    },
    {
      cancer_type: 'Kidney renal clear cell carcinoma',
      count: '2379892',
    },
    {
      cancer_type: 'Stomach adenocarcinoma',
      count: '9399202',
    },
    {
      cancer_type: 'Colon adenocarcinoma',
      count: '45374532',
    },
    {
      cancer_type: 'Breast invasive carcinoma',
      count: '4232016',
    },
    {
      cancer_type: 'Lung adenocarcinoma',
      count: '7723960',
    },
    {
      cancer_type: 'Glioblastoma multiforme',
      count: '2553742',
    },
    {
      cancer_type: 'Skin Cutaneous Melanoma',
      count: '15604538',
    },
    {
      cancer_type: 'Bone Cancer',
      count: '1005538',
    },
    {
      cancer_type: 'Lung squamous cell carcinoma',
      count: '11954500',
    },
    {
      cancer_type: 'Lymphoid Neoplasm Diffuse Large B-cell Lymphoma',
      count: '755624',
    },
    {
      cancer_type: 'Bladder Urothelial Carcinoma',
      count: '2631190',
    },
    {
      cancer_type: 'Uterine Corpus Endometrial Carcinoma',
      count: '13861598',
    },
    {
      cancer_type: 'Liver hepatocellular carcinoma',
      count: '3696034',
    },
    {
      cancer_type: 'Cervical squamous cell carcinoma and endocervical adenocarcinoma',
      count: '587206',
    },
    {
      cancer_type: 'Ovarian serous cystadenocarcinoma',
      count: '1927622',
    },
    {
      cancer_type: 'Kidney Chromophobe',
      count: '668386',
    },
    {
      cancer_type: 'Prostate adenocarcinoma',
      count: '204644',
    },
  ],
};

export const CANCER_METADATA = [
  {
    Project_Code: 'Thy-AdenoCA',
    Cancer_Type: 'Thyroid carcinoma',
    Acronym: 'THCA',
    Projects: 'TCGA',
    Organ: 'Thyroid',
  },
  {
    Project_Code: 'Lymph-BNHL',
    Cancer_Type: 'Lymphoid Neoplasm Diffuse Large B-cell Lymphoma',
    Acronym: 'DLBC',
    Projects: 'TCGA',
    Organ: 'Lymphoid',
  },
  {
    Project_Code: 'Lung-AdenoCA',
    Cancer_Type: 'Lung adenocarcinoma',
    Acronym: 'LUAD',
    Projects: 'TCGA',
    Organ: 'Lung',
  },
  {
    Project_Code: 'Breast-AdenoCa',
    Cancer_Type: 'Breast invasive carcinoma',
    Acronym: 'BRCA',
    Projects: 'ICGC,TCGA',
    Organ: 'Breast',
  },
  {
    Project_Code: 'Ovary-AdenoCA',
    Cancer_Type: 'Ovarian serous cystadenocarcinoma',
    Acronym: 'OV',
    Projects: 'ICGC,TCGA',
    Organ: 'Ovary',
  },
  {
    Project_Code: 'Kidney-ChRCC',
    Cancer_Type: 'Kidney Chromophobe',
    Acronym: 'KICH',
    Projects: 'TCGA',
    Organ: 'Kidney',
  },
  {
    Project_Code: 'Prost-AdenoCA',
    Cancer_Type: 'Prostate adenocarcinoma',
    Acronym: 'PRAD',
    Projects: 'ICGC,TCGA',
    Organ: 'Prostate',
  },
  {
    Project_Code: 'Breast-LobularCa',
    Cancer_Type: 'Breast invasive carcinoma',
    Acronym: 'BRCA',
    Projects: 'ICGC,TCGA',
    Organ: 'Breast',
  },
  {
    Project_Code: 'Liver-HCC',
    Cancer_Type: 'Liver hepatocellular carcinoma',
    Acronym: 'LIHC',
    Projects: 'TCGA',
    Organ: 'Liver',
  },
  {
    Project_Code: 'Bone-Leiomyo',
    Cancer_Type: 'Bone Cancer',
    Acronym: 'BOCA',
    Projects: 'ICGC',
    Organ: 'Bone_SoftTissue',
  },
  {
    Project_Code: 'Uterus-AdenoCA',
    Cancer_Type: 'Uterine Corpus Endometrial Carcinoma',
    Acronym: 'UCEC',
    Projects: 'TCGA',
    Organ: 'Uterus',
  },
  {
    Project_Code: 'ColoRect-AdenoCA',
    Cancer_Type: 'Colon adenocarcinoma',
    Acronym: 'COAD',
    Projects: 'TCGA',
    Organ: 'Colon_Rectum',
  },
  {
    Project_Code: 'CNS-Oligo',
    Cancer_Type: 'Brain Lower Grade Glioma',
    Acronym: 'LGG',
    Projects: 'TCGA',
    Organ: 'CNS',
  },
  {
    Project_Code: 'Cervix-AdenoCA',
    Cancer_Type: 'Cervical squamous cell carcinoma and endocervical adenocarcinoma',
    Acronym: 'CESC',
    Projects: 'TCGA',
    Organ: 'Cervix',
  },
  {
    Project_Code: 'Bladder-TCC',
    Cancer_Type: 'Bladder Urothelial Carcinoma',
    Acronym: 'BLCA',
    Projects: 'TCGA',
    Organ: 'Bladder',
  },
  {
    Project_Code: 'Stomach-AdenoCA',
    Cancer_Type: 'Stomach adenocarcinoma',
    Acronym: 'STAD',
    Projects: 'TCGA',
    Organ: 'Stomach',
  },
  {
    Project_Code: 'CNS-GBM',
    Cancer_Type: 'Glioblastoma multiforme',
    Acronym: 'GBM',
    Projects: 'TCGA',
    Organ: 'CNS',
  },
  {
    Project_Code: 'Head-SCC',
    Cancer_Type: 'Head and Neck squamous cell carcinoma',
    Acronym: 'HNSC',
    Projects: 'TCGA',
    Organ: 'Head_Neck',
  },
  {
    Project_Code: 'Kidney-RCC',
    Cancer_Type: 'Kidney renal clear cell carcinoma',
    Acronym: 'KIRC',
    Projects: 'TCGA',
    Organ: 'Kidney',
  },
  {
    Project_Code: 'Skin-Melanoma',
    Cancer_Type: 'Skin Cutaneous Melanoma',
    Acronym: 'SKCM',
    Projects: 'TCGA',
    Organ: 'Skin',
  },
  {
    Project_Code: 'Cervix-SCC',
    Cancer_Type: 'Cervical squamous cell carcinoma and endocervical adenocarcinoma',
    Acronym: 'CESC',
    Projects: 'TCGA',
    Organ: 'Cervix',
  },
  {
    Project_Code: 'Lung-SCC',
    Cancer_Type: 'Lung squamous cell carcinoma',
    Acronym: 'LUSC',
    Projects: 'TCGA',
    Organ: 'Lung',
  },
  {
    Project_Code: 'Panc-Endocrine',
    Cancer_Type: 'Pancreatic neuroendocrine tumor',
    Acronym: 'PNET',
    Projects: 'ICGC,TCGA',
    Organ: 'Pancreas',
  },
  {
    Project_Code: 'Lymph-CLL',
    Cancer_Type: 'Chronic Lymphocytic Leukemia',
    Acronym: 'CLL',
    Projects: 'ICGC,TCGA',
    Organ: 'Lymphoid',
  },
  {
    Project_Code: 'Eso-AdenoCa',
    Cancer_Type: 'Esophageal Adenocarcinoma',
    Acronym: 'ESAD',
    Projects: 'ICGC',
    Organ: 'Esophagus',
  },
  {
    Project_Code: 'Bone-Epith',
    Cancer_Type: 'Epithelioid Sarcoma',
    Acronym: 'SARC',
    Projects: 'TCGA',
    Organ: 'Bone_SoftTissue',
  },
  {
    Project_Code: 'Panc-AdenoCA',
    Cancer_Type: 'Pancreatic adenocarcinoma',
    Acronym: 'PAAD',
    Projects: 'ICGC,TCGA',
    Organ: 'Pancreas',
  },
  {
    Project_Code: 'Biliary-AdenoCA',
    Cancer_Type: 'Biliary Adenocarcinoma',
    Acronym: 'CHOL',
    Projects: 'TCGA',
    Organ: 'Biliary',
  },
  {
    Project_Code: 'Bone-Osteosarc',
    Cancer_Type: 'Osteosarcoma',
    Acronym: 'SARC',
    Projects: 'ICGC',
    Organ: 'Bone_SoftTissue',
  },
  {
    Project_Code: 'Lymph-NOS',
    Cancer_Type: 'Diffuse Large B-cell Lymphoma, NOS',
    Acronym: 'DLBC',
    Projects: 'ICGC',
    Organ: 'Lymphoid',
  },
  {
    Project_Code: 'CNS-Medullo',
    Cancer_Type: 'Medulloblastoma',
    Acronym: 'MB',
    Projects: 'ICGC',
    Organ: 'CNS',
  },
  {
    Project_Code: 'Myeloid-MPN',
    Cancer_Type: 'Myeloproliferative Neoplasms',
    Acronym: 'MPN',
    Projects: 'TCGA',
    Organ: 'Myeloid',
  },
  {
    Project_Code: 'CNS-PiloAstro',
    Cancer_Type: 'Pilocytic Astrocytoma',
    Acronym: 'PA',
    Projects: 'ICGC',
    Organ: 'CNS',
  },
  {
    Project_Code: 'Myeloid-MDS',
    Cancer_Type: 'Myelodysplastic Syndromes',
    Acronym: 'MDS',
    Projects: 'ICGC,TCGA',
    Organ: 'Myeloid',
  },
  {
    Project_Code: 'Myeloid-AML',
    Cancer_Type: 'Acute Myeloid Leukemia',
    Acronym: 'LAML',
    Projects: 'ICGC,TCGA',
    Organ: 'Myeloid',
  },
  {
    Project_Code: 'Bone-Cart',
    Cancer_Type: 'Cartilage Tumor',
    Acronym: 'SARC',
    Projects: 'ICGC',
    Organ: 'Bone_SoftTissue',
  },
  {
    Project_Code: 'Breast-DCIS',
    Cancer_Type: 'Ductal Carcinoma in Situ',
    Acronym: 'DCIS',
    Projects: 'TCGA',
    Organ: 'Breast',
  },
];
