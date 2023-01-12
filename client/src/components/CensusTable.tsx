import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { FormattedMessage } from 'react-intl'
import { useAppSelector } from '../redux/hooks'
import { Censuses } from '../types'

const calcTotal = (rows: Censuses) => {
  return rows.reduce((prev, cur) => {
    return Number(prev) + Number(cur.males) + Number(cur.females)
  }, 0)
}

const CensusTable = () => {
  const rows = useAppSelector(state => {
    return state.census.fetchedCensus
  })

  const total = calcTotal(rows)
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 450 }}
                stickyHeader
                aria-label="census table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <FormattedMessage id="tableCensus.header.position" />
                    </TableCell>
                    <TableCell align="right">
                      <FormattedMessage id="tableCensus.header.language" />
                    </TableCell>
                    <TableCell align="right">
                      <FormattedMessage id="tableCensus.header.langGroup" />
                    </TableCell>
                    <TableCell align="right">
                      <FormattedMessage id="tableCensus.header.male" />
                    </TableCell>
                    <TableCell align="right">
                      <FormattedMessage id="tableCensus.header.female" />
                    </TableCell>
                    <TableCell align="right">
                      <FormattedMessage id="tableCensus.header.bothSexes" />
                    </TableCell>
                    <TableCell align="right">
                      <FormattedMessage id="tableCensus.header.percentOfTotal" />
                    </TableCell>
                  </TableRow>
                </TableHead>
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
                        {['Малоруська', 'Malorussian', 'Малорусский'].includes(
                          row.lang.name
                        ) ? (
                          <FormattedMessage id="langFix.ukrainian" />
                        ) : (
                          row.lang.name
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {['Російська', 'Russian', 'Русский'].includes(
                          row.lang.langGroup.name
                        ) ? (
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
                          ? (
                              ((Number(row.males) + Number(row.females)) *
                                100) /
                              total
                            ).toFixed(3)
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
  )
}

export default CensusTable
