import axios from 'axios'; 
import {API_URL} from '../../Config.js';

export const USERNAME_SESSION_ATTRIBUTENAME = 'authUser';
class AuthenticationService {

    createBasicAuthHeader(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    createJWTToken(token) {
        return 'Bearer ' + token;
    }

    verifyAuthentication(username, password) {
        let basicAuthHeader = this.createBasicAuthHeader(username, password);
        return axios.get(`${API_URL}/basicauth`, 
        {
            headers: {authorization: basicAuthHeader}
        }
        );
    }

    verifyJWTAuthentication(username, password) {
        return axios.post(`${API_URL}/authenticate`, 
        {
            username,
            password
        }
        );
    }

    registerSuccessfulLogin(username, password) {
        console.log("success");
        let basicAuthHeader = this.createBasicAuthHeader(username, password);
        sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTENAME, username);
        this.setupAxiosInterceptors(basicAuthHeader);
    }

    registerSuccessfulJWTLogin(username, token) {
        sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTENAME, username);
        this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    logout() {
        sessionStorage.removeItem(USERNAME_SESSION_ATTRIBUTENAME);
    }

    userLoggedIn() {
        let user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTENAME);
        if (user === null) return false;
        return true;
    }

    getUsername() {
        let user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTENAME);
        if (user === null) return '';
        return user;
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if(this.userLoggedIn()) {
                    config.headers.authorization = token;
                }
                return config;
            } 
        );
    }
}

export default new AuthenticationService();