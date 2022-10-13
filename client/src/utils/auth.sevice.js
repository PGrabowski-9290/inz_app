const authService = {
    set(val) {
    localStorage.setItem("isAuthenticated", val)
  },
  remove() {
    localStorage.removeItem("isAuthenticated")
  },
  check() {
    const isAuth = localStorage.getItem("isAuthenticated")
    return JSON.parse(isAuth)
  }
}

export default authService