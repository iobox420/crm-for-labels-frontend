function addKey(data: any) {
  const dataWithKey = data.map((row: any, i: any) => {
    return {
      key: i,
      ...row,
    }
  })
  return dataWithKey
}

export default addKey
