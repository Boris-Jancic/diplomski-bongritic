import jwtDecode from "jwt-decode";
import { Bearer } from "../../interface/tokenBearer";

export const TokenService = {
    getToken,
    getUserFromToken,
    setToken,
    removeToken,
    decodeToken,
    didTokenExpire,
};

function getToken() : string | null{
    return localStorage.getItem("user");
}

function getUserFromToken() : Bearer {
    return JSON.parse(localStorage.getItem("user") || '{}');
}

function setToken(value: string) {
    localStorage.setItem("user", value);
}

function removeToken() {
    localStorage.removeItem("user");
}

function decodeToken(token: string) {
    try {
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
}

function didTokenExpire() {
    const token = getToken();
    const decodedToken = token ? decodeToken(token) : null;
    //@ts-ignore
    return decodedToken ? decodedToken.exp_date < Date.now() : null;
}