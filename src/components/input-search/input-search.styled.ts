import styled from "styled-components"

export const StyledSearchTextField = styled.div`
    flex: 1;
    min-height: 40px;
    box-sizing: border-box;
    padding: 8px;
    color: #14171f;
    background-color: #ffffff;
    font-size: 16px;
    font-weight: normal;
    line-height: 18px;
    border-radius: 8px;

    input {
        flex: 1;
        border: 0;
        inset: 0;
        background-color: inherit;
        color: inherit;
        line-height: 18px;
        padding: 8px;
    }

    input:focus-visible {
        outline: none;
    }

    input::placeholder {
        color: #4f5b7d!important;
    }

    input::-ms-input-placeholder {
        color: #4f5b7d!important;
    }
`
