import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/form/text-field";
import { Link, useNavigate } from "react-router";
import { useRegister } from "@/api/auth";
import { toast } from "sonner";

const formSchema = z
  .object({
    username: z.string().min(2).max(50),
    password: z.string().min(8).max(10),
    confirmPassword: z.string().min(8).max(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type IFormSchema = z.infer<typeof formSchema>;

const Register = () => {
  const form = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const { mutate } = useRegister();

  const onSubmit = (data: IFormSchema) => {
    mutate(
      { username: data.username, password: data.password },
      {
        onSuccess: () => {
          toast.success("Success register", {
            description: "Please login with registered user",
          });

          navigate("/login", { replace: true });
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TextField form={form} name="username" label="Username" />

            <TextField form={form} name="password" label="Password" type="password" />

            <TextField
              form={form}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
            />

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm mt-3">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
