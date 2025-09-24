import { getQuery } from "../utils/getQuery.js";
import { getToken } from "../storage/local.js";
import {profileGet, profilePostGet} from "../api/profileFetch.js"
import { profileInfoContent , profilePostContent } from "../components/renderProfile.js";
import { ApiError } from "../api/api.js";

async function loadProfileInfo() {
    const username = getQuery("author");
    console.log("👉 username param:", username);
    const token = getToken();

    try {

        const profile = await profileGet(username, token); 
        const profileData = profile.data;
        profileInfoContent(profileData);

        console.log("rendering profile:", profile);

    } catch (error) {
        console.log(error);   
    }
}

loadProfileInfo();

async function loadProfilePost () {
    const token = getToken();
    const username = getQuery("author");

    try {
        const posts = await profilePostGet(username, token);
        const postsData = posts.data;
        postsData.forEach(post=> {
            profilePostContent(post);
        })
    } catch (error) {
        console.log(error);
    }

}

loadProfilePost();