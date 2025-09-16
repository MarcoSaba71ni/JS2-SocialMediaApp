import {apiGet} from './api.js';

export async function getAllPosts (token) {
    return await apiGet('/social/posts?_author=true', token);
};

