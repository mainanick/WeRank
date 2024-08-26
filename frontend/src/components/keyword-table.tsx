import { KeywordResult } from "@/lib/types"
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "./ui/table"

export function KeywordTable(props: {results: KeywordResult[]}) {
    const {results: data} = props
    const [sorting, setSorting] = useState<SortingState>([])
    
    const columns = useMemo<ColumnDef<KeywordResult>[]>(
      () => [
        {
          accessorFn: row => row.keyword,
          id: 'keyword',
          header: 'Keyword'
        },
        {
          accessorFn: row => row.search_volume,
          id: 'search_volume',
          header: 'Search Volume'
        },
        {
          accessorFn: row => row.competition,
          id: 'competition',
          header: 'Competition',
        },
        {
          accessorFn: row => row.competition_index,
          id: 'competition_index',
          header: 'Competition Index',
        },
        {
          accessorFn: row => row.cpc,
          id: 'cpc',
          header: 'CPC',
        },
        {
          accessorFn: row => row.high_top_of_page_bid,
          id: "high_top_of_page_bid",
          header: 'High Top Of Page Bid',
        },
        {
          accessorFn: row => row.low_top_of_page_bid,
          id: "low_top_of_page_bid",
          header: 'Low Top Of Page Bid',
        }
      ],
      []
    )
  
    const table = useReactTable<KeywordResult>({
      data,
      columns,
      debugTable: true,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(), //client-side sorting
      onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
      state: {
        sorting,
      },
      
    })
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                       {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : ''
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === 'asc'
                                ? 'Sort ascending'
                                : header.column.getNextSortingOrder() === 'desc'
                                  ? 'Sort descending'
                                  : 'Clear sort'
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </TableHead>
                  )})}
            
          </TableRow>
        ))}
          
        </TableHeader>
        <TableBody>
        {table
              .getRowModel()
              .rows
              .map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
        </TableBody>
      </Table>
    )
  }