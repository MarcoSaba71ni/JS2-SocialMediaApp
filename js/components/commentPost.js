import { apiPost } from "../api/api";

export async function commentPost(token) {
    // get the id of the button
    // create eventListener when button is clicked
    // event listener will onclick fetch post the endpoint and send the value of the form.
    // so we also need to get the value of what is written in the input.
    return await apiPost('/social/posts/<id>/comment', token);
}

export function commentValue() {
    const commentBtn = document.getElementById('btn-submit-comment');
    const commentForm = document.getElementById('comment-form');

    commentBtn.addEventListener("submit", async ()=> {
        await commentPost(commentForm);
    })
}