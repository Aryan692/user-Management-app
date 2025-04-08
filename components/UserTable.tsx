
'use client';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers } from "@/lib/queries";
import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export default function UserTable() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data = [] } = useQuery({ 
    queryKey: ["users"],
     queryFn: getUsers
     });

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"]}),
  });

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("name", { header: () => "Name" }),
    columnHelper.accessor("email", { header: () => "Email" }),
    columnHelper.accessor("phone", { header: () => "Phone" }),

    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/users/${row.original._id}`)}>View</Button>
          {/* <Button variant="secondary" onClick={() => router.push(`/create-user?id=${row.original._id}`)}>Edit</Button> */}
          <Button variant="destructive" onClick={() => mutation.mutate(row.original._id)}>Delete</Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border bg-gray-50">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr  className ="text-black" key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th  key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr  key={row.id} className="border-t text-lg hover:text-blue-600">
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="p-3">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
