class AuthenticationService {
    registerSuccessfulLogin(username, password) {
        console.log("success")
        sessionStorage.setItem('authUser', username);
    }
    logout() {
        sessionStorage.removeItem('authUser');
    }

    userLoggedIn() {
        let user = sessionStorage.getItem('authUser');
        if (user === null) return false;
        return true;
    }
}

export default new AuthenticationService();