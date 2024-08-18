import { StyledTableData } from "./table-data.styled"

export type TableDataProps = {
  isCheckbox?: boolean
  isSortable?: boolean
  actionIcon?: React.ReactElement | boolean
  children?: React.ReactNode
  onClick?: (event: unknown) => void
  verticalAlign?: string
  width?: number | string
}

const TableData = ({
  isCheckbox,
  isSortable,
  actionIcon,
  children,
  onClick,
  verticalAlign,
  width,
}: TableDataProps) => {
  return (
    <StyledTableData
      className={`${isCheckbox && "isCheckbox"} ${actionIcon && "hasIcon"} ${isSortable && "isSortable"}`}
      onClick={onClick}
      style={{
        verticalAlign: verticalAlign,
        width: width,
      }}
    >
      <div className="content">
        {children}
        {actionIcon && <div className="actionIcon">{actionIcon}</div>}
      </div>
    </StyledTableData>
  )
}

export default TableData
