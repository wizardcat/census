import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'

const calcTotal = rows => {
  return rows.reduce((prev, cur) => {
    return Number(prev) + Number(cur.males) + Number(cur.females)
  }, 0)
}

const CensusTable = () => {
  const rows = useSelector(state => {
    return state.censusRows.fetchedCensus
  })

  const total = calcTotal(rows)

  return (
    <Grid container spacing={2}>
      <Grid item>
        <TableContainer component={Paper} sx={{ height: '89vh' }}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell align="right">
                  Language or group of languages
                </TableCell>
                <TableCell align="right">
                  Language or group of languages
                </TableCell>
                <TableCell align="right">Males</TableCell>
                <TableCell align="right">Females</TableCell>
                <TableCell align="right">Both sexes</TableCell>
                <TableCell align="right">% of total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.lang}</TableCell>
                  <TableCell align="right">{row.langGroup}</TableCell>
                  <TableCell align="right">{row.males}</TableCell>
                  <TableCell align="right">{row.females}</TableCell>
                  <TableCell align="right">
                    {row.males + row.females || ''}
                  </TableCell>
                  <TableCell align="right">
                    {row.males || row.females
                      ? (((row.males + row.females) * 100) / total).toFixed(2)
                      : ''}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default CensusTable
