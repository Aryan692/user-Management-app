import UserTable from "@/components/UserTable";

export default function UsersPage() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">All Users Detail</h1>
      <UserTable />
    </div>
  );
}