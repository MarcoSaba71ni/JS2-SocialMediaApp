import { checkAuth } from "../utils/checkAuth.js";
import { getAllPosts } from "../api/posts.js";
import { getToken } from "../storage/local.js";
import { postContent } from "../components/renderPosts.js";
import { searchSetup } from "../components/searchBar.js";

// checkAuth();

const feedPosts = document.getElementById("feed-posts");
const loadMoreBtn = document.getElementById("load-more-btn");

let allPosts = [];
let visibleCount = 3; 

function renderPost() {
  feedPosts.innerHTML = "";

  const visiblePosts = allPosts.slice(0, visibleCount);

  if (visiblePosts.length === 0) {
    feedPosts.innerHTML = "<p>No posts found.</p>";
    return;
  }

  visiblePosts.forEach((post) => {
    const postElement = postContent(post);
    feedPosts.appendChild(postElement);
  });

  if (visibleCount >= allPosts.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

async function loadFeed() {
  try {
    const token = getToken();
    const posts = await getAllPosts(token);
    allPosts = posts.data;

    renderPost();
    searchSetup(allPosts, renderPost);
  } catch (error) {
    feedPosts.innerHTML = "<p>Could not load posts.</p>";
  }
}

loadMoreBtn.addEventListener("click", () => {
  visibleCount += 3; 
  renderPost();
});

loadFeed();
