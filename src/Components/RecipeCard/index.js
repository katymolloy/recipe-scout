export default function RecipeCard({ recipe, index }) {
    return (
        <div key={index}>
            <img src={recipe.image} alt={recipe.label}></img>
            <h2>{recipe.label}</h2>
            <div className="recipeInfo">
                {recipe.mealType}
                {recipe.calories.toFixed(0)} Calories
            </div>
        </div>
    )
}