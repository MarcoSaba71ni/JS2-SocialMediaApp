import { getToken } from "../storage/local.js";
import { deletePost } from "../utils/deletePost.js";
import { getUser } from "../storage/local.js";
import { followProfile, unfollowProfile } from "./follow-unfollow.js";
import { commentValue } from "./commentPost.js";

/**
 * 
 * @param {object} post - fetched post from imported apiGet function
 * @param {object} post.author - author information containing name and email
 * @param {string} post.title - title of the post
 * @param {object} post.media - media information containing the url and alt
 * @param {string} post.media.url - url of the media image.
 * @param {string} post.media.alt - alternative text for the media image.
 * @param {object} post._count - containing the count of comments and reactions
 * @param {number} post._count.comments - number of comments.
 * @param {number} post._count.reactions - number of reactions.
 * @param {Array<Object>} [post.comments] - comments associated with the post.
 * @returns {HTMLElement} A div element containing the rendered post content and interactive buttons.
 * 
 * @returns {HTMLElement} An array of objects rendering the html element for each looped post.
 *
 */
export function postContent(post) {
    const postWrapper = document.createElement("div");
    postWrapper.className = "card shadow-sm mb-4";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    postWrapper.appendChild(cardBody);

    /* --- Title --- */
    const title = document.createElement("a");
    title.href = `../../pages/post.html?id=${post.id}`;
    title.textContent = post.title;
    title.className = "card-title h5 text-decoration-none text-dark d-block";

    /* --- Author --- */
    const authorLink = document.createElement("a");
    authorLink.href = `./profile.html?author=${post.author.name}`;
    authorLink.className = "text-muted small text-decoration-none";

    const author = document.createElement("span");
    author.textContent = `By ${post.author?.name}`;
    authorLink.appendChild(author);

    /* --- Email --- */
    const email = document.createElement("p");
    email.textContent = post.author?.email;
    email.className = "text-muted small mb-2";

    /* --- Body --- */
    const body = document.createElement("p");
    body.textContent = post.body;
    body.className = "card-text mt-2";

    cardBody.append(title, authorLink, email);

    /* --- Media --- */
    if (post.media?.url) {
        const mediaUrl = document.createElement("img");
        mediaUrl.src = post.media.url;
        mediaUrl.alt = post.media.alt || post.title;
        mediaUrl.className = "img-fluid rounded my-3";
        cardBody.appendChild(mediaUrl);
    }

    cardBody.appendChild(body);

    /* --- Counts --- */
    const countsDiv = document.createElement("div");
    countsDiv.className = "d-flex gap-3 text-muted small mt-3";

    const commentsCount = document.createElement("span");
    commentsCount.textContent = `${post._count?.comments || 0} comments`;

    const reactionsCount = document.createElement("span");
    reactionsCount.textContent = `${post._count?.reactions || 0} reactions`;

    countsDiv.append(commentsCount, reactionsCount);
    cardBody.appendChild(countsDiv);

    const user = getUser();

    /* =========================
       EDIT / DELETE
    ========================= */
    if (user && post.author?.email === user.email) {
        const divEdtDel = document.createElement("div");
        divEdtDel.className = "d-flex gap-2 mt-3";

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-outline-primary btn-sm";
        editBtn.textContent = "Edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-outline-danger btn-sm";
        deleteBtn.textContent = "Delete";

        editBtn.addEventListener("click", () => {
            window.location.href = `../../pages/edit.html?id=${post.id}`;
        });

        deleteBtn.addEventListener("click", () => {
            deletePost(post.id, getToken());
        });

        divEdtDel.append(editBtn, deleteBtn);
        cardBody.appendChild(divEdtDel);
    }

    /* =========================
       FOLLOW BUTTON
    ========================= */
    else if (user) {
        const divFollow = document.createElement("div");
        divFollow.className = "mt-3";

        const followBtn = document.createElement("button");
        followBtn.className = "btn btn-outline-secondary btn-sm";
        followBtn.textContent = "Follow";

        followBtn.addEventListener("click", async () => {
            if (followBtn.textContent === "Follow") {
                await followProfile(post.author.name);
                followBtn.textContent = "Unfollow";
            } else {
                await unfollowProfile(post.author.name);
                followBtn.textContent = "Follow";
            }
        });

        divFollow.appendChild(followBtn);
        cardBody.appendChild(divFollow);
    }

    /* =========================
       COMMENTS SECTION
    ========================= */

    const commentsSection = document.createElement("div");
    commentsSection.className = "mt-4 border-top pt-3";

    if (post.comments && post.comments.length > 0) {
        post.comments.forEach((c) => {
            const commentDiv = document.createElement("div");
            commentDiv.className = "mb-3 p-2 bg-light rounded";

            const authorName = document.createElement("strong");
            authorName.className = "d-block fw-semibold";
            authorName.textContent = c.author?.name || c.owner;

            const commentBody = document.createElement("p");
            commentBody.className = "mb-1";
            commentBody.textContent = c.body;

            const createdDate = document.createElement("span");
            createdDate.className = "text-muted small";
            createdDate.textContent = new Date(c.created).toLocaleString();

            commentDiv.append(authorName, commentBody, createdDate);
            commentsSection.appendChild(commentDiv);
        });
    } else {
        const noComments = document.createElement("p");
        noComments.className = "text-muted small";
        noComments.textContent = "No comments yet.";
        commentsSection.appendChild(noComments);
    }

    /* --- Comment Form --- */
    const commentForm = document.createElement("div");
    commentForm.className = "mt-3";

    const commentInput = document.createElement("textarea");
    commentInput.className = "form-control mb-2";
    commentInput.id = `comment-input-${post.id}`;
    commentInput.placeholder = "Write a comment...";
    commentInput.required = true;

    const submitBtn = document.createElement("button");
    submitBtn.id = `btn-submit-comment-${post.id}`;
    submitBtn.type = "button";
    submitBtn.className = "btn btn-primary btn-sm";
    submitBtn.textContent = "Post Comment";

    commentForm.append(commentInput, submitBtn);

    cardBody.append(commentForm, commentsSection);

    commentValue(post.id, submitBtn.id, commentInput.id);

    return postWrapper;
}

