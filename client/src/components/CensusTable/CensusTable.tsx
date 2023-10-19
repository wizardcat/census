import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FormattedMessage } from 'react-intl';
import { CensusTableHeader } from './CensusTableHeader';
import { useCensusTable } from './useCensusTable';

const CensusTable = () => {
  const { rows, total } = useCensusTable();

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 450 }} stickyHeader aria-label="census table">
                <CensusTableHeader />
                <TableBody>
                  {rows.map((row, idx: number) => (
                    <TableRow
                      key={row.lang.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      hover
                    >
                      <TableCell component="th" scope="row">
                        {++idx}
                      </TableCell>
                      <TableCell align="right">
                        {['Малоруська', 'Malorussian', 'Малорусский'].includes(row.lang.name) ? (
                          <FormattedMessage id="langFix.ukrainian" />
                        ) : (
                          row.lang.name
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {['Російська', 'Russian', 'Русский'].includes(row.lang.langGroup.name) ? (
                          <FormattedMessage id="langFix.eastSlavicGroup" />
                        ) : (
                          row.lang.langGroup.name
                        )}
                      </TableCell>
                      <TableCell align="right">{row.males || ''}</TableCell>
                      <TableCell align="right">{row.females || ''}</TableCell>
                      <TableCell align="right">
                        {Number(row.males) + Number(row.females) || ''}
                      </TableCell>
                      <TableCell align="right">
                        {row.males || row.females
                          ? (((Number(row.males) + Number(row.females)) * 100) / total).toFixed(3)
                          : ''}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CensusTable;
