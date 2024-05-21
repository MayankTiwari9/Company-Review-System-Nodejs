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
        <input
          type="text"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
          placeholder="Search for a company"
        />
        <button type="submit">Search</button>
      </form>
      <h1>Search Results for: {company}</h1>
      <h2>Average Rating: {averageRating.toFixed(1)}</h2>
      {searchedCompanies.map((comp, index) => (
        <div key={index}>
          <p>Pros: {comp.pros}</p>
          <p>Cons: {comp.cons}</p>
          <p>Rating: {comp.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchedCompany;
