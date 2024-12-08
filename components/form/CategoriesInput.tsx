import { Label } from "@/components/ui/label";
import { categories } from "@/utils/options";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const name = "category";

function CategoriesInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Property Type
      </Label>
      <Select defaultValue={defaultValue || categories[0]} name={name} required>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((item) => {
            return (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
export default CategoriesInput;
