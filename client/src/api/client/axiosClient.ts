import axios from "axios";
import {TokenService} from "./tokenService";
import {AuthenticationService} from "../auth/authService";

const AxiosClient = axios.create();

// If the user is logged in attach the token for every api call
AxiosClient.interceptors.request.use(function success(config) {
    const user = TokenService.getUserFromToken()
    if (user) {
        if (TokenService.didTokenExpire()) {
            alert("Token expired, log in again");
            AuthenticationService.logout();
            return false;
        }
        //@ts-ignore
        config.headers["Authorization"] = user.role;

    }
    return config;
});

// In case of forbidden response log the user out
AxiosClient.interceptors.response.use(
    function success(response) {
        return response;
    },
    function failure(error) {
        const token = TokenService.getToken();
        if (token) {
            if (error.response && error.response.status === 403) {
                AuthenticationService.logout();
            }
        }
        throw error;
    }
);

export default AxiosClient;