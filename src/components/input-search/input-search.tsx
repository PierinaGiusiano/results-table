import React from "react"

import {  StyledSearchTextField } from "./input-search.styled"

interface InputTextProps extends React.ComponentProps<"input"> {
  placeholder: string
  value?: string
  onChangeValue?: (value: string) => void
}

const InputSearch = ({
  placeholder,
  value,
  onChangeValue,
  ...rest
}: InputTextProps) => {
  return (
    <StyledSearchTextField
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChangeValue?.(event.target.value)}
        {...rest}
      />
    </StyledSearchTextField>
  )
}

export default InputSearch
