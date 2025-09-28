import { apiGet } from "../api/api.js";
import { singlePost } from "../components/renderPosts.js";
import { getToken } from "../storage/local.js";



async function loadSinglePost() {
    const postsContent = document.getElementById('posts-content');

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    try {
        const token = getToken();
        const post = await apiGet(`/social/posts/${id}?_author=true`, token);
        const renderPost = singlePost(post.data);

        postsContent.appendChild(renderPost);
    } catch (error) {
        throw new Error('The error is:', error);
    }

};

loadSinglePost();