class FilterBuilder {
  #filterObj;

  constructor() {
    this.#filterObj = {}
  }

  addField(filterKey, value) {
    this.#filterObj = {...this.#filterObj, [filterKey]: value}
  }

  get(){
    return this.#filterObj
  }
}

module.exports = FilterBuilder