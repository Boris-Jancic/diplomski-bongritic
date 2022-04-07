import AxiosClient from "../client/axiosClient";
import {TokenService} from "../client/tokenService";

export const AuthenticationService = {
    login,
    logout,
    getRole,
    registerClient,
};

async function login(userCredentials: any, toast: any) {
    console.log(userCredentials)
    try {
        await AxiosClient.post("http://localhost:5000/auth/client/login", userCredentials)
            .then(function (response) {
                const decoded_token = TokenService.decodeToken(response.data);
                if (decoded_token) {
                    TokenService.setToken(response.data);
                    window.location.assign("/");
                    console.log(decoded_token)
                } else {
                    console.error("Invalid token");
                }
            })
            .catch(function (error) {
            switch (error.response.status) {
                case 400:
                    toast({
                        title: `Bad request`,
                        position: 'top-right',
                        isClosable: true,
                    })
                    break;
                case 403:
                    toast({
                        title: `You do not have the permission to use bongritic`,
                        position: 'top-right',
                        isClosable: true,
                    })
                    break;
                case 404:
                    toast({
                        title: `Wrong username or password`,
                        position: 'top-right',
                        isClosable: true,
                    })
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
    TokenService.removeToken();
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

async function registerClient(client: any, toast: any) {
    console.log(client)
    try {
        await AxiosClient.post("http://localhost:5000/clients", client)
            .then(function (response) {
                toast(response.data.message, 'success')
            })
            .catch(function (error) {
                toast(error.response.data.message, 'error')
            }
        )
    } catch (error) {
        console.error(error);
    }
}