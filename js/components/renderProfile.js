export function profileInfoContent(profile) {
  const profileInfo = document.getElementById("profile-info");
  profileInfo.classList = "profile-info";

  if (!profileInfo) {
    console.error("❌ Could not find profile-info");
    return;
  }

  profileInfo.innerHTML = "";

  const profileWrapper = document.createElement("div");
  profileWrapper.classList = "profile-wrapper";

  // Images container
  const imagesDiv = document.createElement("div");
  imagesDiv.classList = "profile-images";

  // Banner
  if (profile.banner?.url) {
    const banner = document.createElement("img");
    banner.src = profile.banner.url;
    banner.alt = profile.banner.alt ?? "Profile banner";
    banner.classList = "profile-banner";
    imagesDiv.appendChild(banner);
  }

  // Avatar
  if (profile.avatar?.url) {
    const avatar = document.createElement("img");
    avatar.src = profile.avatar.url;
    avatar.alt = profile.avatar.alt ?? "Profile avatar";
    avatar.classList = "profile-avatar";
    imagesDiv.appendChild(avatar);
  }

  // Text info
  const infoTxt = document.createElement("div");
  infoTxt.classList = "profile-info-text";

  const nameType = document.createElement("p");
  nameType.textContent = "Name:";
  const name = document.createElement("h2");
  name.textContent = profile.name;

  const emailType = document.createElement("p");
  emailType.textContent = "Email:";
  const email = document.createElement("h2");
  email.textContent = profile.email ?? "No email found";

  const bioType = document.createElement("p");
  bioType.textContent = "Biography:";
  const bio = document.createElement("p");
  bio.textContent = profile.bio ?? "No bio yet";

  const counts = document.createElement("div");
  counts.classList = "profile-counts";
  counts.innerHTML = `
    <span>Posts: ${profile._count?.posts ?? 0}</span>
    <span>Followers: ${profile._count?.followers ?? 0}</span>
    <span>Following: ${profile._count?.following ?? 0}</span>
  `;

  infoTxt.append(nameType, name, emailType, email, bioType, bio, counts);

  // Assemble
  profileWrapper.append(imagesDiv, infoTxt);
  profileInfo.appendChild(profileWrapper);
}

export function profilePostContent(post) {
    const profilePosts = document.getElementById('profile-posts');
    
    const title = document.createElement('h2');
    title.textContent = post.title ?? "No title found";

    const body = document.createElement('p');
    body.textContent = post.body ?? "No body found";

    profilePosts.append(title, body);

}