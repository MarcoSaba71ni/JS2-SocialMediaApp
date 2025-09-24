import { apiGet } from "./api.js";


export async function profileGet(name, token) {
     return await apiGet(`/social/profiles/${name}`, token);
}