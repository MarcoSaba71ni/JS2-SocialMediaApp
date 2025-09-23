import { ApiError, apiPost } from "../api/api.js";
import { getToken } from "../storage/local.js";
import { getAllPosts } from "../api/posts.js";
import { postContent } from "./renderPosts.js";
import { API_BASE } from "../utils/constants.js";

const title = document.getElementById('title');
const body = document.getElementById('body');
const mediaUrl = document.getElementById('media-url');
const mediaaAlt = document.getElementById('media-alt');

const profileEndpoint = '/social/posts';
const creatingForm = document.getElementById('creating-form');


creatingForm.addEventListener("submit", async (event) => {

    event.preventDefault();
        
    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('body').value.trim();
    const mediaUrl = document.getElementById('media-url').value.trim();
    const mediaaAlt = document.getElementById('media-alt').value.trim();

    const info = {
        title,
        body,
        media: {
            url: mediaUrl,
            alt: mediaaAlt 
        }
    }
    
    const token = getToken();

    try {
        const createdPost = await apiPost(profileEndpoint, info, token);

        const fullPost = await getAllPosts(token);

        const newPostData = fullPost.data.find(p => p.id === createdPost.data.id);

        const feedPosts = document.getElementById('feed-posts');
        const newPost = postContent(newPostData);

        feedPosts.prepend(newPost);
        creatingForm.reset();
    } catch (error){
        throw new ApiError;
    }


});