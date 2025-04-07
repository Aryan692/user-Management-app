
'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/lib/queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userSchema , UserFormData } from "@/app/schemas/userSchema";
import Link from "next/link";

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({ resolver: zodResolver(userSchema) });

  const mutation = useMutation({ mutationFn: createUser });

  const onSubmit = (data: UserFormData) => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <Input placeholder="Name" {...register("name")}/>
      {errors.name && <p>{errors.name.message}</p>}

      <Input placeholder="Email" {...register("email")}/>
      {errors.email && <p>{errors.email.message}</p>}

      <Input placeholder="Phone" {...register("phone")}/>
      {errors.phone && <p>{errors.phone.message}</p>}

      <Button type="submit">Create User</Button>
     <Link href="/users"> <Button type="submit">User Details</Button></Link>
    </form>
  );
}