import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearch } from '@tanstack/react-router';

import { DataTable } from '../../../components/Datatable';

import {
  DEFAULT_NULLOMETER_QUERY_PARAMS,
  DEFAULT_NULLOMETER_STATS_PARAMS,
  INITIAL_NULLOMERS_VISIBLE_COLUMNS as INITIAL_VISIBLE_COLUMNS,
} from '../../../constants';
import { normalizeTableData } from '../../../helpers';

import type {
  NullomerEntry,
  NullomerHeader,
  NullomerQueryParameters,
  NullomerStatsParameters,
} from '../../../types/nullomers';
import { Box } from '@mui/material';
import ToolBar from '../../../components/Neomers/toolbar';
import { useExomes, useExomesStats } from '../../../hooks/use-neomers-exomes';

const updateURLParameters = (parameters: NullomerQueryParameters) => {
  const query = new URLSearchParams(
    Object.entries(parameters)
      .filter(([, value]) => value !== undefined)
      .map(([k, v]) => [k, String(v)]),
  );
  globalThis.history.replaceState(undefined, '', `?${query.toString()}`);
};

const Exomes = () => {
  const search = useSearch({ strict: false });

  const [parameters, setParameters] = useState<NullomerQueryParameters>(() => ({
    ...DEFAULT_NULLOMETER_QUERY_PARAMS,
    ...search,
  }));

  const previousParametersReference = useRef(parameters);
  useEffect(() => {
    if (JSON.stringify(previousParametersReference.current) !== JSON.stringify(parameters)) {
      updateURLParameters(parameters);
      previousParametersReference.current = parameters;
    }
  }, [parameters]);

  const { isLoading, data, error } = useExomes(parameters);

  const { headers, data: tableData, totalCount } = data || { headers: [], data: [], totalCount: 0 };

  const headersSafe = useMemo(() => (Array.isArray(headers) ? headers : []), [headers]);

  const useStats = (statsParameters: NullomerStatsParameters) =>
    useExomesStats({ ...DEFAULT_NULLOMETER_STATS_PARAMS, ...statsParameters }, !isLoading);

  const [columnsState, setColumnsState] = useState<{
    ordering: string[];
    visibility: Record<string, boolean>;
  } | null>();

  useEffect(() => {
    if (headersSafe.length === 0) return;

    const visibility = Object.fromEntries(
      headersSafe.map((header) => [header, INITIAL_VISIBLE_COLUMNS.includes(header)]),
    );
    const ordering = [
      ...INITIAL_VISIBLE_COLUMNS,
      ...headersSafe.filter((h) => !INITIAL_VISIBLE_COLUMNS.includes(h)),
    ];

    setColumnsState((previous) => {
      if (!previous) return { ordering, visibility };
      return {
        ordering: previous.ordering.length > 0 ? previous.ordering : ordering,
        visibility: Object.keys(previous.visibility).length > 0 ? previous.visibility : visibility,
      };
    });
  }, [headersSafe]);

  const normalizedData = normalizeTableData(headersSafe, tableData) as Array<{
    [K in NullomerHeader]: NullomerEntry;
  }>;

  return (
    <Box display={'flex'} flexDirection={'column'} height={'100%'} width={'100%'}>
      <DataTable
        data={normalizedData}
        columns={headersSafe}
        columnVisibility={columnsState?.visibility || {}}
        defaultColumnVisibility={INITIAL_VISIBLE_COLUMNS}
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
        error={error?.message || ''}
        pageSize={parameters.limit}
        page={parameters.page}
        totalRows={totalCount}
        onPageChange={(page) => setParameters((previous) => ({ ...previous, page }))}
        onRowsPerPageChange={(rowsPerPage) =>
          setParameters((previous) => ({ ...previous, limit: rowsPerPage, page: 0 }))
        }
        loading={isLoading}
        tableToolbox={
          <ToolBar
            isLoading={isLoading}
            length={parameters.length}
            setLength={(event: { target: { value: number } }) =>
              setParameters((previous) => ({ ...previous, length: event.target.value, page: 0 }))
            }
            headers={headersSafe}
            useStats={useStats}
          />
        }
        filterSuggestions={[
          'ACGACCGTTCG',
          'CGAACGGTCGT',
          'CGACGCGTATA',
          'CGCGCATAATA',
          'CGTATCGGTCG',
          'CGTCGTTCGAC',
          'TAACGTCGCGC',
          'TACGTCCGTCG',
          'TATTATGCGCG',
          'TTCGAGCGACG',
        ]}
      />
    </Box>
  );
};

export default Exomes;
