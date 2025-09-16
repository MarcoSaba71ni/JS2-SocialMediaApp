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
    if (!response.ok) {
        let message = `Request failed with status ${response.status}`;
        try {
            const errorData = await response.json();
            // API might send detailed error info
            message += ` - ${errorData.errors?.[0]?.message || "No additional info"}`;
        } catch {
            // fallback if response is not JSON
        }
        throw new Error(message);
    }

    const data = await response.json();
    return data;
};

export async function apiPost(endpoint, data, token = null) {
    const headers = {
        "Content-Type": "application/json",
    } 
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || "API POST request failed");
    } return await response.json();
}

// deletePost
// updatePost

/* TO DO 
    - check API endpoint for GET, POST, DELETE and UPDATE;
    - add apiPut;
    - add apiDelete
    ;
*/
