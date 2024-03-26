import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';

import { useRegionFilter } from './useRegionFilter';

export const RegionFilter = () => {
  const { handleChange, placeholderText } = useRegionFilter();

  return (
    <Box component="form" noValidate autoComplete="off">
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Input
          sx={{ width: '100%', paddingLeft: 1, height: 43 }}
          placeholder={placeholderText}
          onChange={handleChange}
        />
      </Paper>
    </Box>
  );
};
