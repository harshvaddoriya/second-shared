
const instagramUrlDirect = require("instagram-url-direct");

async function getInstagramMedia(url) {
  return await instagramUrlDirect.instagramGetUrl(url);
}


module.exports = {
  getInstagramMedia,
};
