"use client";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
export const PageSize = 3;
export interface PaginationProps {
  total: number;
  next?: (offset: number, limit: number) => void;
  prev?: (offset: number, limit: number) => void;
}
const Pagination = (props: PaginationProps) => {
  const { total, next, prev } = props;
  const pages = useMemo(() => {
    return Math.ceil(total / PageSize);
  }, [total]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const nextHandler = () => {
    let c = currentPage;
    if (c + 1 <= pages) {
      setCurrentPage(c + 1);
    } else {
      setCurrentPage(pages);
    }
    if (currentPage !== pages) {
      next && next(c * PageSize, PageSize);
    }
  };
  const prevHandler = () => {
    let c = currentPage;
    if (c - 1 > 0) {
      setCurrentPage(c - 1);
      prev && prev((c - 2) * PageSize, PageSize);
    }
  };
  return (
    <div className="flex gap-2 items-center border rounded-md px-6 py-2">
      <button
        className="rounded cursor-pointer"
        onClick={() => {
          prevHandler();
        }}
      >
        <ChevronLeft />
      </button>
      {pages > 0 && (
        <>
          <div className="flex gap-1">
            <span className="currentPage"> {currentPage}</span>
            <span> /</span>
            <span className="totalPage"> {pages}</span>
          </div>
        </>
      )}
      <button
        className="rounded cursor-pointer next"
        data-testid="next"
        id="next"
        onClick={() => {
          nextHandler();
        }}
      >
        <ChevronRight />
      </button>
    </div>
  );
};
export default Pagination;
