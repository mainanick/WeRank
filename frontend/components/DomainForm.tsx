import { DetailedHTMLProps, FormHTMLAttributes, useState } from "react";
import { Input } from "./ui/Input";
import { CountrySelect } from "./CountrySelect";

export type FormState = {
  target: string;
  location_name: string;
};
export default function DomainForm(props: {
  onFormSubmit: (s: FormState) => void;
}) {
  const [formState, setFormState] = useState({
    target: "",
    location_name: "Kenya",
  });
  return (
    <form
      id="KeywordForSite"
      onSubmit={(ev) => {
        ev.preventDefault();
        props.onFormSubmit(formState);
      }}
    >
      <div className="flex w-full max-w-sm items-center">
        <Input
          type="text"
          name="target"
          placeholder="Domain"
          className="h-8 border-r-0 rounded-r-none"
          onChange={(ev) => {
            setFormState({ ...formState, target: ev.target.value });
          }}
        />
        <CountrySelect
          name="location_name"
          onValueChange={(value) => {
            setFormState({ ...formState, location_name: value });
          }}
        />
        <button
          type="submit"
          className="h-8 px-2 ml-2 bg-red-400 rounded-md text-white"
        >
          Search
        </button>
      </div>
    </form>
  );
}
