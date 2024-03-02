import { CensusTable, LocaleButton, RegionFilter, RegionsTable } from '@app/components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

export const Home = () => {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 2, opacity: '0.9' }}>
      <LocaleButton />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="div" align="center">
            <FormattedMessage id="header" />
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} sx={{ width: '300px', position: 'sticky', top: 0 }}>
          <RegionFilter />
          <RegionsTable />
        </Grid>
        <Grid item xs={12} md={9}>
          <CensusTable />
        </Grid>
      </Grid>
    </Box>
  );
};
