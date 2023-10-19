import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';

import { useRegionFilter } from './useRegionFilter';

// const ariaLabel = { 'aria-label': 'description' };

const RegionFilter: FC = () => {
  const { handleChange, placeholderText } = useRegionFilter();

  return (
    // sx={{ width: '100%', position: 'sticky', }}
    <Box component="form" noValidate autoComplete="off">
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Input
          sx={{ width: '100%', paddingLeft: 1 }}
          placeholder={placeholderText}
          // inputProps={ariaLabel}
          onChange={handleChange}
        />
      </Paper>
    </Box>
  );
};

export default RegionFilter;
