import styled from "@emotion/styled"
import { CircularProgress } from "@material-ui/core"
import React from "react"

const LoadingWrapper = styled("div")`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Loading = () => (
  <LoadingWrapper>
    <CircularProgress />
  </LoadingWrapper>
)
