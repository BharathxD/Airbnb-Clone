import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    lable: country.name.common,
    flag: country.flag,
    latlng: country.region,
    region: country.region
}));

/**
 * The function returns an object with methods to get all countries and a specific country by value.
 * @returns An object with two methods: `getAll` and `getByValue`.
 */
const useCountries = () => {
    // Get all the countries
    const getAll = () => formattedCountries;
    // Get a specific country by value
    const getByValue = (value: string) => {
        return formattedCountries.find((item) => (item.value === value));
    }
    return {
        getAll,
        getByValue
    }
}

export default useCountries;