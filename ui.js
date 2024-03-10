import { elements } from "./helpers.js";
export const renderResult = (recipes) => {
  elements.resultsList.innerHTML = "";
  recipes.slice(0, 10).forEach((recipe) => {
    const markup = `
    <a href="#${recipe.recipe_id}" class="result-link">
        <img src="${recipe.image_url}" alt="" />
        <div class="data">
        <h4>${recipe.title}</h4>
        <p>${recipe.publisher}</p>
        </div>
    </a>
    `;
    elements.resultsList.insertAdjacentHTML("beforeend", markup);
  });
};

export const renderLoader = (parent) => {
  const loader = `
        <div class="loader">
            <img src="https://github.com/Udemig/9-Cuma-Projeleri/blob/main/recipeApp/images/foodGif.gif?raw=true" alt="" />
        </div>
  `;
  parent.insertAdjacentHTML("afterbegin", loader);
};
export const renderBasketItems = (items) => {
  const markup = items
    .map(
      (item) => `  
    <li data-id=${item.id}>
      <i class="bi bi-x" id="delete-item"></i>
      <span>${item.title}</span>
    </li>`
    )
    .join("");
  elements.basketList.innerHTML = markup;
};






