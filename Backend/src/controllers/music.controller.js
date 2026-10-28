const musicModel = require('../models/music.model');
const uploadFile = require('../services/storage.service');
const userModel = require('../models/user.model');

async function createMusic(req, res) {

    const { title } = req.body;
    const  {buffer}  = req.file;

    if( !title ) {

        return res.status(400).json({

            msg: "Title is required"
        })
    }

    const user = await userModel.findById(req.user.id);

    if(!user) {

        return res.status(404).json({

            msg: "User not found"
        })
    }


    console.time('ImageKit Upload Time');
    const response = await uploadFile(buffer);
    console.timeEnd('ImageKit Upload Time');

    const music = await musicModel.create({
        title,
        artist : user.username,
        musicUrl: response.url
    })

    res.status(201).json({

        msg: "Music created successfully",
    })
}

async function getMusic(req, res) {

    const musics = await musicModel.find();

    res.status(200).json({

        msg: "Music fetched successfully",
        musics
    })

}

module.exports = { createMusic, getMusic };