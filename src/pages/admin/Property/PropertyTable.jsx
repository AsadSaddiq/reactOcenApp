import React, { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetPropertyApiQuery } from "../../../redux/features/property/propertyApi";

const PropertyTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [query, setQuery] = useState("");
  const { data: property, isError, isLoading } = useGetPropertyApiQuery();
  const navigate = useNavigate();

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  const filteredData = useMemo(() => {
    if (!globalFilter) return property;
    return property.filter((employee) =>
      Object.values(employee).some((value) =>
        String(value).toLowerCase().includes(globalFilter.toLowerCase())
      )
    );
  }, [globalFilter, isLoading]);

  const paginatedData = useMemo(() => {
    const startIndex = pagination.pageIndex * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return filteredData?.slice(startIndex, endIndex);
  }, [pagination, filteredData, isLoading]);

  const [refreshEmployee, setRefreshEmployee] = useState(false);

  const handleSearch = (val) => {
    setGlobalFilter(val.trim());
  };

  useEffect(() => {
    setPagination({ ...pagination, pageIndex: 0 });
  }, [pagination.pageSize]);

  useEffect(() => {
    setPagination({ ...pagination, pageIndex: 0 });
  }, [refreshEmployee]);

  useEffect(() => {
    if (property?.length > 0) {
      const firstRow = property[0];
      setRowSelection({
        [firstRow.id]: true,
      });
      setSelectedLicense(firstRow);
    }
  }, [isLoading]);

  const columns = useMemo(
    () => [
      {
        id: "id",
        columns: [
          {
            accessorKey: "property_type",
            header: "Type",
            minSize: 1,
            size: 1,
            maxSize: 1,
          },
          {
            accessorKey: "purpose",
            header: "Purpose",
            minSize: 1,
            size: 1,
            maxSize: 1,
          },
          {
            accessorKey: "city",
            header: "City",
            minSize: 0,
            size: 1,
            maxSize: 1,
          },
          {
            accessorKey: "created_at",
            header: "PostDate",
            minSize: 0,
            size: 1,
            maxSize: 1,
            Cell: ({ cell, renderedCellValue }) => {
              return (
                <div className="overflow-hidden whitespace-nowrap w-[100px] truncate">
                  {formatDate(renderedCellValue)}
                </div>
              );
            },
          },
          {
            accessorKey: "rent_amount",
            header: "Price",
            minSize: 0,
            size: 1,
            maxSize: 1,
          },
        ],
      },
    ],
    [filteredData, isLoading]
  );

  useEffect(() => {
    if (!query) {
      setGlobalFilter("");
    }
  }, [query]);

  return (
    <div className="flex h-[88%] mt-4">
      {isLoading ? (
        <Spin
          className="flex items-center w-full justify-center"
          size="large"
        />
      ) : (
        <>
          <div className="w-full flex flex-col ">
            <div className="w-full mb-4 flex justify-between h-10">
              <div className="flex w-full">
                <input
                  className="w-[50%] px-3 h-full rounded-lg border focus:outline-none"
                  type="text"
                  value={query}
                  onChange={(e) => {
                    handleSearch(e.target.value);
                    setQuery(e.target.value);
                  }}
                  placeholder="Search..."
                />
              </div>
              <button
                className="flex w-32 border items-center justify-center rounded-lg bg-gray-200"
                onClick={() => {
                  navigate("/admin/property/create");
                }}
              >
                Add New
              </button>
            </div>
            <MaterialReactTable
              initialState={{
                density: "compact",
              }}
              getRowId={(row) => row.id}
              muiTableBodyRowProps={({ row }) => ({
                onClick: () => {
                  setRowSelection({
                    [row.id]: true,
                  });
                  setSelectedLicense(property.find((e) => e.id === row.id));
                  console.log("row.id");
                  console.log(row.id);
                  navigate(`/admin/property/create`, {
                    state: { propertyId: row.id },
                  });
                },
                selected: rowSelection[row.id],
                sx: {
                  cursor: "pointer",
                  backgroundColor: rowSelection[row.id] ? "#D3D3D3" : "",
                  ":hover": {
                    backgroundColor: rowSelection[row.id] ? "#D3D3D3" : "",
                  },
                },
              })}
              columns={columns}
              data={paginatedData || []}
              enableColumnActions={false}
              enableColumnFilters={false}
              enableTopToolbar={false}
              enableRowNumbers={false}
              manualPagination
              rowCount={filteredData?.length}
              onSortingChange={setSorting}
              state={{
                pagination,
                sorting,
                showProgressBars: false,
                globalFilter,
              }}
              onGlobalFilterChange={setGlobalFilter}
              onPaginationChange={(newPagination) =>
                setPagination(newPagination)
              }
              muiLinearProgressProps={{
                color: "secondary",
              }}
              positionToolbarAlertBanner="bottom"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyTable;
