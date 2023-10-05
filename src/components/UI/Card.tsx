import { PropsWithChildren } from "react";
import classes from "./Card.module.css";

type CardType = {
  className?: string;
};

function Card({ children, className }: PropsWithChildren<CardType>) {
  return <div className={`${classes.card} ${className}`}>{children}</div>;
}

export default Card;
