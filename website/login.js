import Cookies from "https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.mjs";
import { send } from "./_utils";

/**@type {HTMLInputElement} */
let usernameInput = document.getElementById("usernameInput");

/**@type {HTMLInputElement} */
let passwordInput = document.getElementById("passwordInput");

/**@type {HTMLButtonElement} */
let submitButton = document.getElementById("submitButton");

/**@type {HTMLDivElement} */
let messageDiv = document.getElementById("messageDiv");

submitButton.onclick = async function () {
  if (usernameInput.value.trim() === "" || passwordInput.value.trim() === "") {
    alert("There are missing items! Please check all the fields.");
  }
  else {
    /**@type {string} */
    let id = await send("/logIn", {
      username: usernameInput.value,
      password: passwordInput.value,
    });

    if (id == null) {
      usernameInput.value = "";
      passwordInput.value = "";
      alert("Username or Password were incorrent");
    }
    else {
      Cookies.set("id", id);
      top.location.href = "index.html";
    }
  }
}