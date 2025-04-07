import UserForm from "@/components/UserForm";

export default function CreateUserPage() {
  return (
<div className="bg-blue-950 h-screen max-w-full flex items-center justify-center">
    <div className="p-4  border text-center h-90 w-90 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Create User</h1>
      <UserForm />
    </div>
    </div>
  );
}
 