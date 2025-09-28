import { apiPost } from "../api/api.js";
import { getToken } from "../storage/local.js";

export async function commentPost(postId, body, replyToId = null) {
    const token = getToken();
    const payload = { body };
    if (replyToId) payload.replyToId = replyToId;

    return await apiPost(`/social/posts/${postId}/comment`, payload, token);
}


export function commentValue(postId) {
    const commentBtn = document.getElementById("btn-submit-comment");
    const commentInput = document.getElementById("comment-input");

    if (!commentBtn || !commentInput) return;

    commentBtn.addEventListener("click", async () => {
        const text = commentInput.value.trim();
        if (!text) return;

        try {
            await commentPost(postId, text);
            commentInput.value = "";
        } catch (error) {
            console.error(" Failed to post comment:", error);
        }
    });
}
