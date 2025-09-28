import { API_BASE } from "../utils/constants.js";
import { API_KEY } from "../utils/constants.js";
/** 
* @param {string} endpoint - URL path
* @param {string} token - value of the token 
* @returns {Array} The fetched GET data from the URL 
* @throws {ApiError} if the response status is not okay
*
* @example 
* // Fetch post with autentication
* const posts = await apiGet('/posts', 'access-token');
*/
export async function apiGet(endpoint, token = null) {
    const headers = {
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn("No token provided for API request to:", endpoint);
    }
    const response = await fetch(`${API_BASE}${endpoint}`, { headers });
    const data = await response.json();

    if(!response.ok) {
        const errorMessage = data?.errors?.[0]?.errorMessage ||  `Request failed with status ${response.status}`;
        throw new ApiError(errorMessage, response.status)
        
    }

    return data;
};

export async function apiPost(endpoint, data, token = null) {
    const headers = {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
    } 
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorMessage = data?.errors?.[0]?.message || `Request failed with status ${response.status}`;
        throw new ApiError(errorMessage, response.status);
    } return await response.json();
}

export async function apiUpdate(endpoint, data, token = null) {
    const headers = {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
    }
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE}${endpoint}`, {
        method : "PUT",
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorMessage = data?.errors?.[0]?.message || `Request failed with status ${response.status}`;
        throw new ApiError(errorMessage, response.status);
    } return await response.json();
    
}

export async function deleteApi(endpoint, token = null) {
    const headers = {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
    }
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'DELETE',
        headers,
    })

      if (!response.ok) {

        throw new ApiError( response.status);
    }

    return true; // success
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// deletePost


/* TO DO 
    - check API endpoint for GET, POST, DELETE and UPDATE;
    - add apiPut;
    - add apiDelete
    ;
*/
