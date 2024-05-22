import React, { useState } from "react";
import axios from "axios";

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    pros: "",
    cons: "",
    rating: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post("http://localhost:4000/add-company", formData);
      alert("Company Review Added Successfully");
      setFormData({
        name: "",
        pros: "",
        cons: "",
        rating: 0,
      });
    } catch (err) {
      setError("An error occurred while adding the review. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="space-y-12 p-6">
        <h1 className="text-base flex mx-auto font-semibold leading-7 text-gray-900">
          Company Review
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Company name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="given-name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="flex mt-10  gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="pros"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Pros
            </label>
            <div className="mt-2">
              <textarea
                id="pros"
                name="pros"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.pros}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="cons"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cons
            </label>
            <div className="mt-2">
              <textarea
                id="cons"
                name="cons"
                rows={3}
                value={formData.cons}
                onChange={handleChange}
                required
                className="block full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-x-6 gap-y-8 mt-10 space-y-10">
          <label>Rating</label>
          {[1, 2, 3, 4, 5].map((num) => (
            <label
              key={num}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              <input
                type="radio"
                name="rating"
                value={num}
                checked={formData.rating === num}
                onChange={handleChange}
                required
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              {num}
            </label>
          ))}
        </div>

        <div className="m-6 flex items-center justify-start gap-x-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Submitting..." : "Add Review"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </form>
  );
};

export default CompanyForm;
