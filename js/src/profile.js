import { getQuery } from "../utils/getQuery.js";
import { getToken } from "../storage/local.js";
import {profileGet} from "../api/profileFetch.js"
import { profileInfoContent } from "../components/renderProfile.js";
import { ApiError } from "../api/api.js";

async function loadProfile() {
    const username = getQuery("author");
    console.log("👉 username param:", username);
    const token = getToken();

    try {

        const profile = await profileGet(username, token); 
        profile.data.forEach(profile => {
            profileInfoContent(profile);
        });

        console.log("rendering profile:", profile);

    } catch (error) {
        throw new ApiError;
        
    }
}

loadProfile();