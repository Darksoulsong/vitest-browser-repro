import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, increment } from "../store";
import { StyledButton, Root } from "./SimpleMui.styled";

export const SimpleMui: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Root sx={{ backgroundColor: "green" }}>
      <p>Count: {count}</p>
      <StyledButton variant="contained" onClick={() => dispatch(increment())}>
        Increment
      </StyledButton>
    </Root>
  );
};
