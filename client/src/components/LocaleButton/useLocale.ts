import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useState } from 'react'
import { addLocale } from '../../redux/localesSlice'

export const useLocale = () => {
  const locale = useAppSelector(state => {
    return state.locale.locale
  })

  const [selectedLocale, setSelectedLocale] = useState(locale)

  const handleLocaleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSelectedLocale: string
  ) => {
    setSelectedLocale(newSelectedLocale)
  }

  const handleLocaleClick = (locale: string) => {
    dispatch(addLocale(locale))
  }

  const dispatch = useAppDispatch()
  return {
    selectedLocale, handleLocaleChange, handleLocaleClick, locale
  }
}