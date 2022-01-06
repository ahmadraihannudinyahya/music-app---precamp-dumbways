const path = require('path');
const express = require('express');
const hbs = require('hbs');
const session = require('express-session');


const GenreRepositoryMysql = require('../database/GenreRepositoryMysql');
const ArtisRepositoryMysql = require('../database/ArtisRepositoryMysql');
const MusicRepositoryMysql = require('../database/MusicRepositoryMysql');
const UserRepositoryMysql = require('../database/UserRepositoryMysql');
const PlaylistRepository = require('../database/PlaylistRepository');
const LikesRepositoryMysql = require('../database/LikesRepositoryMysql');


const musicInterface = require('./api/music');
const artisInterface = require('./api/artis');
const genreInterface = require('./api/genre');
const userInterface = require('./api/user');
const playlistInterface = require('./api/playlist');
const likesInterface = require('./api/likes');

const createServer= () =>{
  const app = express();
  const genreRepositoryMysql = new GenreRepositoryMysql();
  const artisRepositoryMysql = new ArtisRepositoryMysql();
  const musicRepositoryMysql = new MusicRepositoryMysql();
  const userRepositoryMysql = new UserRepositoryMysql();
  const playlistRepository = new PlaylistRepository();
  const likesRepositoryMysql = new LikesRepositoryMysql();

  app.use(
    session({
      cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
      },
      store: new session.MemoryStore(),
      saveUninitialized: true,
      resave: false,
      secret: 'secretValue',
    })
  );

  app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(express.static("express"));
  app.use('/public', express.static(path.join(__dirname, '../public')));

  app.set('views', path.join(__dirname, '/../views'));
  app.set('view engine', 'hbs');
  hbs.registerPartials(path.join(__dirname + '/../views/partials'));

  app.get('/',async (req, res)=>{
    try {
      const musics = await musicRepositoryMysql.getMusic();
      const topArtis = await artisRepositoryMysql.getTopArtis();
      res.render('index',{
        isLogin : req.session.isLogin,
        user : req.session.user,
        topArtis,
        musics
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.use(genreInterface({
    genreRepositoryMysql,
    musicRepositoryMysql
  }))

  app.use(artisInterface({
    artisRepositoryMysql,
    musicRepositoryMysql
  }))

  app.use(musicInterface({
    genreRepositoryMysql,
    artisRepositoryMysql,
    musicRepositoryMysql,
    playlistRepository,
    likesRepositoryMysql
  }));

  app.use(userInterface({
    userRepositoryMysql,
  }));

  app.use(playlistInterface({
    playlistRepository,
    musicRepositoryMysql
  }));

  app.use(likesInterface({
    likesRepositoryMysql
  }))
  return app;
}

module.exports = createServer;
