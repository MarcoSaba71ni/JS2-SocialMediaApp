import { API_BASE } from "../utils/constants.js";
import { API_KEY } from "../utils/constants.js";

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

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// deletePost
// updatePost

/* TO DO 
    - check API endpoint for GET, POST, DELETE and UPDATE;
    - add apiPut;
    - add apiDelete
    ;
*/
