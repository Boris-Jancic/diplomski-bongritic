import jwtDecode from "jwt-decode";

export const TokenService = {
    getToken,
    getUserFromToken,
    setToken,
    removeToken,
    decodeToken,
    didTokenExpire,
};

function getToken() : string | null{
    return localStorage.getItem("token");
}

function getUserFromToken() : string | null{
    return jwtDecode(JSON.parse(localStorage.getItem("token") || '{}'));
}

function setToken(value: string) {
    localStorage.setItem("token", value);
}

function removeToken() {
    localStorage.removeItem("token");
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