import React, { useState, useEffect } from 'react'

type Region = {
  id: number
  name_ua: string
  name_en: string
  name_ru: string
}

const useSelectedRegion = (reg: Region) => {
  const [region, setRegion] = useState({})

  useEffect(() => {
    setRegion({ id: reg.id, name: reg.name_ru })

    return () => {
      setRegion({})
    }
  }, [reg.id, reg.name_ru])

  return { region }
}
