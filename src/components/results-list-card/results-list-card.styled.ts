import styled from "styled-components"

export const StyledResultsListCard = styled.div`
    padding: 8px 8px 16px;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
    overflow: auto;
    margin-bottom: 8px;
    
    .content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #3b445e;
    }

    .cardTitle {
        padding: 4px 0;
    }

    &.selected {
        background-color: #cfdcfc;
    }

    .dropdownWrapper {
        min-width: 112px;
        color: #4f5b7d;
    }
`


export const Badge = styled.div`
    padding: 4px;
    color: #14171f;
    display: flex;
    gap: 8px;
    background-color: #f3f4f7;
    border-radius: 8px;
`
