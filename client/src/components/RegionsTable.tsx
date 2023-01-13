import { useState, useEffect, useRef, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import { FormattedMessage } from 'react-intl'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { QueryGetRegionsParams } from '../types'
import { Region } from '../types'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { getRegions } from '../redux/regionsSlice'
import { getCensus } from '../redux/censusSlice'

const RegionsTable = () => {
  const [regionId, setRegionId] = useState(0)
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(0)
  const prevPage = useRef(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [lastIdList, setLastIdList] = useState([])

  const regs = useAppSelector(state => {
    return state.region.fetchedRegions
  })

  const locale = useAppSelector(state => {
    return state.locale.locale
  })

  useEffect(() => {
    let idx = 0
    if (page > prevPage.current) {
      idx = page <= 1 ? 0 : page - 1
    } else {
      idx = page
    }
    if (lastIdList.length === 0 || lastIdList[idx] >= 0) {
      let params: QueryGetRegionsParams = {
        lastId: lastIdList[page - 1],
        skip: rowsPerPage,
        take: rowsPerPage,
        locale,
      }
      dispatch(getRegions(params))
    }
  }, [dispatch, locale, page, rowsPerPage, lastIdList])

  useEffect(() => {
    if (regs.regions.length > 0) {
      setRegionId(regs.regions[0].id)
    }
  }, [page, regs])

  useEffect(() => {
    if (regionId > 0) {
      const params = { locale: locale, regionId: regionId }
      dispatch(getCensus(params))
    }
  }, [dispatch, locale, page, rowsPerPage, regionId])

  const handleListItemClick = (event: MouseEvent<HTMLElement>, id: number) => {
    setRegionId(id)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    prevPage.current = page

    setLastIdList(prev => {
      let newList: any = prev
      if (prev.length === 0 || page === 0) {
        newList[0] = regs.regions[regs.regions.length - 1].id
      } else {
        newList[page] = regs.regions[regs.regions.length - 1].id
      }

      return newList
    })

    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    setLastIdList([])
  }

  return (
    <Box sx={{ width: '100%', position: 'sticky', top: '169px' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 260 }}
            stickyHeader
            aria-labelledby="tableTitle"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    <FormattedMessage id="tableRegions.header.name" />
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {regs.regions.map((row: Region, idx: number) => {
                return (
                  <TableRow
                    hover
                    onClick={(event: MouseEvent<HTMLElement>) =>
                      handleListItemClick(event, row.id)
                    }
                    key={row.id}
                    selected={regionId === row.id}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {row.parentId === 0 ? (
                        <Typography variant="button">{row.name}</Typography>
                      ) : (
                        <Typography sx={{ marginLeft: '10px' }} variant="body2">
                          {row.name}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            'div.MuiTablePagination-actions': {
              marginLeft: 0,
            },
          }}
          labelRowsPerPage={
            <FormattedMessage id="tableRegions.labelRowsPerPage" />
          }
          rowsPerPageOptions={[5, 15, 30]}
          component="div"
          count={regs.regionsCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default RegionsTable
