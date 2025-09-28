import { renderEditPage } from "../components/renderPosts.js";
import { apiGet , apiUpdate } from "../api/api.js";
import { getIdFromUrl } from "../utils/getId.js";
import { getToken } from "../storage/local.js";

async function loadEditPage () {

    const editWrapper = document.getElementById('edit-wrapper');

    const id = getIdFromUrl();
    const token = getToken();
    

    try {
        const editContent = await apiGet(`/social/posts/${id}?_author=true`, token);
        const form = renderEditPage(editContent);

        editWrapper.appendChild(form);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            sendUpdatedValues(id, token);
        } )


    } catch (error) {
        editWrapper.innerHTML = "<p>Could not load post for editing.</p>";
    }




}

async function sendUpdatedValues(id, token) {
  const updatedData = {
    title: document.getElementById("title").value.trim(),
    body: document.getElementById("body").value.trim(),
    media: {
      url: document.getElementById("mediaUrl")?.value.trim(),
      alt: document.getElementById("mediaAlt")?.value.trim(),
    },
  };

  try {
    await apiUpdate(`/social/posts/${id}`, updatedData, token);
    alert("Post updated successfully!");
    window.location.href = `post.html?id=${id}`;
  } catch (error) {
    alert("Could not update post. Try again.");
  }
}

loadEditPage(); 




