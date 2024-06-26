import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { CensusTableHeader } from './CensusTableHeader';
import { useCensusTable } from './useCensusTable';

export const CensusTable = () => {
  const { censusData, getPercentOfTotal, getLanguageName, getLanguageGroupName } = useCensusTable();

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
            <TableContainer sx={{ height: '79vh', width: '1112' }} component={Paper}>
              <Table stickyHeader size="small" aria-label="census table">
                <CensusTableHeader />
                <TableBody>
                  {censusData?.map(({ language, males, females }, idx) => (
                    <TableRow
                      key={language.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      hover
                    >
                      <TableCell component="th" scope="row">
                        {++idx}
                      </TableCell>
                      <TableCell align="right">{getLanguageName(language.name)}</TableCell>
                      <TableCell align="right">
                        {getLanguageGroupName(language.languageGroup.name)}
                      </TableCell>
                      <TableCell align="right">{males || ''}</TableCell>
                      <TableCell align="right">{females || ''}</TableCell>
                      <TableCell align="right">{Number(males) + Number(females) || ''}</TableCell>
                      <TableCell align="right">{getPercentOfTotal(males, females)}</TableCell>
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
