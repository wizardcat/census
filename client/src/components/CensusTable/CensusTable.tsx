import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES_FOR_FIX } from '../../constants';
import { CensusTableHeader } from './CensusTableHeader';
import { useCensusTable } from './useCensusTable';

const CensusTable = () => {
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
                  {censusData.map((dataByLanguage, idx: number) => (
                    <TableRow
                      key={dataByLanguage.lang.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      hover
                    >
                      <TableCell component="th" scope="row">
                        {++idx}
                      </TableCell>
                      <TableCell align="right">
                        {LANGUAGES_FOR_FIX.ukrainian.wordForms.includes(
                          dataByLanguage.lang.name,
                        ) ? (
                          <FormattedMessage id={LANGUAGES_FOR_FIX.ukrainian.intlId} />
                        ) : (
                          dataByLanguage.lang.name
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {LANGUAGES_FOR_FIX.russian.wordForms.includes(
                          dataByLanguage.lang.langGroup.name,
                        ) ? (
                          <FormattedMessage id={LANGUAGES_FOR_FIX.russian.intlId} />
                        ) : (
                          dataByLanguage.lang.langGroup.name
                        )}
                      </TableCell>
                      <TableCell align="right">{dataByLanguage.males || ''}</TableCell>
                      <TableCell align="right">{dataByLanguage.females || ''}</TableCell>
                      <TableCell align="right">
                        {Number(dataByLanguage.males) + Number(dataByLanguage.females) || ''}
                      </TableCell>
                      <TableCell align="right">{getPercentOfTotal(dataByLanguage)}</TableCell>
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
