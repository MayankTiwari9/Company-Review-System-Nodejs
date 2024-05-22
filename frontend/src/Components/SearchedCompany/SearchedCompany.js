import React, { useState } from "react";
import axios from "axios";

const SearchedCompany = () => {
  const [company, setCompany] = useState("");
  const [searchedCompanies, setSearchedCompanies] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const searchedCompanyHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/company", {
        company,
      });
      const companies = response.data;
      setSearchedCompanies(companies);
      getAverageRating(companies);
    } catch (error) {
      console.log(error);
    }
  };

  const getAverageRating = (companies) => {
    const totalNoOfCompanies = companies.length;
    if (totalNoOfCompanies === 0) {
      setAverageRating(0);
      return;
    }
    const totalRating = companies.reduce((acc, curr) => acc + curr.rating, 0);
    const average = totalRating / totalNoOfCompanies;
    setAverageRating(average);
  };

  return (
    <div>
      <form onSubmit={searchedCompanyHandler}>
        <div className="sm:col-span-3">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Search For The Company
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setCompany(e.target.value)}
              value={company}
              required
              className="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          Search
        </button>
      </form>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Search Results for: {company}
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Average Rating: {averageRating.toFixed(1)}
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {searchedCompanies.map((comp) => (
              <article
                key={comp.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="group relative">
                  <h6 className="text-2xl font-thin tracking-tight text-gray-900 sm:text-3xl">
                    Pros:-{" "}
                  </h6>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {comp.pros}
                  </p>
                  <h6 className="text-2xl font-thin tracking-tight text-gray-900 sm:text-3xl">
                    Cons:-{" "}
                  </h6>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {comp.cons}
                  </p>
                  <h6 className="text-2xl font-thin tracking-tight text-gray-900 sm:text-3xl">
                    Ratings:-{" "}
                  </h6>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {comp.rating}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedCompany;
