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
    return (
        <Pagination className="mt-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        aria-disabled={!pagination?.prev}
                        onClick={() => handlePageChange(currentPage - 1)}
                        tabIndex={!pagination?.prev ? -1 : undefined}
                        className={!pagination?.prev ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
                {Array.from({ length: pagination?.totalPages > 3 ? 3 : pagination?.totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            isActive={index + 1 === currentPage}
                            className={index + 1 === currentPage ? "" : "cursor-pointer"}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {pagination?.totalPages > 3 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }
                <PaginationItem>
                    <PaginationNext
                        aria-disabled={!pagination?.next}
                        onClick={() => handlePageChange(currentPage + 1)}
                        tabIndex={!pagination?.next ? -1 : undefined}
                        className={!pagination?.next ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
};