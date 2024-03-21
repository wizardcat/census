import { languageReplace } from '@app/constants';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { FormattedMessage } from 'react-intl';
import { CensusTableHeader } from './CensusTableHeader';
import { useCensusTable } from './useCensusTable';

export const CensusTable = () => {
  const { censusData, getPercentOfTotal } = useCensusTable();

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: '79vh' }} component={Paper}>
              <Table stickyHeader size="small" aria-label="census table">
                <CensusTableHeader />
                <TableBody>
                  {censusData?.map((censusRecord, idx: number) => (
                    <TableRow
                      key={censusRecord.language.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      hover
                    >
                      <TableCell component="th" scope="row">
                        {++idx}
                      </TableCell>
                      <TableCell align="right">
                        {languageReplace.ukrainian.wordForms.includes(
                          censusRecord.language.name,
                        ) ? (
                          <FormattedMessage id={languageReplace.ukrainian.intlId} />
                        ) : (
                          censusRecord.language.name
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {languageReplace.russian.wordForms.includes(
                          censusRecord.language.languageGroup.name,
                        ) ? (
                          <FormattedMessage id={languageReplace.russian.intlId} />
                        ) : (
                          censusRecord.language.languageGroup.name
                        )}
                      </TableCell>
                      <TableCell align="right">{censusRecord.males || ''}</TableCell>
                      <TableCell align="right">{censusRecord.females || ''}</TableCell>
                      <TableCell align="right">
                        {Number(censusRecord.males) + Number(censusRecord.females) || ''}
                      </TableCell>
                      <TableCell align="right">{getPercentOfTotal(censusRecord)}</TableCell>
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
