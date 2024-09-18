import {
  SelectContentProps,
  SelectProps,
  SelectTriggerProps,
} from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

export function CountrySelect(
  props: SelectProps & {
    triggerProps?: SelectTriggerProps;
    contentProps?: SelectContentProps;
  }
) {
  const { triggerProps, contentProps, ...otherProps } = props;
  return (
    <Select {...otherProps}>
      <SelectTrigger className="h-8 border-l rounded-l-none" {...triggerProps}>
        <SelectValue placeholder="Country" />
      </SelectTrigger>
      <SelectContent className="bg-white" {...contentProps}>
        <SelectGroup>
          <SelectLabel>Country</SelectLabel>
          <SelectItem value="Kenya">Kenya</SelectItem>
          <SelectItem value="United States">USA</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
