import { send } from "./_utils";

/**@type {HTMLInputElement} */
let titleInput = document.getElementById("RecipeNameInput");

/**@type {HTMLInputElement} */
let imageSource = document.getElementById("ImageSorce");

/**@type {HTMLTableElement} */
let ListIng = document.getElementById("ListIng");

/**@type {HTMLInputElement} */
let NewIngredientName = document.getElementById("IngridientName");

/**@type {HTMLOptionElement} */
let cupSize = document.getElementById("cupSize");

/**@type {HTMLTextAreaElement} */
let methodTextarea = document.getElementById("methodTextarea");

/**@type {HTMLSelectElement} */
let difficulty = document.getElementById("difficultySelection");

/**@type {HTMLInputElement} */
let timeInput = document.getElementById("timeInput");

/**@type {HTMLButtonElement} */
let NewRecipeButton = document.getElementById("NewRecipeButton");

/**@type {HTMLButtonElement} */
let addButtonIng = document.getElementById("addButtonIng");

const ingredients = [];

addButtonIng.onclick = function () {
  if (cupSize.value.trim() === "" || NewIngredientName.value.trim() === "") {
    alert("The field of cup size / ingridient's name is empty. Please fill in the field.")
  }
  else {
    let IngredientDiv = document.createElement("div");
    IngredientDiv.innerText = cupSize.value + " " + NewIngredientName.value;
    ListIng.appendChild(IngredientDiv);

    ingredients.push(IngredientDiv.innerText);

    cupSize.value = "";
    NewIngredientName.value = "";
  }
}

NewRecipeButton.onclick = function () {

  let recipe = {
    title: titleInput.value,
    imageSource: imageSource.value,
    difficulty: difficulty.value,
    time: timeInput.value,
    Ingridients: ingredients,
    method: methodTextarea.value,
  };

console.log(recipe);

  send("/addrecipe", recipe);

  top.location.href = "index.html";
}
