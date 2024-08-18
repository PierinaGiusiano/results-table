
import { Column } from "@tanstack/react-table"

import { StyledResultsListCard, Badge } from "./results-list-card.styled"
import { StyledFlexContainer } from "../results-table/results-table.styled"

interface ResultsListCardProps<T extends Record<string, unknown>> {
  id: string
  data: T
  columns: Column<T, unknown>[]
  onChange?: () => void
  selected?: boolean
}

const ResultsListCard = <T extends Record<string, unknown>>(
  props: ResultsListCardProps<T>,
) => {
  const { id, columns, data, selected } = props
  const { onChange } = props

  return (
    <StyledResultsListCard className={`${selected && "selected"}`}>
      <input type="checkbox" id={id} checked={selected} onChange={onChange} />
      <StyledFlexContainer style={{gap: 8, alignItems: "flex-end"}} className="contentContainer">
        <StyledFlexContainer style={{flexDirection: "column", gap: 8}}>
          {columns.map((column, index) => {
            return (
              <StyledFlexContainer
                key={`list-column-${index}`}
                style={{gap: 8, alignItems: "center"}}
              >
                <Badge>
                    <p className="label">{column.columnDef.header as string}</p>
                </Badge>
                <p className="content">
                  {/* @ts-expect-error accesorKey exists */}
                  {data[column.columnDef.accessorKey as keyof T] as string}
                </p>
              </StyledFlexContainer>
            )
          })}
        </StyledFlexContainer>
       </StyledFlexContainer>
    </StyledResultsListCard>
  )
}

export default ResultsListCard
