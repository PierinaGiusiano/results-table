import styled from "styled-components";

export const StyledOverlay = styled.div`
    position: absolute;
    right: 0;
    width: 320px;
    height: 100%;
    background-color: #e6e8ef;
    display: none;

    &.active {
        display: block;
        z-index: 100;
    }
`

export const Divider = styled.div`
    border-bottom: 1px solid #c1c6d7;
    width: 100%;
`