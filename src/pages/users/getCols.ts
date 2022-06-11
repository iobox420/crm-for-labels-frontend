import { IArtist } from "@/models/IArtist";

const getCols = (row: IArtist) => {
  const propArr = Object.keys(row)
  const width = 100 / (propArr.length + 1)
  const cols = propArr.map(propName => ({
    title: propName,
    dataIndex: propName,
    width: `${width}%`,
    editable: true,
  }))
  return cols
}
export default getCols