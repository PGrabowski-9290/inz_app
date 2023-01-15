class FilterBuilder {
  #filterObj;

  constructor(isSold = false, isActive = true) {
    this.#filterObj = { isSold: isSold, isActive: isActive}
  }

  addField(filterKey, value) {
    this.#filterObj = {...this.#filterObj, [filterKey]: value}
  }

  get(){
    return this.#filterObj
  }
}

module.exports = FilterBuilder