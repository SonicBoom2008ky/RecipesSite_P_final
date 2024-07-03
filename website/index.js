import Cookies from "./_cookies";
import { send } from "./_utils";

/**
 * @typedef Preview
 * @property {number} id
 * @property {string} title
 * @property {string} imageSource
 * @property {string} difficulty
 * @property {string} time
 * */

/**@type {HTMLDivElement} */
let divContainer = document.getElementById("divContainer");

/**@type {Preview[]} */
let previews = await send("/getPreviews");

/**
 * @param {Preview} preview
 * @returns {HTMLAnchorElement} 
 */
function PreviewA(preview) {
  let a = document.createElement("a");
  a.classList.add("preview");
  a.href = "recipe.html?recipe=" + preview.Id;

  let img = document.createElement("img")
  img.classList.add("recipeImge");
  img.src = preview.ImageSource;
  a.appendChild(img);

  let nameRec = document.createElement("div");
  nameRec.innerText = preview.Title;
  a.appendChild(nameRec);

  let underName = document.createElement("div");
  underName.innerText = preview.Difficulty + " , " + preview.Time;
  underName.classList.add("underName")
  a.appendChild(underName);

  return a;
}

async function postPreviews() {
  for (let i = 0; i < previews.length; i++) {
    let previewA = PreviewA(previews[i]);
    let divA = document.createElement("div")
    divA.appendChild(previewA);
   divContainer.appendChild(divA); 
  }
}

postPreviews();