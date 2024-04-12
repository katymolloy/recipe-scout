import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { viewRecipe } from "../../Utilities/api";
import { FaFire } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

import "./RecipePage.scss";

export default function RecipePage({ isLoggedIn, changeLogin }) {
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
  const [unitCarb, setUnitCarb] = useState("");
  const [unitProtein, setUnitProtein] = useState("");
  const [unitFat, setUnitFat] = useState("");

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

  /* Appropriate Icons */
  const labelIcons = [];

  const doughnutChartRef = useRef(null);

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
          setUnitCarb(first.recipe.totalNutrients.CHOCDE.unit);
          setUnitProtein(first.recipe.totalNutrients.PROCNT.unit);
          setUnitFat(first.recipe.totalNutrients.FAT.unit);
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
    //const hasSameHealthLabels = fixedHealthLabels.some(label => healthLabels.includes(label));

    if (hasSameHealthLabels) {
      setHasSameLabels(true);
    }
  }, [healthLabels, fixedHealthLabels]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} changeLogin={changeLogin} />
      <div className="recipePage">
        <div className="topSection">
          <h1>{recipe.label} </h1>
          <h1>
            {recipe.totalTime > 0 && (
              <>
                <FaRegClock /> {recipe.totalTime} min
              </>
            )}
          </h1>
        </div>

        {recipe ? (
          <div className="titleCard">
            <div className="medium-heading">Ingredients</div>
            <ol>
              {ingredients.map((ingredient, index) => {
                return <li key={index}>{ingredient}</li>;
              })}
            </ol>
            <div className="image-container">
              <img src={recipe.image} alt={recipe.label}></img>
            </div>
            <div className="top-section">
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
                  </div>
                  <div className="chart">
                    <canvas ref={doughnutChartRef}></canvas>
                  </div>
                  <div className="calory-section">
                    <FaFire />
                    {cals / recipe.yield} cals
                  </div>
                </div>

                {/* <div>
                                    {dietLabels.map((label, index) => {
                                        return <p key={index}>{label}</p>
                                    })}
                                </div> */}
              </div>
            </div>

            <div className="health-labels">
              {/* Replace all the stuff below with the database logic */}
              <div className="medium-heading label-heading">Diets</div>

              {hasSameLabels && (
                <div className="label-container">
                  {hasSameHealthLabels.map((label, index) => {
                    const lowercaseLabel = label.toLowerCase();

                    return (
                      <div className="label-card">
                        <MdOutlineHealthAndSafety />

                        <Link to={`/diet/${lowercaseLabel}`}>
                          <h2 key={index} className="dietLabel">
                            {label}
                          </h2>
                        </Link>
                      </div>
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
