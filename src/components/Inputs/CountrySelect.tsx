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
        onChange={(value) => console.log(value)}
        isClearable
      />
    </div>
  );
};

export default CountrySelect;
