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
let favContainer = document.getElementById("favContainer");

/**@type {Preview[]} */
let previews = await send("/getPreviews");

/**@type {string | undefined} */
let userId = Cookies.get("id");

/**
 * @param {Preview} preview
 * @returns {HTMLAnchorElement} 
 */

function PreviewA(preview) {
    let a = document.createElement("a");
    a.classList.add("preview");
    a.href = "recipe.html?recipe=" + preview.Id;

    let img = document.createElement("img")
    img.classList.add("recipeImage");
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

async function previewFav() {
    for (let i = 0; i < previews.length; i++) {

        /**@type {boolean} */
        let isFavorite = await send("/getIsFavorite", {
            userId: userId,
            recipeId: previews[i].Id
        });

        console.log(isFavorite);

        if (isFavorite) {
            let previewA = PreviewA(previews[i]);
            favContainer.appendChild(previewA);
        }
    }
}

previewFav();