// components/ui/SearchBox.jsx

import { RefreshCcw, Search } from "lucide-react";
import Button from "./Button";
import { Input } from "./Input";

const SearchBox = ({ value, onChange, onReset, placeholder = "Search..." }) => {
  return (
    <div className="w-full max-w-sm flex items-center gap-2">
      <div className="relative">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-base-content/15 rounded-md pl-8 shadow"
        />
        <Search className="absolute left-2 top-2.25 h-4 w-4 text-gray-400" />
      </div>
      {value && (
        <div className="">
          <Button
            onClick={onReset}
            size="sm"
            variant="base"
            className="hover:bg-gray-800 hover:text-base-100"
          >
            <RefreshCcw className="text-xs h-4 w-4" /> Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchBox;

// Usage example

//  <SearchBox
//    value={searchQuery}
//    onChange={setSearchQuery}
//    placeholder="Search orders, user, or ID..."
//  />;
