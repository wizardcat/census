import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { MouseEvent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Region } from '../../types';
import { useRegionsTable } from './useRegionsTable';

const RegionsTable = () => {
  const {
    regs,
    handleListItemClick,
    regionId,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useRegionsTable();

  // if (isLoading) return 'Loading...';

  // if (error) return 'An error has occurred: ' + error.message;

  return (
    // <Box sx={{ width: '100%', position: 'sticky', top: '169px' }}>
    //   <Paper sx={{ width: '100%', mb: 2 }}>
    // <Box sx={{ position: 'sticky', top: '169px' }}>
    //, margin: '0 auto 0 auto'
    // {/* component={Paper} */}
    // sx={{ position: 'sticky', top: '153px' }}
    <Grid container>
      <Grid item sx={{ width: '100%' }}>
        <Box>
          <Paper sx={{ mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ width: '90%', margin: '0 auto 0 auto', minWidth: 260, height: 430 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="subtitle2">
                        <FormattedMessage id="tableRegions.header.name" />
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {regs.regions.map((region: Region, idx: number) => {
                    return (
                      <TableRow
                        hover
                        onClick={(event: MouseEvent<HTMLElement>) =>
                          handleListItemClick(event, region.id)
                        }
                        key={region.id}
                        selected={regionId === region.id}
                      >
                        <TableCell component="th" scope="row" align="left">
                          {region.parentId === 0 ? (
                            <Typography variant="button">{region.name}</Typography>
                          ) : (
                            <Typography sx={{ marginLeft: '10px' }} variant="body2">
                              {region.name}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              sx={{
                'div.MuiTablePagination-actions': {
                  marginLeft: 0,
                },
              }}
              labelRowsPerPage={<FormattedMessage id="tableRegions.labelRowsPerPage" />}
              rowsPerPageOptions={[10, 15, 20]}
              component="div"
              count={regs.regionsCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegionsTable;

