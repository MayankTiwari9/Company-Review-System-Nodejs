import React, { useState } from "react";
import axios from "axios";

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    pros: "",
    cons: "",
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:4000/add-company', formData);
      alert("Company Review Added Successfully");
      setFormData({
        name: "",
        pros: "",
        cons: "",
        rating: 0
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
    <div>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="name">Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Company Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pros">Pros</label>
          <textarea
            id="pros"
            name="pros"
            placeholder="Pros"
            value={formData.pros}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cons">Cons</label>
          <textarea
            id="cons"
            name="cons"
            placeholder="Cons"
            value={formData.cons}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rating</label>
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num}>
              <input
                type="radio"
                name="rating"
                value={num}
                checked={formData.rating === num}
                onChange={handleChange}
                required
              />
              {num}
            </label>
          ))}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add Review"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default CompanyForm;
