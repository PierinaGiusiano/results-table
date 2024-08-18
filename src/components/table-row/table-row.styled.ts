import styled from "styled-components"
export const StyledTableRow = styled.tr`
  ${() => {
    return `
    background-color: #ffffff;
    border-bottom: 1px solid #c1c6d7;
    color: #14171f
    overflow: hidden;

    &.header {
      background-color: #f3f4f7;
      color: #3b445e;
      border-bottom: none;
    }

    &:hover:not(.header, .selected) {
      background-color: #e0e3eb;
      color: #14171f;
    }

    &.selected {
      background-color: #cfdcfc;
      border-bottom: 1px solid #0f4ce6;
    }

    &.active {
      background-color: #0f4ce6;
      border-bottom: 1px solid #668ef5;
      color: #fff;
    }
    `
  }}
`
