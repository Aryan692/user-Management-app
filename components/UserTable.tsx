
'use client';

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/queries";
import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

export default function UserTable() {
  const router = useRouter();
  const { data = [] } = useQuery({ queryKey: ["users"], queryFn: getUsers });
  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor("name", { header: () => "Name" }),
    columnHelper.accessor("email", { header: () => "Email" }),
    columnHelper.accessor("phone", { header: () => "Phone" }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full bg-gray-50 border-2 text-center ">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} onClick={() => router.push(`/users/${row.original._id}`)} className="cursor-pointer">
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}