import { SelectField } from "@/components/form/select-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  origin: z.string().min(2).max(50),
  destination: z.string().min(2).max(10),
});

type IFormSchema = z.infer<typeof formSchema>;

export const Home: React.FC = () => {
  const form = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: "",
      destination: "",
    },
  });

  // const { data } = useGetProvince();

  const onSubmit = (data: IFormSchema) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 gap-10 justify-center items-center">
      <div className="w-96 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-10">Calculate shipping cost</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SelectField form={form} name="origin" label="Origin" />

            <SelectField form={form} name="destination" label="Destination" />

            <Button type="submit" className="w-full">
              Calculate
            </Button>
          </form>
        </Form>
      </div>

      <div className="w-96 bg-white shadow-lg rounded-lg p-6"></div>
    </div>
  );
};
