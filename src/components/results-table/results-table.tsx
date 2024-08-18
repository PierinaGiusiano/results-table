import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { HTMLAttributes, forwardRef, useMemo, useState } from "react"
import { ScrollbarStyled, StyledFlexContainer, StyledIconButton } from "./results-table.styled"
import InputSearch from "../input-search/input-search"
import { TableVirtuoso, Virtuoso } from "react-virtuoso"
import TableRow from "../table-row/table-row"
import TableData from "../table-data/table-data"
import ResultsListCard from "../results-list-card/results-list-card"
import ResultsOptions from "./results-options/results-options"

type ResultsTableProps<T extends Record<string, unknown>> = {
    results: number
    data: T[]
    isSideBySide?: boolean
}

const List = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ children, ...rest }, ref) => (
      <div
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    ),
  )

const Scroller = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ style, ...props }, ref) => (
      <ScrollbarStyled style={{ ...style }} ref={ref} {...props} />
    ),
)

const ResultsTable = <T extends Record<string, unknown>> (
    props: ResultsTableProps<T>
) => {
    const { results, data } = props

    const [columnVisibility, setColumnVisibility] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({})
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [type, setType] = useState<"results" | "list">("results")

    const columns: ColumnDef<T>[] = useMemo(() => {
        return Object.keys(data?.[0] ?? {})
          .filter((item) => !item.includes("_"))
          .map((key) => ({
            header: key,
            accessorKey: key as keyof T,
            cell: (info) => info.getValue(),
            sortUndefined: "last",
          }))
      }, [data])
    
    const { getHeaderGroups, getRowModel, getAllColumns, getVisibleFlatColumns } =
    useReactTable({
      data,
      columns,
      state: { sorting, columnVisibility },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
    })

  const rows = getRowModel().rows

  const toggleRowSelection = (rowId: string | number) => {
    setSelectedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }))
  }

  const toggleSelectAll = () => {
    const allSelected = rows.every((row) => isSelected(row.id))
    const newSelectedRows = rows.reduce(
      (acc, row) => {
        acc[row.id] = !allSelected
        return acc
      },
      {} as Record<string, boolean>,
    )
    setSelectedRows(newSelectedRows)
  }

  const isSelected = (rowId: string | number) => selectedRows[rowId] ?? false

  const allRowsSelected =
    rows.length > 0 && rows.every((row) => isSelected(row.id))

  const handleOptions = () => setShowOptions(!showOptions)
  
    return (
        <StyledFlexContainer style={{overflow: "hidden", position: "relative", borderRadius: 8, width: "100%", height: "100%"}}>
            <StyledFlexContainer style={{flexDirection: "column", flex: 1}}>
                <div style={{backgroundColor: "#dadde7"}}>
                    <StyledFlexContainer style={{gap: 8, flexDirection: "column", padding: 8}}>
                        <h3>Results: {results} entries</h3>
                        <StyledFlexContainer style={{gap: 16, flexWrap: "wrap", rowGap: 8}}>
                            <InputSearch placeholder="Search" />
                            <StyledFlexContainer style={{alignItems: "center", padding: 8, borderRadius: 8, backgroundColor: "#fff", gap: 4}}>
                                <StyledIconButton onClick={() => setType("results")}>
                                    <img width="24" height="24" src="https://img.icons8.com/ios/24/table-1.png" alt="table-1"/>
                                </StyledIconButton>
                                <StyledIconButton onClick={() => setType("list")}>
                                    <img width="20" height="20" src="https://img.icons8.com/plumpy/20/list.png" alt="list"/>
                                </StyledIconButton>
                            </StyledFlexContainer>
                            <StyledFlexContainer style={{alignItems: "center", padding: 8, borderRadius: 8, backgroundColor: "#fff", gap: 4}}>
                                <StyledIconButton onClick={handleOptions}>
                                    <img width="20" height="20" src="https://img.icons8.com/parakeet-line/20/sorting-options.png" alt="sorting-options"/>
                                </StyledIconButton>
                            </StyledFlexContainer>
                        </StyledFlexContainer>
                    </StyledFlexContainer>
                </div>
                <StyledFlexContainer style={{backgroundColor: "#dadde7", flex: 1}}>
                    {
                        type === "results" ? (
                            <TableVirtuoso 
                                data={rows} 
                                style={{minHeight: "80vh", width: "100%"}} 
                                components={{
                                    Table: ({ style, ...props }) => (
                                        <table
                                        {...props}
                                        style={{
                                            ...style,
                                            borderCollapse: "collapse",
                                            width: "100%",
                                        }}
                                        />
                                    ),
                                    TableBody: forwardRef(({ ...props }, ref) => (
                                        <tbody {...props} ref={ref} />
                                    )),
                                    TableRow: (props) => {
                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                        const index = props["data-index"]
                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                        const row = rows[index]
                                        return (
                                            <TableRow {...props} key={`row-${row.id}`} isSelected={isSelected(row.id)}>
                                                <TableData isCheckbox>
                                                    <input 
                                                        type="checkbox" 
                                                        onChange={() => toggleRowSelection(row.id)}
                                                        checked={isSelected(row.id)}
                                                    />
                                                </TableData>
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableData key={`cell-${cell.id}`}>
                                                        <p>
                                                            {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext(),
                                                            )}
                                                        </p>
                                                    </TableData>
                                                ))}
                                            </TableRow>
                                        )
                                    },
                                    Scroller,
                                }}
                                fixedHeaderContent={()=> 
                                    getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={`header-group-${headerGroup.id}`} isHeader>
                                            <TableData isCheckbox>
                                                <input 
                                                    id="all"
                                                    type="checkbox" 
                                                    onChange={toggleSelectAll}
                                                    checked={allRowsSelected}
                                                />
                                            </TableData>
                                            {headerGroup.headers.map((header) => (
                                                <TableData 
                                                    key={`header-${header.id}`}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    isSortable={header.column.getCanSort()}
                                                    actionIcon={
                                                        header.column.getCanSort() && (
                                                          <StyledIconButton>
                                                            {
                                                              header.column.getIsSorted() ? (
                                                                header.column.getIsSorted() === "desc" ? (
                                                                    <img width="24" height="24" src="https://img.icons8.com/ios/24/down--v1.png" alt="down--v1"/>
                                                                ) : (
                                                                    <img width="24" height="24" src="https://img.icons8.com/ios/24/up--v1.png" alt="up--v1"/>
                                                                )
                                                              ) : (
                                                                <img width="24" height="24" src="https://img.icons8.com/external-jumpicon-line-ayub-irawan/24/external-arrows-arrows-jumpicon-line-jumpicon-line-ayub-irawan-12.png" alt="external-arrows-arrows-jumpicon-line-jumpicon-line-ayub-irawan-12"/>
                                                              )
                                                            }
                                                          </StyledIconButton>
                                                        )
                                                    }
                                                >
                                                   {header.isPlaceholder ? null : (
                                                        <p>
                                                            <b>
                                                                {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext(),
                                                                )}
                                                            </b>
                                                        </p>
                                                    )}
                                                </TableData>
                                            ))}
                                        </TableRow>
                                    ))
                                }
                            />
                        ) : (
                            <div style={{backgroundColor: "#dadde7", flex: 1, padding: 8}}>
                                <Virtuoso
                                    style={{
                                        minHeight: "80vh",
                                        width: "100%",
                                    }}
                                    data={data}
                                    itemContent={(index, row) => (
                                        <ResultsListCard
                                            key={`row-${index}`}
                                            id={`row-${index}`}
                                            columns={getVisibleFlatColumns()}
                                            data={row}
                                            selected={isSelected(index)}
                                            onChange={() => toggleRowSelection(index)}
                                        />
                                    )}
                                    components={{ List, Scroller }}
                                />
                            </div>
                        )
                    }
                </StyledFlexContainer>
            </StyledFlexContainer>
            <ResultsOptions
                showOptions={showOptions}
                handleOptions={handleOptions}
                // TODO: Properly type features
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                features={getAllColumns() as any}
            />
        </StyledFlexContainer>
    )
}


export default ResultsTable;