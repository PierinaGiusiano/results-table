import { Column } from "@tanstack/react-table"
import { Divider, StyledOverlay } from "./results-options.styled"
import { StyledFlexContainer, StyledIconButton } from "../results-table.styled"

interface ResultsOptionsProps<T extends Record<string, unknown>> {
  showOptions: boolean
  handleOptions: () => void
  features: Column<T, unknown>[]
  isBlockStyle?: boolean
}

const ResultsOptions = ({
  showOptions,
  handleOptions,
  features,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: ResultsOptionsProps<Record<string, any>>) => {
  return (
    <StyledOverlay className={`${showOptions && "active"}`}>
      <StyledFlexContainer style={{justifyContent: "space-between", padding: 4}}>
        <div style={{ padding: "8px 16px 8px 12px" }}>
          <h3>Results options</h3>
        </div>
        <div>
          <StyledIconButton
            style={{ width: "40px" }}
            onClick={handleOptions}
          >
            X
          </StyledIconButton>
        </div>
      </StyledFlexContainer>
      <Divider />
      <div style={{overflowY: "scroll"}}>
        <StyledFlexContainer
          style={{flexDirection: "column", flex: 1, padding: 16, gap: 16, height: "100%"}}
        >
          <div>
            <p><b>Features</b></p>
          </div>
          <StyledFlexContainer style={{flexDirection: "column", gap: 8}}>
            {features.map((column, index) => (
              <StyledFlexContainer key={`feature-${index}`} style={{alignItems: "center", gap: 4}}>
                <input
                  type="checkbox"
                  id={`feature-${index}`}
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                />
                <p>{column.columnDef.header as string}</p>
              </StyledFlexContainer>
            ))}
          </StyledFlexContainer>
        </StyledFlexContainer>
      </div>
    </StyledOverlay>
  )
}

export default ResultsOptions
