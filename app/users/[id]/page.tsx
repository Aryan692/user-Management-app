'use client'

import { Button } from "@/components/ui/button";
import { deleteUser, getUserById, updateUser } from "@/lib/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, refetch } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("User deleted successfully!");
      router.push("/users");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateUser({ id: id as string, data }),
    onSuccess: (updatedUser) => {
      setIsEditing(false);
      setFormData({
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
      });
      refetch();
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  // Set initial form data when user is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      deleteMutation.mutate(id as string);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    updateMutation.mutate(formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">User Detail</h1>

      {isEditing ? (
        <>
          <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          <div className="flex gap-2">
            <Button onClick={handleUpdate}>Update</Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </div>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <div className="flex gap-2">
            <Button onClick={handleEditClick}>Edit</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </>
      )}
    </div>
  );
}
