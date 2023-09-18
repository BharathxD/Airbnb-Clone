import countries from "world-countries";

/**
 * Formats the country data for easy access.
 *
 * @typedef {Object} FormattedCountry
 * @property {string} value - The country code (cca2).
 * @property {string} label - The common name of the country.
 * @property {string} flag - The URL of the country's flag image.
 * @property {number[]} latlng - The latitude and longitude coordinates of the country.
 * @property {string} region - The region to which the country belongs.
 */

/**
 * The useCountries function returns an object with methods to get all countries and a specific country by its value.
 *
 * @returns {Object} An object with two methods: `getAll` and `getByValue`.
 * @property {Function} getAll - Retrieves all formatted countries.
 * @property {Function} getByValue - Retrieves a specific country by its value.
 */
const useCountries = () => {
  /**
   * Get an array of all formatted countries.
   *
   * @returns {FormattedCountry[]} An array of formatted countries.
   */
  const getAll = () => formattedCountries;

  /**
   * Get a specific country by its value (country code).
   *
   * @param {string} value - The value (country code) of the country to retrieve.
   * @returns {FormattedCountry|undefined} The formatted country object, or undefined if not found.
   */
  const getByValue = (value) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
