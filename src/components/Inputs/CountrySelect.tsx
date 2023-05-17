import useCountries from "@/hooks/useCountry";
import { FC } from "react";
import Select from "react-select";

export interface CountrySelectValue {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder="Anywhere"
        options={getAll()}
        className="bg-red-500"
        onChange={(value) => onChange(value as unknown as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label}
              <span className="text-neutral-500 ml-1 text-xs">{option.region}</span>
            </div>
          </div>
        )}
        isClearable
      />
    </div>
  );
};

export default CountrySelect;
