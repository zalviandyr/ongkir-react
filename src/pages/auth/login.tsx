import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/form/text-field";
import { Link, useNavigate } from "react-router";
import { useLogin } from "@/api/auth";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(10),
});

type IFormSchema = z.infer<typeof formSchema>;

export const Login: React.FC = () => {
  const form = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { mutate } = useLogin();

  function onSubmit(value: IFormSchema) {
    mutate(
      { username: value.username, password: value.password },
      {
        onSuccess: () => {
          toast.success("Welcome", {
            description: "Calculate your package",
          });

          navigate("/", { replace: true });
        },
        onError: (e) => {
          toast.error("Failed login", {
            description: e.message,
          });
        },
      }
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TextField form={form} name="username" label="Username" />

            <TextField form={form} name="password" label="Password" type="password" />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm mt-3">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
