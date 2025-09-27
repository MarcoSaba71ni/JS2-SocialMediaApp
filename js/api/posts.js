import { apiGet } from './api.js';

export async function getAllPosts(token) {
    return await apiGet('/social/posts?_author=true&_comments=true&_reactions=true', token);
}

export async function commentPost(token) {
    return await apiPost('/social/posts/<id>/comment', token);
}


