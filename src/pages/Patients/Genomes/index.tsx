import { Box } from '@mui/material';
import { usePatientGenomes } from '../../../hooks/use-patients';
import { DataTable } from '../../../components/Datatable';
import {
  filterPatientData,
  genetateFiltersOperatorsPerColumns,
  normalizeTableData,
} from '../../../helpers';
import type { PatientsEntry, PatientsHeader } from '../../../types/patients';
import { INITIAL_NEOMER_PATIENTS_VISIBLE_COLUMNS } from '../../../constants';
import { useState, useEffect } from 'react';
import { useRouter, useSearch } from '@tanstack/react-router';
import type { FilterItem } from '../../../types/nullomers';

const PatientsGenomes = () => {
  const { data, isLoading, error } = usePatientGenomes();

  const { data: genomesData, headers } = data || {
    data: [],
    headers: [],
  };

  const router = useRouter();
  const search = useSearch({
    strict: false,
  });
  const urlFilters = search.filters ?? '[]';

  const [filters, setFilters] = useState<FilterItem[]>(() => {
    try {
      return JSON.parse(urlFilters) as FilterItem[];
    } catch {
      return [];
    }
  });

  const [columnsState, setColumnsState] = useState<{
    ordering: string[];
    visibility: Record<string, boolean>;
  } | null>({
    visibility:
      headers?.reduce(
        (accumulator, header) => ({
          ...accumulator,
          [header]: INITIAL_NEOMER_PATIENTS_VISIBLE_COLUMNS.includes(header),
        }),
        {},
      ) || {},
    ordering: INITIAL_NEOMER_PATIENTS_VISIBLE_COLUMNS,
  });

  const [debouncedFilters, setDebouncedFilters] = useState<FilterItem[]>(filters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  const [tableParameters, setTableParameters] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 0,
    pageSize: 10,
  });

  const tableRows = normalizeTableData(headers || [], genomesData || []) as Array<{
    [K in PatientsHeader]: PatientsEntry;
  }>;

  const filteredRows = filterPatientData(tableRows, debouncedFilters);

  if (!headers || !genomesData) {
    return;
  }

  const rows = filteredRows.slice(
    tableParameters.page * tableParameters.pageSize,
    (tableParameters.page + 1) * tableParameters.pageSize,
  );

  return (
    <Box display={'flex'} flexDirection={'column'} height={'100%'} width={'100%'}>
      <DataTable
        data={rows || []}
        columns={headers || []}
        columnVisibility={columnsState?.visibility || {}}
        defaultColumnVisibility={INITIAL_NEOMER_PATIENTS_VISIBLE_COLUMNS}
        columnsOrdering={columnsState?.ordering || []}
        onColumnVisibilityChange={(visibility) =>
          setColumnsState((previous) => ({ ...previous!, visibility }))
        }
        onColumnOrderingChange={(columnId, newIndex) => {
          setColumnsState((previous) => {
            const newOrdering = [...previous!.ordering];
            const currentIndex = newOrdering.indexOf(columnId);
            if (currentIndex === -1) return previous!;
            newOrdering.splice(currentIndex, 1);
            newOrdering.splice(newIndex, 0, columnId);
            return {
              ...previous!,
              ordering: newOrdering,
            };
          });
        }}
        pageSize={tableParameters.pageSize}
        pageSizeSelection={[10, 20, 50, 100, filterPatientData?.length || 200]}
        page={tableParameters.page}
        totalRows={filteredRows?.length || 0}
        filters={filters}
        filtersOperators={genetateFiltersOperatorsPerColumns(headers || [])}
        onFiltersChange={(newFilters) => {
          setTableParameters((previous) => ({ ...previous, page: 0 }));
          setFilters(newFilters);
          router.navigate({
            search: {
              ...search,
              filters: JSON.stringify(newFilters),
            },
          });
        }}
        onPageChange={(page) => {
          setTableParameters((previous) => ({ ...previous, page }));
        }}
        onRowsPerPageChange={(rowsPerPage: number) => {
          setTableParameters((previous) => ({
            ...previous,
            pageSize: rowsPerPage,
            page: 0,
          }));
        }}
        onRowClick={(row) => {
          router.navigate({
            to: `/patient/${row.bcr_patient_barcode}`,
            search: {},
          });
        }}
        loading={isLoading}
        error={error?.message || ''}
      />
    </Box>
  );
};

export default PatientsGenomes;
