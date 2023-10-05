import classes from "./Loader.module.css";

function Loader() {
  return (
    <div className={classes.loader_container}>
      <div className={classes.loader}></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
