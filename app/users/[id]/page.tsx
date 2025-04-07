'use client'
import { getUserById } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function UserDetailPage() {
  const { id } = useParams();
  const { data: user } = useQuery({ queryKey: ["user", id], queryFn: () => getUserById(id as string) });

  if (!user){
    return <p>Loading...</p>
  } ;

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-bold">User Detail</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      
    </div>
  );
}
