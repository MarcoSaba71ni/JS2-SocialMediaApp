import { apiUpdate } from "../api/api.js";
import { getToken } from "../storage/local.js";

export async function followProfile(name) {
  const token = getToken();
  // no need to pass data (body) for follow/unfollow → API expects just PUT with token
  const response = await apiUpdate(`/social/profiles/${name}/follow`, {}, token);
  return response.data;
}

export async function unfollowProfile(name) {
  const token = getToken();
  const response = await apiUpdate(`/social/profiles/${name}/unfollow`, {}, token);
  return response.data;
}
