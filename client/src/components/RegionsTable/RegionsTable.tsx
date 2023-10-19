import { MouseEvent } from 'react';
import Box from '@mui/material/Box';
import { FormattedMessage } from 'react-intl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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

  return (
    // <Box sx={{ width: '100%', position: 'sticky', top: '169px' }}>
    //   <Paper sx={{ width: '100%', mb: 2 }}>
    // <Box sx={{ position: 'sticky', top: '169px' }}>
    //, margin: '0 auto 0 auto'
    // {/* component={Paper} */}
    <Grid sx={{ position: 'sticky', top: '153px' }} container>
      <Grid item sx={{ width: '100%' }}>
        <Box>
          <Paper sx={{ mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ width: '90%', margin: '0 auto 0 auto', minWidth: 260 }}
                stickyHeader
                aria-labelledby="tableTitle"
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
                  {regs.regions.map((row: Region, idx: number) => {
                    return (
                      <TableRow
                        hover
                        onClick={(event: MouseEvent<HTMLElement>) =>
                          handleListItemClick(event, row.id)
                        }
                        key={row.id}
                        selected={regionId === row.id}
                      >
                        <TableCell component="th" scope="row" align="left">
                          {row.parentId === 0 ? (
                            <Typography variant="button">{row.name}</Typography>
                          ) : (
                            <Typography sx={{ marginLeft: '10px' }} variant="body2">
                              {row.name}
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
              rowsPerPageOptions={[5, 15, 30]}
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

