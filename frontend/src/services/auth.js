class AuthService {
  // Since we're using httpOnly cookies, we can't access the token directly
  // We'll track auth state using localStorage flag
  
  setAuthStatus(isAuthenticated) {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }

  getAuthStatus() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  setToken(token) {
  localStorage.setItem('token', token);
  this.setAuthStatus(true);
}

getToken() {
  return localStorage.getItem('token');
}

removeToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('isAuthenticated');
}

  isAuthenticated() {
    return this.getAuthStatus();
  }

  logout() {
    console.log('Logging out user');
    this.removeToken();
    window.location.href = '/login';
  }
}

export default new AuthService();