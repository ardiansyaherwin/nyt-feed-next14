import { Input } from "@/components/ui/input";
import { useState } from "react";

const SearchBar = ({
  disabled,
  onSubmit,
  defaultValue,
}: {
  disabled: boolean;
  onSubmit: (q: string) => void;
  defaultValue: string;
}) => {
  const [keyword, setKeyword] = useState(defaultValue);

  return (
    <form
      aria-disabled={disabled}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(keyword);
      }}
    >
      <Input
        type="text"
        disabled={disabled}
        value={keyword}
        placeholder="Search article..."
        onChange={(e) => setKeyword(e.target.value)}
        className="rounded-[8px]"
      />
    </form>
  );
};

export default SearchBar;
