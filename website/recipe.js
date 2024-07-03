import Cookies from "./_cookies";
import { getQuery, send } from "./_utils";

/**
 * @typedef Recipe
 * @property {string} title
 * @property {string} imageSource
 * @property {string} difficulty
 * @property {string} time
 * @property {string []} ingredients
 * @property {string} description
 * @property {boolean} isFavorite
 */

/**@type {HTMLHeadingElement} */
let titleh1 = document.getElementById("titleh1");

/**@type {HTMLImageElement} */
let imgRecipe = document.getElementById("imgRecipe");

/**@type {HTMLSpanElement} */
let time = document.getElementById("time");

/**@type {HTMLSpanElement} */
let difficulty = document.getElementById("difficulty");

console.log(difficulty.innerText)

/**@type {HTMLDivElement} */
let divIngredients = document.getElementById("divIngredients");

/**@type {HTMLDivElement} */
let method = document.getElementById("method");

/**@type {HTMLButtonElement} */
let favoriteButton = document.getElementById("favoriteButton");

/**@type {HTMLButtonElement} */
let unfavoriteButton = document.getElementById("unfavoriteButton");

let userId = Cookies.get("id");

/**@type {{recipeId: string}} */
let query = getQuery();

let recipeId = Number(query.recipe);

let Recipe = await send("/getRecipe", recipeId);


favoriteButton.onclick = async function () {
  await send("/addToFavorites", {
    userId: userId,
    recipeId: recipeId
  });

  favoriteButton.disabled = true;
  unfavoriteButton.disabled = false;

}

unfavoriteButton.onclick = async function () {
  await send("/removeFromFavorites", {
    userId: userId,
    recipeId: recipeId
  });

  favoriteButton.disabled = false;
  unfavoriteButton.disabled = true;
}

async function appendDetails() {
  titleh1.innerText = Recipe.recipe.Title;
  imgRecipe.src = Recipe.recipe.ImageSource;
  time.innerText = Recipe.recipe.Time;
  difficulty.innerText = Recipe.recipe.Difficulty;
  method.innerText = Recipe.recipe.Method;

  if (difficulty.innerText == "easy") {
    difficulty.innerText = "קל";
  }
  else if (difficulty.innerText == "medium") {
    difficulty.innerText = "בינוני";
  }
  else if (difficulty.innerText == "hard") {
    difficulty.innerText = "קשה";
  }
  else {
    difficulty.innerText = "מומחה";
  }

  for (let i = 0; i < Recipe.ingrediantsStr.length; i++) {
    let ingredient = document.createElement("div");
    ingredient.innerText = Recipe.ingrediantsStr[i];
    divIngredients.appendChild(ingredient);
    let br = document.createElement("br");
    divIngredients.appendChild(br);
  }
  if (userId == undefined) {
    favoriteButton.style.display = "none";
    unfavoriteButton.style.display = "none";
    return;
  }

  /**@type {boolean} */
  let isFavorite = await send("/getIsFavorite", {
    userId: userId,
    recipeId: recipeId,
  });

  favoriteButton.disabled = isFavorite;
  unfavoriteButton.disabled = !isFavorite;
}

appendDetails();