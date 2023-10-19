import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import { useRegionFilter } from './useRegionFilter';

const ariaLabel = { 'aria-label': 'description' };

const RegionFilter: FC = () => {
  const { handleChange } = useRegionFilter();

  return (
    <Box sx={{ width: '100%' }} component="form" noValidate autoComplete="off">
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Input
          sx={{ width: '100%' }}
          placeholder="Type the region name"
          inputProps={ariaLabel}
          onChange={handleChange}
        />
      </Paper>
    </Box>
  );
};

export default RegionFilter;
