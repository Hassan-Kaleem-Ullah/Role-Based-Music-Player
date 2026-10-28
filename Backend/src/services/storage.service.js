const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

});

async function uploadFile(buffer) {

  const response = await client.files.upload({
    file: buffer.toString("base64"),
    fileName: '_music_' + Date.now(),
    folder: "/music-project/musics",


  });
  
  return response;

}

module.exports = uploadFile;
