import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
// import Button from '@mui/material/Button'
import { CensusTable, Regions } from '../../components'
// import axios from 'axios'

const Home = () => {
  // const handleImportClick = () => {
  //   const extractData = async () => {
  //     try {
  //       const resp = await axios.post(`http://localhost:3001/extractData`)
  //       console.log(resp.status)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

  //   extractData()
  // }

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      {/* <Button onClick={handleImportClick}>Grab Data</Button> */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="div" align="center">
            The First General Census of the Russian Empire of 1897. Breakdown of
            population by native language and districts in Governorates of the
            Russia
          </Typography>
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
