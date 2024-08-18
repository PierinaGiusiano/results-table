import styled from "styled-components"

export const StyledTableData = styled.td`
  ${() => {
    return `
    flex: 1;
    text-align: left;
    padding: 16px 20px;  
    color: inherit;
    cursor: default;
    vertical-align: top;
    overflow: hidden;
    white-space: nowrap;
    max-width: 25vw;

    & > span {
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
      overflow: hidden;
    }

    &.isSortable {
      cursor: pointer;
    }

    &.isCheckbox {
      width: 40px;
      padding: 0;
      text-align: center;
      vertical-align: middle;
    }

    &.hasIcon {
      display: table-cell;
      align-items: center;
      position: relative;
      padding: 0 16px;
      vertical-align: middle;

      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .content > span {
        padding: 16px 20px;
        text-indent: 0;
      }

      .actionIcon {
        text-align: center;
        padding: 0 4px;

        & > * {
          color: #4f5b7d;
        }
      }
    }
    `
  }}
`
