import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { viewRecipe } from "../../Utilities/api";
import { FaFire } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

import "./RecipePage.scss";


/**
 * Chosen Recipe Page
 */
export default function RecipePage({ isLoggedIn, changeLogin }) {

  // Hooks
  const { uri } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [healthLabels, setHealthLabels] = useState([]);
  const [dietLabels, setDietLabels] = useState([]);
  const [totalNutrients, setTotalNutrients] = useState([]);
  const [recipe, setRecipe] = useState([]);

  /* Nutrients */
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");

  /* Health Labels */
  const [fixedHealthLabels, setFixedHealthLabel] = useState([
    "Gluten-Free",
    "Egg-Free",
    "Peanut-Free",
    "Dairy-Free",
    "Pork-Free",
    "Alcohol-Free",
    "Sugar-Conscious",
    "Vegan",
    "Vegetarian",
    "Keto-Friendly",
    "Pescatarian"
  ]);
  const [hasSameLabels, setHasSameLabels] = useState(false);
  const hasSameHealthLabels = healthLabels.filter((label) =>
    fixedHealthLabels.includes(label)
  );

  /* Calories */
  const [cals, setCals] = useState("");
  const calories = cals / recipe.yield;

  /* Doughnut Chart */
  const doughnutChartRef = useRef(null);


  // Getting the data of the recipe
  useEffect(() => {
    if (uri !== undefined) {
      viewRecipe(uri)
        .then((data) => {
          const first = data.hits[0];
          setRecipe(first.recipe);

          setIngredients(first.recipe.ingredientLines);
          setHealthLabels(first.recipe.healthLabels);
          setDietLabels(first.recipe.dietLabels);

          setTotalNutrients(first.recipe.totalNutrients);

          setCals(first.recipe.calories.toFixed(0));

          setCarbs(first.recipe.totalNutrients.CHOCDF.quantity.toFixed(0));
          setProtein(first.recipe.totalNutrients.PROCNT.quantity.toFixed(0));
          setFat(first.recipe.totalNutrients.FAT.quantity.toFixed(0));
        })
        .catch((error) => {
          console.log("Error retrieving recipe data: ", error);
        });
    }
  }, []);


  /* Nutrient Chart */
  useEffect(() => {
    if (totalNutrients.length === 0) return;

    const ctx = doughnutChartRef.current.getContext("2d");

    const data = {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          data: [carbs, protein, fat],
          backgroundColor: ["#F94642", "#3177BB", "#FDA120"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label || "";

              if (label) {
                label += ": ";
              }
              if (context.parsed !== null) {
                label += context.parsed + "g";
              }
              return label;
            },
          },
        },
      },
    };

    new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: options,
    });
  }, [carbs, protein, fat, totalNutrients]);

  /* useEffect for the health labels */
  useEffect(() => {

    // Checks to see if any of the healthLabels relate to the fixedHealthLabels array
    if (hasSameHealthLabels) {
      setHasSameLabels(true);
    }
    
  }, [healthLabels, fixedHealthLabels]);


  return (

    <>
      <Header isLoggedIn={isLoggedIn} changeLogin={changeLogin} />
      <div className="recipePage">

        {/* The Recipe Page's Top Section */}
        <div className="topSection">
          <div>
            <h1>{recipe.label} </h1>
            <p>
              {recipe.totalTime > 0 && (
                <>
                  <FaRegClock /> {recipe.totalTime} min
                </>
              )}
            </p>
          </div>
          <div className="image-container">
            <img src={recipe.image} alt={recipe.label}></img>
          </div>
        </div>

        {/* If there is a recipe then execute the following */}
        {recipe ? (
          <div>

            {/* Card's Title */}
            <div className="titleCard">
              <div className="ingredients">
                <div className="medium-heading">Ingredients</div>
                <ol>
                  {ingredients.map((ingredient, index) => {
                    return <li key={index}>{ingredient}</li>;
                  })}
                </ol>
              </div>

              {/* Some Recipe Information */}
              <div className="quickInfo">
                <div className="small-heading">Nutrition Data</div>

                <div className="yield">Per {recipe.yield} Serving Size</div>

                <div className="recipe-information">
                  <div className="breakdown">

                    <ul>
                      <li className="carbs">Carbs</li>
                      <div>{carbs} grams</div>
                    </ul>

                    <ul>
                      <li className="protein">Protein</li>
                      <div>{protein} grams</div>
                    </ul>

                    <ul>
                      <li className="fats">Fat</li>
                      <div>{fat} grams</div>
                    </ul>

                    <ul>
                      <FaFire />
                      {calories.toFixed(2)} Calories
                    </ul>

                  </div>

                  {/* Dougnut Chart */}
                  <div className="chart">
                    <canvas ref={doughnutChartRef}></canvas>
                  </div>
                </div>
              </div>
            </div>

            {/* The Health Labels */}
            <div className="health-labels">
              <div className="medium-heading label-heading">
                <h2>Diets</h2>
              </div>
              {hasSameLabels && (
                <div className="label-container">
                  {hasSameHealthLabels.map((label, index) => {
                    const lowercaseLabel = label.toLowerCase();

                    return (
                      <Link key={index} to={`/diet/${lowercaseLabel}`} className="label-card">
                        <h3 className="dietLabel">
                          {label}
                        </h3>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="recipe-link">
              <a href={recipe.url}>
                {" "}
                Grab the recipe here! <CiGlobe />
              </a>
            </div>
          </div>

        ) : (
          <h1>Loading ... </h1>
        )}
      </div>
      <Footer />
    </>

  );

}
