import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { FormattedMessage } from 'react-intl';
import { useCensusTableHeader } from './useCensusTableHeader';

export function CensusTableHeader() {
  const {
    sortOrder,
    sortBy,
    createSortHandler,
    messageIds,
    getSortDirection,
    getActive,
    getDirection,
  } = useCensusTableHeader();

  return (
    <TableHead>
      <TableRow>
        {messageIds.map((id) => {
          return (
            <TableCell key={id} align="right" sortDirection={getSortDirection(id)}>
              <TableSortLabel
                active={getActive(id)}
                direction={getDirection(id)}
                onClick={createSortHandler(id)}
              >
                <FormattedMessage id={id} />
                {sortBy === id ? (
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
