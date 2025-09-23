import {deleteApi} from '../api/api.js';

export async function deletePost (postId, token) {
    try {
        await deleteApi(`/social/posts/${postId}`, token);
        window.location.href = '../../pages/feed.html';
        alert('Post delete succesfully');
    } catch (error) {
        console.error("Failed to delete post:", error);
        alert("Could not delete post. Try again.");
    }
}