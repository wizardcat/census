import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { FormattedMessage } from 'react-intl';
import { useCensusTableHeader } from './useCensusTableHeader';

export function CensusTableHeader() {
  const { sortOrder, sortBy, createSortHandler, messageIds } =
    useCensusTableHeader();

  return (
    <TableHead>
      <TableRow>
        {messageIds.map((mesId) => {
          return (
            <TableCell key={mesId} align="right" sortDirection={sortBy === mesId ? sortOrder : false}>
              <TableSortLabel
                active={sortBy === mesId}
                direction={sortBy === mesId ? sortOrder : 'asc'}
                onClick={createSortHandler(mesId)}
              >
                <FormattedMessage id={mesId} />
                {sortBy === mesId ? (
                  <Box component="span" sx={visuallyHidden}>
                    {sortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
