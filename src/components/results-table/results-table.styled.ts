import styled from "styled-components";

export const StyledFlexContainer = styled.div`
    display: flex;

    .contentContainer {
        max-width: calc(100% - 92px);

        & > div {
            max-width: 100%;
        }

        .cardBadge {
            white-space: nowrap;
        }
    }

`


export const StyledIconButton = styled.button`
    background-color: transparent;
    border: 1px solid #c1c6d7;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
`

export const ScrollbarStyled = styled.div`
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #828eb0 #e6e8ef;

    &::-webkit-scrollbar {
        background: #e6e8ef;
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background: #828eb0;
        border-radius: 8px;
    }
`
