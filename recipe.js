import { elements, getFromLocal, setLocalStorage } from "./helpers.js";
export class Recipe {
  constructor() {
    this.likes = getFromLocal("likes") || [];
    this.info = {};
    this.ingredients = [];
    this.renderLikes();
  }
  async getRecipe(id) {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    const data = await res.json();
    this.info = data.recipe;
    this.ingredients = data.recipe.ingredients;
  }
  createIngredient() {
    const html = this.ingredients
      .map(
        (ingredient) =>
          `<li>
            <i class="bi bi-check-circle"></i>
            <p>${ingredient}</p>
        </li>`
      )
      .join("");
    return html;
  }
  renderRecipe(recipe) {
    const markup = `
      <figure>
            <img src="${recipe.image_url}" alt="" />
            <h1>${recipe.title}</h1>
            <p class="like-area">
              <i class="bi ${
                this.isRecipeLike() ? "bi-heart-fill" : "bi-heart"
              }" id="like-btn"></i>
            </p>
      </figure>
      <div class="ingredients">
        <ul>
         ${this.createIngredient()}
        </ul>
        <button id="add-to-basket">
          <i class="bi bi-cart-fill"></i>
          <span>Add to Basket</span>
        </button>
      </div>
    <div class="directions">
      <h2>How to Cook</h2>
      <p>
        This recipe was carefully prepared by <span>${recipe.publisher}</span> prepared and tested. More details on their website
        You can access via.
      </p>
      <a href="${recipe.publisher_url}" target="_blank">Instruction</a>
    </div>
    `;
    elements.recipeArea.innerHTML = markup;
  }
  isRecipeLike() {
    const found = this.likes.find((i) => i.id === this.info.recipe_id);

    return found;
  }
  controlLike() {
    const newObject = {
      id: this.info.recipe_id,
      img: this.info.image_url,
      title: this.info.title,
    };
    if (this.isRecipeLike()) {
      this.likes = this.likes.filter((i) => i.id !== newObject.id);
    } else {
      this.likes.push(newObject);
    }
    setLocalStorage("likes", this.likes);
    this.renderRecipe(this.info);
    this.renderLikes();
  }
  renderLikes() {
    const html = this.likes
      .map(
        (item) => ` 
      <a href="#${item.id}">
        <img src="${item.img}" alt="" />
        <p>${item.title}</p>
      </a>`
      )
      .join("");
    elements.likeList.innerHTML = html;
  }
}