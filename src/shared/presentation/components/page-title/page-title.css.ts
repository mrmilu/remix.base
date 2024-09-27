import { style } from "@vanilla-extract/css";
import { getBreakpoint } from "../../styles/breakpoints";

const container = style({
  display: "none",
  "@media": {
    [getBreakpoint("md")]: {
      display: "block"
    }
  }
});

const classes = {
  container
};

export default classes;