/* =========================
   SINGLE POST PAGE
========================= */

export function singlePost(post) {
    const wrapper = document.createElement("div");
    wrapper.className = "container my-4";

    const card = document.createElement("div");
    card.className = "card shadow-sm";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h1");
    title.className = "card-title";
    title.textContent = post.title;

    const author = document.createElement("p");
    author.className = "text-muted";
    author.textContent = `By ${post.author?.name ?? "Unknown"}`;

    const body = document.createElement("p");
    body.className = "mt-3";
    body.textContent = post.body || "No content available.";

    cardBody.append(title, author);

    if (post.media?.url) {
        const img = document.createElement("img");
        img.src = post.media.url;
        img.alt = post.media.alt || post.title;
        img.className = "img-fluid rounded my-3";
        cardBody.appendChild(img);
    }

    cardBody.appendChild(body);
    card.appendChild(cardBody);
    wrapper.appendChild(card);

    return wrapper;
}

/* =========================
   EDIT PAGE FORM
========================= */

export function renderEditPage(post) {
    const wrapper = document.createElement("div");
    wrapper.className = "container my-4";

    const card = document.createElement("div");
    card.className = "card shadow-sm";

    const formEdit = document.createElement("form");
    formEdit.className = "card-body";

    const title = document.createElement("input");
    title.className = "form-control mb-3";
    title.placeholder = "Edit the title";
    title.type = "text";
    title.id = "title";
    title.value = post.title || "";

    const body = document.createElement("textarea");
    body.className = "form-control mb-3";
    body.placeholder = "Edit the body";
    body.id = "body";
    body.value = post.body || "";

    const mediaUrl = document.createElement("input");
    mediaUrl.className = "form-control mb-3";
    mediaUrl.type = "text";
    mediaUrl.placeholder = "Edit the media url";
    mediaUrl.id = "mediaUrl";
    mediaUrl.value = post.media?.url || "";

    const mediaAlt = document.createElement("input");
    mediaAlt.className = "form-control mb-3";
    mediaAlt.type = "text";
    mediaAlt.placeholder = "Edit the media alt";
    mediaAlt.id = "mediaAlt";
    mediaAlt.value = post.media?.alt || "";

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-primary";
    editBtn.textContent = "Update";

    formEdit.append(title, body, mediaUrl, mediaAlt, editBtn);
    card.appendChild(formEdit);
    wrapper.appendChild(card);

    return wrapper;
}