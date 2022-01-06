class MusicHandler{
  constructor({genreRepositoryMysql, artisRepositoryMysql, musicRepositoryMysql, playlistRepository, likesRepositoryMysql}){
    this.genreRepositoryMysql = genreRepositoryMysql;
    this.artisRepositoryMysql = artisRepositoryMysql;
    this.musicRepositoryMysql = musicRepositoryMysql;
    this.playlistRepository = playlistRepository;
    this.likesRepositoryMysql = likesRepositoryMysql;

    this.getAddMusicViews = this.getAddMusicViews.bind(this);
    this.getMusicDetailByIdHandler = this.getMusicDetailByIdHandler.bind(this);
    this.addMusicHandler = this.addMusicHandler.bind(this);
    this.getViewsAllMusicHandler = this.getViewsAllMusicHandler.bind(this);
  }
  async getAddMusicViews(req, res){
    try {
      if(!req.session.isLogin){
        return res.redirect('/')
      }
      const genres = await this.genreRepositoryMysql.getAllGenre();
      const artis = await this.artisRepositoryMysql.getAllArtis();
      res.render('addMusic',{
        isLogin : req.session.isLogin,
        user : req.session.user,
        genres,
        artis
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getMusicDetailByIdHandler(req, res){
    try {
      const {id :musicId} = req.params;
      const music = await this.musicRepositoryMysql.getMusicById(musicId);
      const musics = await this.musicRepositoryMysql.getMusic();
      let playlists;
      let like;
      if(req.session.isLogin){
        const {id : userId} = req.session.user;
        playlists = await this.playlistRepository.getPlaylistByUserId(userId);
        like = await this.likesRepositoryMysql.getLikeStatusMusicIdByUserId({musicId , userId})
      }
      res.render('detailMusic',{
        isLogin : req.session.isLogin,
        user : req.session.user,
        music,
        musics,
        playlists,
        like
      });
    } catch (error) {
      console.log(error);
    }
  }
  async addMusicHandler(req, res){
    try {
      if(!req.session.isLogin){
        return res.redirect('/')
      }
      const music = req.file.filename;
      await this.musicRepositoryMysql.addMusic({...req.body, music})
      req.session.message = {
        message : 'Music Berhasil ditambahkan',
        type : 'success'
      }
      res.redirect('/music/add');
    } catch (error) {
      console.log(error);
      req.session.message = {
        message : error.message,
        type : 'danger'
      }
      res.redirect('/music/add');
    }
  }

  async getViewsAllMusicHandler(req, res){
    try {
      const musics = await this.musicRepositoryMysql.getAllMusic();
      res.render('musicList',{
        isLogin : req.session.isLogin,
        user : req.session.user,
        musics
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');

    }
  }
}

module.exports = MusicHandler;