import { getToken } from "../storage/local.js";
import { deletePost } from "../utils/deletePost.js";
import { getUser } from "../storage/local.js";

export function postContent(post) {
    const postWrapper = document.createElement('div');
    postWrapper.classList = 'post-content';

    const author = document.createElement('h2');
    author.textContent = `${post.author?.name}`;
    console.log(post.author);
    
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

    postWrapper.append(title, author, body, email);

    const user = getUser();

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