'use client'
import { Button } from "@/components/ui/button";
import { deleteUser, getUserById } from "@/lib/queries";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useParams  , useRouter} from "next/navigation";







export default function UserDetailPage() {

  const queryClient = new QueryClient(); 
  const router = useRouter();

 const { id } = useParams();
  const { data: user } = useQuery({
     queryKey: ["user", id],
     queryFn: () => getUserById(id as string) 
    }); 

    const mutation = useMutation({
      mutationFn: deleteUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        alert("User deleted successfully!");
        router.push("/users");
      },
    });

    const handleDelete = (id: string) => {
      const confirm = window.confirm("Are you sure you want to delete this user?");
      if (confirm) {
        mutation.mutate(id);
      }
    };

    

  if (!user){
    return <p>Loading...</p>
  };

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-bold">User Detail</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>

          <div className="space-x-2">
              <Button variant="destructive" onClick={() => handleDelete(user._id)}>Delete</Button>
          </div>
      
    </div>
  );
}  