import {backendURL} from "./config";
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    console.log(backendURL+route);
    const response = await fetch(backendURL+route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
    console.log(backendURL+route);
    const token = getToken();
    const response = await fetch(backendURL + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};

export const makeAuthenticatedGETRequest = async (route) => {
    const token = getToken()
    const response = await fetch(backendURL+route, 
        {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const formattedResponse = await response.json();
    return formattedResponse;

};

const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};