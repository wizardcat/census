import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { CensusTable, Regions } from '../../components'

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <Paper> */}
          <Typography gutterBottom variant="h4" component="div" align="center">
            The First General Census of the Russian Empire of 1897. Breakdown of
            population by mother tongue and districts* in 50 Governorates of the
            European Russia
          </Typography>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <Regions />
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <CensusTable />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
