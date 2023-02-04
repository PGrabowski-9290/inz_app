const authService = {
  setIsAuth(val) {
    localStorage.setItem("isAuthenticated", val)
  },
  checkIsAuth() {
    const isAuth = localStorage.getItem("isAuthenticated")
    return JSON.parse(isAuth)
  }
}

export default authService