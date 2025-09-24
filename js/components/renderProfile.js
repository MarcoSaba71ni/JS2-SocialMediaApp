export function profileInfoContent(profile) {
  const profileInfo = document.getElementById("profile-info");
  console.log("👉 profileInfo container:", profileInfo);

  if (!profileInfo) {
    console.error(" Could not find profile-info ");
    return;
  }

  profileInfo.innerHTML = ""; 

  const name = document.createElement("h2");
  name.textContent = profile.name;

  const email = document.createElement("h2");
  email.textContent = profile.email ?? "No email found";

  const bio = document.createElement("p");
  bio.textContent = profile.bio ?? "No bio yet";

  profileInfo.append(name, email, bio);
}

export function profilePostContent(post) {
    const profilePosts = document.getElementById('profile-posts');
    
    const title = document.createElement('h2');
    title.textContent = post.title ?? "No title found";

    const body = document.createElement('h2');
    body.textContent = post.body ?? "No body found";

    profilePosts.append(title, body);

}