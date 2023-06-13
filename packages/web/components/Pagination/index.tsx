"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
export const PageSize = 3;
export interface PaginationProps {
  total: number;
  next?: (offset: number, limit: number) => void;
  prev?: (offset: number, limit: number) => void;
}
const Pagination = (props: PaginationProps) => {
  const { total, next, prev } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const nextHandler = () => {
    console.log("next");
    setCurrentPage(
      currentPage + 1 <= Math.ceil(total / PageSize)
        ? currentPage + 1
        : currentPage
    );
    next && next(currentPage * PageSize, PageSize);
  };
  const prevHandler = () => {
    setCurrentPage(currentPage - 1 > 1 ? currentPage - 1 : 1);
    prev && prev(currentPage * PageSize, PageSize);
  };
  return (
    <div className="flex gap-2 items-center border rounded-md p-2">
      <div>Total page: {Math.ceil(total / PageSize)}</div>
      <div>Current page: {currentPage}</div>
      {currentPage > 1 && (
        <Button
          onClick={() => {
            prevHandler();
          }}
        >
          <ChevronLeft />
        </Button>
      )}
      {total > PageSize && (
        <Button
          onClick={() => {
            nextHandler();
          }}
        >
          <ChevronRight />
        </Button>
      )}
    </div>
  );
};
export default Pagination;
