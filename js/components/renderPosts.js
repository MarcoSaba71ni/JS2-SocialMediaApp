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
    const postWrapper = document.createElement('div');
    postWrapper.classList = 'post-content';

    const authorLink = document.createElement('a');
    authorLink.href =  `./profile.html?author=${post.author.name}`;
    const author = document.createElement('h2');
    author.textContent = `${post.author?.name}`;
    console.log(post.author);
    
    authorLink.appendChild(author);

    const title = document.createElement('a');
    title.href = `../../pages/post.html?id=${post.id}`;
    title.textContent = post.title;

    if(post.media?.url) {
        const mediaUrl = document.createElement('img');
        mediaUrl.classList = "img-feed";
        mediaUrl.src = post.media.url;
        mediaUrl.alt = post.media.alt;

        postWrapper.appendChild(mediaUrl);
    }

    const email = document.createElement('p');
    email.textContent = `${post.author?.email}`;

    const body = document.createElement('p');
    body.textContent = post.body;

    postWrapper.append(title, authorLink, body, email);

    const user = getUser();

    const countsDiv = document.createElement('div');
    countsDiv.classList = 'post-counts';

    const commentsCount = document.createElement('span');
    commentsCount.textContent = `${post._count?.comments || 0} comments`;

    const reactionsCount = document.createElement('span');
    reactionsCount.textContent = `${post._count?.reactions || 0} reactions`;

    countsDiv.append(commentsCount, reactionsCount);
    postWrapper.appendChild(countsDiv);
    
    if (user && post.author?.email === user.email) {
        const divEdtDel = document.createElement('div');
        divEdtDel.classList = 'div-edit-del';

        const editBtn = document.createElement('button');
        editBtn.classList = 'btn-cta';
        editBtn.id = 'edit-Btn';
        editBtn.textContent = 'Edit';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList = 'delete-cta';
        deleteBtn.id = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        editBtn.addEventListener('click', () => {
        window.location.href = `../../pages/edit.html?id=${post.id}`;
        });
        
        deleteBtn.addEventListener('click', () => {
        deletePost(post.id, getToken());
        })

        divEdtDel.append(editBtn, deleteBtn);

        postWrapper.appendChild(divEdtDel);
      
    }

    else if (user) {
        const divFollow = document.createElement('div');
        divFollow.classList = 'div-follow';

        const followBtn = document.createElement('button');
        followBtn.classList = 'btn-follow';
        followBtn.textContent = 'Follow';

        followBtn.addEventListener('click', async () => {
            if (followBtn.textContent === 'Follow') {
                await followProfile(post.author.name);
                followBtn.textContent = 'Unfollow';
            } else {
                await unfollowProfile(post.author.name);
                followBtn.textContent = 'Follow';
            }
        });

        divFollow.appendChild(followBtn);
        postWrapper.appendChild(divFollow);
    }

    const commentsSection = document.createElement('div');
    commentsSection.classList = 'comments-section';

if (post.comments && post.comments.length > 0) {
    post.comments.forEach(c => {
        const commentDiv = document.createElement('div');
        commentDiv.classList = 'comment'; 

        const authorName = document.createElement('strong');
        authorName.classList = 'comment-author';
        authorName.textContent = c.author?.name || c.owner;

        const commentBody = document.createElement('p');
        commentBody.classList = 'comment-body'; 
        commentBody.textContent = c.body;

        const createdDate = document.createElement('span');
        createdDate.classList = 'comment-date';
        createdDate.textContent = new Date(c.created).toLocaleString();

        commentDiv.append(authorName, commentBody, createdDate);
        commentsSection.appendChild(commentDiv);
    });
} else {
        const noComments = document.createElement('p');
        noComments.textContent = "No comments yet.";
        commentsSection.appendChild(noComments);
    }

        const commentForm = document.createElement('div');
        commentForm.classList = 'comment-form';
        commentForm.id = `comment-form-${post.id}`;


        const commentInput = document.createElement('textarea');
        commentInput.classList = 'comment-input';
        commentInput.id = `comment-input-${post.id}`;
        commentInput.placeholder = "Write a comment...";
        commentInput.required = true;


        const submitBtn = document.createElement('button');
        submitBtn.id = `btn-submit-comment-${post.id}`;
        submitBtn.type = 'button';
        submitBtn.classList = 'btn-submit-comment';
        submitBtn.textContent = "Post Comment";

        commentForm.append(commentInput, submitBtn);


        postWrapper.appendChild(commentForm);

    postWrapper.appendChild(commentsSection);

    commentValue(post.id, submitBtn.id, commentInput.id);

    return postWrapper;
}   

export function singlePost(post) {
    const wrapper = document.createElement("div");
    wrapper.classList = "single-post-wrapper";

    const title = document.createElement("h1");
    title.textContent = post.title;

    const author = document.createElement("p");
    author.textContent = `By ${post.author?.name ?? "Unknown"}`;

    const body = document.createElement("p");
    body.textContent = post.body || "No content available.";

    if (post.media?.url) {
        const img = document.createElement("img");
        img.src = post.media.url;
        img.alt = post.media.alt || post.title;
        wrapper.appendChild(img);
    }

    wrapper.append(title, author, body);
    return wrapper;
};

export function renderEditPage (post) {
    const formEdit = document.createElement('form');
    formEdit.classList = 'edit-form';

    const title = document.createElement('input');
    title.classList = 'edit-input';
    title.placeholder = 'Edit the title';
    title.type = 'text';
    title.id = 'title';

    const body = document.createElement('textarea');
    body.placeholder = 'Edit the body';
    body.id = 'body';
    body.classList = 'edit-input';

    const mediaUrl = document.createElement('input');
    mediaUrl.type = 'text';
    mediaUrl.placeholder = 'Edit the media url';
    mediaUrl.id = 'mediaUrl';
    mediaUrl.classList = 'edit-input';


    const mediaAlt = document.createElement('input');
    mediaAlt.type = 'text';
    mediaAlt.placeholder = 'Edit the media alt';
    mediaAlt.id = 'mediaAlt';
    mediaAlt.classList = 'edit-input';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Update';
    editBtn.classList = 'btn-cta';
    



    formEdit.append(title, body, mediaUrl, mediaAlt, editBtn);
    return formEdit;
}