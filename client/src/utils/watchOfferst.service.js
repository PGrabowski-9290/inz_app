export const watchOfferts = {
  add(id) {
    const current = JSON.parse(localStorage.getItem('watchlist')) || []
    current.push(id)
    console.log(current)
    localStorage.setItem('watchlist', JSON.stringify(current))
  },
  remove(id) {
    const current = JSON.parse(localStorage.getItem('watchlist')) || []
    const result = current.filter(item => item !== id)
    localStorage.setItem('watchlist', JSON.stringify(result));
  },
  getList() {
    return JSON.parse(localStorage.getItem('watchlist')) || []
  },
  isWatched(id) {
    const current = JSON.parse(localStorage.getItem('watchlist')) || [];
    return current.includes(id)
  }
}