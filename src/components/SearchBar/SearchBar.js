import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [result, setResult] = useState([]);

  const [showMessage, setShowMessage] = useState(false);
  const inputSearchHandler = (event) => {
    setInputSearch(event.target.value);
  };
  const url = `https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?ingr=${inputSearch}&nutrition-type=cooking`;

  const getFoodCalories = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "731bb71b23msh21c235d3c646963p131fa4jsn2a871c777f8a",
        "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const results = await response.json();
      if (results.hints[0].food.nutrients.ENERC_KCAL === 717) {
        setResult([0]);
        setShowMessage();
      } else {
        setShowMessage(true);
        setResult([Math.round([results.hints[0].food.nutrients.ENERC_KCAL])]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(result);
  // useEffect(() => {
  //   getFoodCalories();
  // }, []);
  console.log(result);
  return (
    <div>
      <div className="text-center mt-3">
        <h2>Search food calories by name</h2>
        <form className="">
          <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
              <input
                className="form-control position-relative"
                type="search"
                value={inputSearch}
                onChange={inputSearchHandler}
                placeholder="Search"
                aria-label="Search"
              ></input>
            </div>
          </div>

          <button
            className="btn btn-outline-success"
            type="button"
            onClick={getFoodCalories}
          >
            Search
          </button>
        </form>
        <div style={{ textAlign: "center" }}>
          <h2>{inputSearch}</h2>
          {showMessage &&
            result.map((food, index) => {
              return (
                <div key={index}>
                  <h2>{`${food} Calories.`}</h2>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
