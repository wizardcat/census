import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCensus } from '../redux/actions'

const Regions = () => {
  const [regionId, setRegionId] = useState(0)
  const dispatch = useDispatch()

  const regs = useSelector(state => {
    return state.regs.fetchedRegions
  })

  useEffect(() => {
    if (regs.length > 0) {
      setRegionId(regs[0].id)
    }
  }, [regs])

  useEffect(() => {
    if (regionId > 0) {
      dispatch(fetchCensus(regionId))
    }
  }, [dispatch, regionId])

  const handleListItemClick = (event, id) => {
    setRegionId(id)
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="regions">
        {regs.map((reg, idx) => (
          <div key={reg.id}>
            {idx > 0 && <Divider />}
            <ListItemButton
              selected={regionId === reg.id}
              key={reg.id}
              onClick={event => handleListItemClick(event, reg.id)}
            >
              <ListItemText primary={reg.name} />
            </ListItemButton>
          </div>
        ))}
      </List>
    </Box>
  )
}

export default Regions
