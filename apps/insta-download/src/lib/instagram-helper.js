
import instagramUrlDirect from "instagram-url-direct";

export async function getInstagramMedia(url) {
  return await instagramUrlDirect.instagramGetUrl(url);
}
