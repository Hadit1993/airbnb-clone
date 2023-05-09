import countries from "world-countries";

export interface FormattedCountry {
  value: string;
  label: string;
  flag: string;
  latlng: [number, number];
  region: string;
}

const formattedCountries: FormattedCountry[] = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) =>
    formattedCountries.find((item) => item.value === value);

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
