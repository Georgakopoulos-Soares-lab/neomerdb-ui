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

export const ABOUT_US_DIAGRAM_GENOMES_VALUES = {
  IGR: 50.063,
  Intron: 33.955,
  lincRNA: 7.227,
  RNA: 3.888,
  "5'Flank": 1.797,
  Missense_Mutation: 1.179,
  "3'UTR": 0.788,
  Silent: 0.526,
  "5'UTR": 0.365,
  Nonsense_Mutation: 0.075,
  Splice_Site: 0.056,
  Frame_Shift_Del: 0.036,
  Frame_Shift_Ins: 0.018,
  De_novo_Start_OutOfFrame: 0.009,
  In_Frame_Del: 0.006,
  De_novo_Start_InFrame: 0.004,
  Start_Codon_SNP: 0.003,
  In_Frame_Ins: 0.002,
  Nonstop_Mutation: 0.001,
};

export const ABOUT_US_DIAGRAM_EXOMES_VALUES = {
  Missense_Mutation: 55.248,
  Silent: 24.733,
  "3'UTR": 5.038,
  Nonsense_Mutation: 3.957,
  "5'UTR": 2.68,
  Intron: 2.436,
  Frame_Shift_Del: 1.517,
  RNA: 1.245,
  Splice_Site: 1.136,
  Frame_Shift_Ins: 0.672,
  "5'Flank": 0.509,
  "3'Flank": 0.454,
  In_Frame_Del: 0.191,
  Translation_Start_Site: 0.099,
  Nonstop_Mutation: 0.055,
  In_Frame_Ins: 0.03,
};

export const HELP_PAGE_SECTIONS = [
  {
    title: 'Neomer Pages (Genomes & Exomes)',
    description: 'Detailed views and filters for neomer records across genome and exome datasets.',
    slides: [
      {
        img: '/images/neomer_table.png',
        label: 'Data Table',
        description:
          'Upon accessing the Neomers page, users are presented with a paginated display of all neomers corresponding to a selected length value. Both genomic and exomic datasets within this page maintain complete feature parity, ensuring consistent functionality and analysis capabilities across both dataset types. Users can refine the displayed neomers through various filtering criteria, including cancer-specific details, genomic regions, allele frequency (serving as an indicator of confidence in identifying neomers as cancer signatures), and patient characteristics. Additionally, the interface provides functionality for users to customize and reorder column visibility, allowing tailored views according to specific analytical requirements. Users can subsequently download the filtered and customized datasets.',
      },
      {
        img: '/images/neomer_stats.png',
        label: 'Statistics View',
        description:
          'Furthermore, the Neomers page includes analytical tools that facilitate statistical evaluation. These tools enable users to group neomers by available attributes, display the top-ranking groups in descending order, and analyze distribution patterns across various columns, supporting comprehensive assessment and interpretation of neomer data.',
      },
    ],
  },
  {
    title: 'Patient Pages (Genomes & Exomes)',
    description: 'Browse and filter donor information and their associated neomer findings.',
    slides: [
      {
        img: '/images/donor_table.png',
        label: 'Patients Table',
        description:
          'The Patient Data page provides functionalities that enable users to filter patient records based on specific individual characteristics. Users can select particular patient records and download the selected entries in CSV format. Additionally, the interface allows customization of visible columns, enhancing usability. Both genomic and exomic datasets within the patient data exhibit complete feature parity, ensuring uniformity. Selecting an individual patient directs the user to a detailed patient page.',
      },
      {
        img: '/images/donor_filters.png',
        label: 'Filtering Interface',
        description:
          'Users can filter on patient characteristics such as age at diagnosis, sex, cancer type and more. ',
      },
    ],
  },
  {
    title: 'Patient Page',
    description: 'Review individual donor (patient) data, neomer findings, and neomer statistics.',
    slides: [
      {
        img: '/images/patient_overview.png',
        label: 'Overview',
        description:
          'The patient details page provides comprehensive information on patient characteristics, including the cancer type and associated organ. From this detailed view, users can perform a patient-specific neomer search by specifying a desired sequence length and inputting a text prefix. This functionality generates a list of the top matching neomers of the specified length that begin with the provided text. Moreover, upon selecting a neomer from the results of the prefix-based search, users can examine its occurrence across different patients, cancer types, and organs, thereby enabling deeper investigation into the distribution of specific neomers.',
      },
      {
        img: '/images/patient_neomers_and_viz.png',
        label: 'Patient Neomers and Neomer Analysis',
        description: 'Searching by neomer prefix and analyzing a neomer',
      },
    ],
  },
  {
    title: 'Visualizations',
    description:
      'NeomerDB provides multiple dynamic visualizations to explore the neomer data. These include the Jaccard index that compares the shared neomers between cancer types, pie charts that break down the number of neomers discovered per cancer types across k-mer lengths and break-down of neomers discover by the neomer length. Finally, the user can visualize selected patient samples and examine the number of neomers identified and their recurrency. ',
    slides: [
      {
        img: '/images/neomers_by_cancer_type_and_length.png',
        label: 'Data Charts',
        description:
          'A multi leveled pie chart where each ring represents a neomer length and each color represents a different cancer type ',
      },
      {
        img: '/images/neomers_by_length_for_specific_cancer_type.png',
        label: 'Pie Chart for specific cancer type',
        description:
          'When the user clicks in a specific slice of the pie chart representing a cancer type he can inspect the distribution on the different neomer lengths in a pie chart for the selected Cancer Type',
      },
      {
        img: '/images/jaccard.png',
        label: 'Jaccard Similarity',
        description:
          'The Jaccard heatmap is used to showcase that little to no overlap takes place between neomers of different cancer types.',
      },
    ],
  },
  {
    title: 'Download Page',
    description: 'Export selected datasets and results for further offline analysis.',
    slides: [
      {
        img: '/images/download_center.png',
        label: 'Data Export',
        description:
          'The neomerDB dataset is openly available for download via Zenodo repositories, providing users with flexible access to curated, cancer-specific genomic information. Downloads can be parameterized through the neomerDB website based on neomer length. Users can also distinguish between Genomic and Exomic datasets and further refine their selection by downloading the dataset in its entirety, by individual cancer type, or by cancer organ system. All datasets were generated using the neomer extraction and common variant filtering algorithms and are provided in compressed CSV format.',
      },
    ],
  },
  {
    title: 'About & License',
    description:
      'Information about NeomerDB, General statistics and stats, authorship, affiliations, and licensing.',
    slides: [
      {
        img: '/images/about_page.png',
        label: 'About NeomerDB',
        description: 'Learn about the project background, authors, and affiliations.',
      },
      {
        img: '/images/license_page.png',
        label: 'Privacy & License',
        description: 'Understand data usage rights and license agreements.',
      },
    ],
  },
];
