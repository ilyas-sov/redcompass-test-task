import { PropsWithChildren } from "react";
import classes from "./Error.module.css";

function Error({ children }: PropsWithChildren) {
  return <p className={classes.error}>{children}</p>;
}

export default Error;
