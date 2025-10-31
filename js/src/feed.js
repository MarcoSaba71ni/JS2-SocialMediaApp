import { checkAuth } from "../utils/checkAuth.js";
import { getAllPosts } from "../api/posts.js";
import { getToken } from "../storage/local.js";
import {postContent} from "../components/renderPosts.js";
import { searchSetup } from "../components/searchBar.js";


// checkAuth();

function renderPost(postsArray) {
    const feedPosts = document.getElementById('feed-posts');
    feedPosts.innerHTML = "";

      if (postsArray.length === 0) {
    feedPosts.innerHTML = "<p>No posts found.</p>";
    return;
  }

    postsArray.forEach(post => {
        const postElement = postContent(post);
        feedPosts.appendChild(postElement);
    })
}

async function loadFeed() {

    try {
        const token = getToken();
        const posts = await getAllPosts(token);
        const allPosts = posts.data;

        renderPost(allPosts);
        searchSetup(allPosts, renderPost);


    } catch (error) {
        feedPost.innerHTML = "<p>Could not load posts.</p>";
    }
}



loadFeed(); 