
export function postContent(post) {
    const postWrapper = document.createElement('div');

    const title = document.createElement('a');
    title.href = `../../pages/post.html?id=${post.id}`;
    title.textContent = post.title;

    const author = document.createElement('h2');
    author.textContent = `${post.author?.name}`;
    console.log(post.author);

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