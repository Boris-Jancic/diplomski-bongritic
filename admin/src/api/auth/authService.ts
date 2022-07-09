
import { setRecoil } from "recoil-nexus";
import { authAtom } from "../../state/auth";
import AxiosClient from "../client/axiosClient";
import {TokenService} from "../client/tokenService";

export const AuthenticationService = {
    login,
    logout,
    getRole,
};

const BASE_URL = process.env.REACT_APP_API_KEY

async function login(userCredentials: any, toast: any) {
    try {
        await AxiosClient.post(`${BASE_URL}/auth/reviewer/login`, userCredentials)
            .then(function (response) {
                let decoded_token = TokenService.decodeToken(response.data);
                if (decoded_token) {
                    localStorage.setItem('user', JSON.stringify(decoded_token));
                    setRecoil(authAtom, decoded_token)
                    window.location.assign("/");
                } else {
                    console.error("Invalid token");
                }
            })
            .catch(function (error) {
            switch (error.response.status) {
                case 400:
                    toast('Wrong credentials', 'warning')
                    break;
                case 403:
                    toast('You are not authorized to use bongritic', 'error')
                    break;
                case 404:
                    toast('Wrong credentials', 'warning')
                    break;
                default:
                    break;
            }
        })
    } catch (error) {
        console.error(error);
    }
}

function logout() {
    setRecoil(authAtom, null);
    localStorage.removeItem('user');
    window.location.assign("/login");
}

function getRole() {
    const token = TokenService.getToken();
    const decoded_token = token ? TokenService.decodeToken(token) : null;
    if (decoded_token) {
        // @ts-ignore
        return decoded_token.role.authority;
    } else {
        return null;
    }
}