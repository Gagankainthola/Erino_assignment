class AuthService {
  // Since we're using httpOnly cookies, we can't access the token directly
  // We'll track auth state using localStorage flag
  
  setAuthStatus(isAuthenticated) {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }

  getAuthStatus() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  // For backward compatibility (not used with httpOnly cookies)
  getToken() {
    return null; // Not accessible with httpOnly cookies
  }

  setToken(token) {
    // For httpOnly cookies, we just mark as authenticated
    // The browser automatically handles the cookie
    this.setAuthStatus(true);
  }

  removeToken() {
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