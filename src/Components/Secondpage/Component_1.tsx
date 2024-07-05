import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import { DataGrid, GridColDef  } from '@mui/x-data-grid';
import axios from 'axios';
import { Post } from '../../Models/Post';

const Component_1: React.FC = () => {
  const [rows, setRows] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  interface RowDetailProps {
    row: GridRowData; // Specify the type/interface for row
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setRows(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', flex: 1, minWidth: 300, renderCell: (params) => (
      <div style={{ whiteSpace: 'pre-wrap' }}>{params.value}</div>
    )},
  ];

  const handleRowClick = (params: any) => {
    setSelectedRow(params.id === selectedRow ? null : params.id);
  };

  return (
    <Container maxWidth="md" sx={{ border: '2px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        JSON Data
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      ) : (
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid 
            pagination
            rows={rows} 
            columns={columns} 
            paginationMode="client" // Set your desired page size here
            autoHeight = {false} // Enable autoHeight to fit content
            disableRowSelectionOnClick 
            onRowClick={handleRowClick}
            {...(selectedRow !== null && {
              components: {
                RowDetail: React.FC<RowDetailProps> = ({ row }) => (
                  <div style={{ padding: '10px', whiteSpace: 'pre-wrap' }}>
                    <Typography variant="body1">{row.body}</Typography>
                  </div>
                ),
              },
              rows: rows.map((row) => ({
                ...row,
                isOpen: row.id === selectedRow,
              })),
              componentsProps: {
                rowDetail: { rowHeight: 100 },
              },
            })}
          />
        </div>
      )}
    </Container>
  );
};

export default Component_1;

