import { HeaderContext } from "@tanstack/react-table";
import { Button } from "./ui/Button";
import { ArrowUpDown } from "lucide-react";

export function SortColumn<TData>(
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  ctx: HeaderContext<TData, any>,
  name: string,
  sortDirection = "asc"
) {
  const { column } = ctx;
  return (
    <Button
      variant="ghost"
      onClick={() =>
        column.toggleSorting(column.getIsSorted() === sortDirection)
      }
    >
      {name}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
