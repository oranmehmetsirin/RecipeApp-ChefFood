export class Search {
  constructor(query) {
    this.query = query;
    this.result = [];
  }
  async getResults() {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
    );
    const data = await res.json();
    this.result = data.recipes;
  }
}