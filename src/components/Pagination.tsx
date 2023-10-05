import classes from "./Pagination.module.css";

type PaginationType = {
  currentPage: number;
  amountOfPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
};

function Pagination({
  currentPage,
  amountOfPages,
  onPrevPage,
  onNextPage,
}: PaginationType) {
  return (
    <div className={classes.page_buttons}>
      Page
      <button onClick={onPrevPage}>{"<"}</button>
      {currentPage}
      <button onClick={onNextPage}>{">"}</button>
      of {amountOfPages}
    </div>
  );
}

export default Pagination;
