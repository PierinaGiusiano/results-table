import { StyledTableRow } from "./table-row.styled"

export type TableRowProps = {
  isHeader?: boolean
  children: React.ReactNode
  isActive?: boolean
  isSelected?: boolean
}

const TableRow = ({
  isHeader,
  isActive,
  isSelected,
  children,
  ...rest
}: TableRowProps) => {
  return (
    <StyledTableRow
      {...rest}
      className={`${isHeader && "header"} ${isActive && "active"} ${isSelected && "selected"}`}
    >
      {children}
    </StyledTableRow>
  )
}

export default TableRow
