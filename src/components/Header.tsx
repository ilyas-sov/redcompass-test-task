import { Link } from "react-router-dom";
import classes from "./Header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <Link to="/">Bank Transactions History App</Link>
    </header>
  );
}

export default Header;
