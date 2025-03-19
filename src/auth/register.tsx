import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/form/text-field";
import { Link } from "react-router";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(10),
  confirmPassword: z.string().min(8).max(10),
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

  const onSubmit = (data: IFormSchema) => {
    console.log("Register Data:", data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TextField form={form} name="username" label="Username" />

            <TextField form={form} name="password" label="Password" />

            <TextField form={form} name="confirmPassword" label="Confirm Password" />

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
