import React, { useEffect, useState } from "react";
import axios from "axios";
import MealItem from "./MealItem";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/meals").then((response) => {
      setLoadedMeals(response.data);
    });
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
