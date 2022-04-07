import axios from "axios";
import {TokenService} from "./tokenService";
import {AuthenticationService} from "../auth/authService";

const AxiosClient = axios.create();

// If the user is logged in attach the token for every api call
AxiosClient.interceptors.request.use(function success(config) {
    const token = TokenService.getToken();
    if (token) {
        if (TokenService.didTokenExpire()) {
            alert("Token je istekao");
            AuthenticationService.logout();
            return false;
        }
        //@ts-ignore
        config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
});

// U slučaju da se sa Article backenda vrati forbidden, token je istekao te izloguj korisnika
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