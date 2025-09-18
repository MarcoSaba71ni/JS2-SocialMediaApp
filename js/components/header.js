

const headerWrapper = document.getElementById('header');

function renderHeader() {
    const jsHeader = document.getElementById('js-header');

    const logoDiv = document.createElement('div');

    const logoAssembler = document.createElement('a');
    logoAssembler.href = '../../feed.html';
    const logo = document.createElement('img');
    logo.classList.add('logo-img');
    logo.src = '../../images/header-logo.png'; 
    logo.alt = 'Header Logo';
   

    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search posts...';
    searchBar.id = 'search-bar';
    searchBar.classList.add('header-search');
    

    const profileDiv = document.createElement('div');
    const profileLink = document.createElement('a');
    profileLink.textContent = 'Profile';
    profileLink.href = '../../pages/profile.html';
    profileLink.classList = 'profile-link';

    

    logoDiv.appendChild(logoAssembler);
    logoAssembler.appendChild(logo);
    profileDiv.appendChild(profileLink);

    jsHeader.append(logoDiv, searchBar, profileDiv);

}

renderHeader();