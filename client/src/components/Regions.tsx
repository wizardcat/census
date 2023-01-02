import { useState, useEffect, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { Region } from '../redux/actionTypes'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { getCensus } from '../redux/censusSlice'

const Regions: React.FC = () => {
  const [regionId, setRegionId] = useState(0)
  const dispatch = useAppDispatch()

  const regs = useAppSelector(state => {
    return state.region.fetchedRegions
  })

  useEffect(() => {
    if (regs.length > 0) {
      setRegionId(regs[0].id)
    }
  }, [regs])

  useEffect(() => {
    if (regionId > 0) {
      dispatch(getCensus(regionId))
    }
  }, [dispatch, regionId])

  const handleListItemClick = (event: MouseEvent<HTMLElement>, id: number) => {
    setRegionId(id)
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="regions">
        {regs.map((reg: Region, idx: number) => (
          <div key={reg.id}>
            {idx > 0 && <Divider />}
            <ListItemButton
              selected={regionId === reg.id}
              key={reg.id}
              onClick={(event: MouseEvent<HTMLElement>) =>
                handleListItemClick(event, reg.id)
              }
            >
              <ListItemText primary={reg.name_ru} />
            </ListItemButton>
          </div>
        ))}
      </List>
    </Box>
  )
}

export default Regions
