"use client";

import useCountries, { FormattedCountry } from "@/app/hooks/useCountries";

import { FC } from "react";
import Select from "react-select";

interface CountrySelectProps {
  value: FormattedCountry | null;
  onChange: (value: FormattedCountry) => void;
}

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        value={value}
        options={getAll()}
        onChange={(value) => onChange(value as FormattedCountry)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>{option.label}</div>
            <span className="text-neutral-800 ml-1">{option.region}</span>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
