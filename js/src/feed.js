import { checkAuth } from "../utils/checkAuth.js";
import { getAllPosts } from "../api/posts.js";
import { getToken } from "../storage/local.js";
import {postContent} from "../components/renderPosts.js";

// checkAuth();



async function loadFeed() {
    const feedPost = document.getElementById('feed-posts');

    try {
        const token = getToken();
        console.log("Token from storage:", token);
        const posts = await getAllPosts(token);
        console.log(posts);

        feedPost.innerHTML = " ";

        posts.data.forEach(post => {
            const postElement = postContent(post);
            feedPost.appendChild(postElement);
        });
    } catch (error) {
        console.error("Failed to load feed:", error);
        feedPost.innerHTML = "<p>Could not load posts.</p>";
    }
}

loadFeed();