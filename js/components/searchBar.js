// searchBar.js

export function searchSetup(allPosts, renderPosts) {
  const searchBar = document.getElementById("search-bar");

  searchBar.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();
    doSearch(query, allPosts, renderPosts);
  });
}

function doSearch(query, allPosts, renderPosts) {
  if (!query) {
    // if input is empty → show all posts
    renderPosts(allPosts);
    return;
  }

  const filteredPosts = allPosts.filter((post) => {
    const title = post.title?.toLowerCase() || "";
    const body = post.body?.toLowerCase() || "";
    const author = post.author?.name?.toLowerCase() || "";
    const email = post.author?.email?.toLowerCase() || "";

    return (
      title.includes(query) ||
      body.includes(query) ||
      author.includes(query) ||
      email.includes(query)
    );
  });

  renderPosts(filteredPosts);
}
