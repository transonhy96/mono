"use client";
import { useState } from "react";
import { Button } from "../ui/button";
export const PageSize = 3;
export interface PaginationProps {
  total: number;
  next?: () => void;
  prev?: () => void;
}
const Pagination = (props: PaginationProps) => {
  const { total, next, prev } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const nextHandler = () => {
    let current = currentPage;
    setCurrentPage(current++);
    next && next();
  };
  const prevHandler = () => {
    let current = currentPage - 1;
    setCurrentPage(current > 0 ? current : 1);
    prev && prev();
  };
  return (
    <>
      <div>Total page{total / PageSize}</div>
      {currentPage > 1 && (
        <Button
          onClick={() => {
            prevHandler();
          }}
        >
          Previous
        </Button>
      )}
      {total > PageSize && (
        <Button
          onClick={() => {
            nextHandler();
          }}
        >
          Next
        </Button>
      )}
    </>
  );
};
export default Pagination;
