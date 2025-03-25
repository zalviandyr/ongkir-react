import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type SelectOption = {
  value: string;
  label: string;
};

interface TextFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  options?: SelectOption[];
}

export const SelectField = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  options,
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
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder ?? `Select a ${name.toLowerCase()}`} />
                </SelectTrigger>

                <SelectContent>
                  {options?.map((e) => (
                    <SelectItem value={e.value}>{e.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
