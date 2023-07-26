import { EventEntry } from 'redux/common';
import { Box, Tooltip } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { If } from 'components/common/If';

interface EventTableProps {
  removeRow: (id: string) => void;
  updateStatus: (id: string) => void;
  events: EventEntry[];
}

export const EventTable = (props: EventTableProps) => {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 2,
      minWidth: 120,
      maxWidth: 249,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 5,
      minWidth: 120,
      maxWidth: 249,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 5,
      minWidth: 100,
      maxWidth: 100,
      editable: false,
    },
    {
      field: 'complete',
      headerName: '',
      width: 50,
      editable: false,
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => (
        <Tooltip title={'Complete'} enterDelay={700}>
          <div style={{ cursor: 'pointer' }}>O</div>
        </Tooltip>
      ),
    },
    {
      field: 'remove',
      headerName: '',
      width: 50,
      editable: false,
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => (
        <Tooltip title={'Remove'} enterDelay={700}>
          <div style={{ cursor: 'pointer' }}>X</div>
        </Tooltip>
      ),
    },
  ];

  const rows = props.events.map((entry: EventEntry) => {
    return {
      id: entry.id,
      title: entry.title,
      description: entry.description,
      status: entry.status,
    };
  });

  return (
    <Box sx={{ maxWidth: '700px' }}>
      <If true={rows.length > 0}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          sx={{ mt: 1 }}
          columns={columns}
          rows={rows}
          hideFooterPagination={true}
          hideFooterSelectedRowCount={true}
          disableColumnSelector
          disableRowSelectionOnClick
          hideFooter
          onCellClick={(params: GridCellParams) => {
            return (
              (params.field === 'remove' && props.removeRow(params.row.id)) ||
              (params.field === 'complete' && props.updateStatus(params.row.id))
            );
          }}
        />
      </If>
    </Box>
  );
};
