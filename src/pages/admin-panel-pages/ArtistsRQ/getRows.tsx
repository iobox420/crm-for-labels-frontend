/*import moment from 'moment'
import React from 'react'

function getRows(data, edKey, cols) {

  // названия колонок которые из columns
  const keys = cols.map(col => {
    return col.dataIndex
  })
  const rows = data?.data.rows.map((artist, i) => {
    console.log('tick')
    const result = keys.reduce(
      (prevVal, curVal) => {
        let newObj = {
          ...prevVal,
        }
        switch (curVal) {
          case 'ref':
            newObj[curVal] = {
              key: i,
              data: artist.id_artist_contract,
              isEditing: i === edKey,
            }
            return newObj
          case 'key':
            newObj[curVal] = i
            return newObj
          case 'operation':
            newObj[curVal] = {
              key: i,
              data: artist[curVal],
              record: {
                ...artist,
              },
              isEditing: i === edKey,
            }
            return newObj
          case 'contract_agreement':
            newObj[curVal] = {
              key: i,
              data: moment(artist[curVal]),
              record: {
                ...artist,
              },
              isEditing: i === edKey,
            }
            return newObj
          default:
            newObj[curVal] = {
              key: i,
              data: artist[curVal],
              isEditing: i === edKey,
            }
            return newObj
        }
      },
      { key: i },
    )

    return result
  })
  return rows
}

export default getRows*/
import moment from 'moment'
import React from 'react'

function getRows(data, edKey, cols) {
  const rows = data?.data.rows.map((artist, i) => {
    return {
      ...artist,
      key:i,
    }
  })
  return rows
}

export default getRows
