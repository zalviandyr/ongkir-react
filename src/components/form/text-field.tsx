import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface TextFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  type?: "text" | "password";
}

export const TextField = <T extends FieldValues>({
  form,
  name,
  label,
  type = "text",
}: TextFieldProps<T>) => {
  return (
    <div className="my-4">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...field} type={type} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
