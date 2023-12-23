

export const parsePropNames = (data: any) => {

    const strData = JSON.stringify(data).replaceAll('name_uk', 'name').replaceAll('name_en', 'name').replaceAll('name_ru', 'name')
    const parsedData = JSON.parse(strData)

    return parsedData

}