'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createUser, updateUser } from "@/lib/queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { userSchema,UserFormData } from "@/app/schemas/userSchema";
import Link from "next/link";

export default function UserForm({ user, id }: { user?: UserFormData; id?: string }) {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({ resolver: zodResolver(userSchema) });

  useEffect(() => {
    if (user) reset(user);
  }, [user]);

  const mutation = useMutation({
    mutationFn: (data: UserFormData) => (id ? updateUser({ id, data }) : createUser(data)),
    onSuccess: () => {
      if (!id) {
        reset();
        setSuccessMsg("User successfully registered.!");
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        router.push("/users");
      }
    },
  });

  const onSubmit = (data: UserFormData) => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <Input placeholder="Name" {...register("name" as const)} />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <Input placeholder="Email" {...register("email" as const)} />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <Input placeholder="Phone" {...register("phone" as const)} />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

      {successMsg && <p className="text-green-600 font-medium">{successMsg}</p>}
      <span className="flex space-x-2">
      <Button type="submit">{id ? "Update" : "Create"} User</Button>
      <Link href="/users"><Button type="submit"> Users Detail</Button></Link>
      </span>
    </form>
  );
}