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
                  {censusData?.map(({ language, males, females }, idx) => (
                    <TableRow
                      key={language.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      hover
                    >
                      <TableCell component="th" scope="row">
                        {++idx}
                      </TableCell>
                      <TableCell align="right">
                        {languageReplace.ukrainian.wordForms.includes(language.name) ? (
                          <FormattedMessage id={languageReplace.ukrainian.intlId} />
                        ) : (
                          language.name
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {languageReplace.russian.wordForms.includes(language.languageGroup.name) ? (
                          <FormattedMessage id={languageReplace.russian.intlId} />
                        ) : (
                          language.languageGroup.name
                        )}
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
