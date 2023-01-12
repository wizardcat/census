import { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { LOCALES } from '../const'
import { addLocale } from '../redux/localesSlice'

const LocaleButton = () => {
  const locale = useAppSelector(state => {
    return state.locale.locale
  })

  const [selected, setSelected] = useState(locale)

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSelected: string
  ) => {
    setSelected(newSelected)
  }

  const dispatch = useAppDispatch()

  return (
    <ToggleButtonGroup
      color="primary"
      value={selected}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      defaultValue={locale}
      sx={{ height: '20px', marginBottom: '20px' }}
    >
      <ToggleButton
        value="uk"
        onClick={() => dispatch(addLocale(LOCALES.UKRAINIAN))}
      >
        UK
      </ToggleButton>
      <ToggleButton
        value="en"
        onClick={() => dispatch(addLocale(LOCALES.ENGLISH))}
      >
        EN
      </ToggleButton>
      <ToggleButton
        value="ru"
        onClick={() => dispatch(addLocale(LOCALES.RUSSIAN))}
      >
        RU
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default LocaleButton
