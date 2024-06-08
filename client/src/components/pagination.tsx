import { TPagination } from "@server/types";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type TPaginationProps = {
    currentPage: number;
    handlePageChange: (page: number) => void;
    pagination: TPagination;
};

export function PaginationComponent({ currentPage, handlePageChange, pagination }:TPaginationProps) {
    const { totalPages, prev, next } = pagination;

    const getPageNumbers = () => {
        const maxPagesToShow = 5;
        const pages = [];

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let start = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
            let end = Math.min(start + maxPagesToShow - 1, totalPages);

            if (end - start < maxPagesToShow - 1) {
                start = Math.max(end - maxPagesToShow + 1, 1);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <Pagination className="mt-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        aria-disabled={!prev}
                        onClick={() => prev && handlePageChange(currentPage - 1)}
                        tabIndex={!prev ? -1 : undefined}
                        className={!prev ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
                {pageNumbers[0] > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                className="cursor-pointer"
                                onClick={() => handlePageChange(1)}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {pageNumbers[0] > 2 && <PaginationEllipsis />}
                    </>
                )}
                {pageNumbers.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            isActive={page === currentPage}
                            className={page === currentPage ? "" : "cursor-pointer"}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {pageNumbers[pageNumbers.length - 1] < totalPages && (
                    <>
                        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                            <PaginationEllipsis />
                        )}
                        <PaginationItem>
                            <PaginationLink
                                className="cursor-pointer"
                                onClick={() => handlePageChange(totalPages)}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}
                <PaginationItem>
                    <PaginationNext
                        aria-disabled={!next}
                        onClick={() => next && handlePageChange(currentPage + 1)}
                        tabIndex={!next ? -1 : undefined}
                        className={!next ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};