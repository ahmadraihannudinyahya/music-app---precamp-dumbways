class PlaylistHandler{
  constructor({playlistRepository, musicRepositoryMysql}){
    this.playlistRepository = playlistRepository;
    this.musicRepositoryMysql = musicRepositoryMysql;

    this.getViewsPlaylistHandler = this.getViewsPlaylistHandler.bind(this);
    this.addPlaylistHandler = this.addPlaylistHandler.bind(this);
    this.addMusicInPlaylist = this.addMusicInPlaylist.bind(this);
    this.getViewsDetailPlaylistHandler = this.getViewsDetailPlaylistHandler.bind(this);
    this.editPlaylistHandler = this.editPlaylistHandler.bind(this);
    this.deletePlaylistHandler = this.deletePlaylistHandler.bind(this);
    this.deleteMusicInPlaylistHandler = this.deleteMusicInPlaylistHandler.bind(this);
  }

  async getViewsPlaylistHandler(req, res){
    try {
      if(!req.session.isLogin){
        return res.redirect('/');
      }
      const {id} = req.session.user
      const playlists = await this.playlistRepository.getPlaylistByUserId(id);
      res.render('playlist',{
        isLogin : req.session.isLogin,
        user : req.session.user,
        playlists
      })
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  }

  async addPlaylistHandler(req, res){
    try {
      if(!req.session.isLogin){
        return res.redirect('/')
      }
      const {id : userId} = req.session.user;
      const { playlistName : name } = req.body;
      await this.playlistRepository.addPlaylist({name, userId});
      req.session.message = {
        message : 'Playlist berhasil ditambahkan',
        type : 'success'
      }
      res.redirect('/playlist');
    } catch (error) {
      console.log(error);
      req.session.message = {
        message : error.message,
        type : 'danger'
      }
      res.redirect('/playlist');
    }
  }

  async addMusicInPlaylist(req, res){
    try {
      if(!req.session.isLogin){
        return res.redirect('/');
      }
      const {playlistId, musicId} = req.body;
      await this.playlistRepository.verifyMusicInPlaylist({playlistId, musicId});
      await this.playlistRepository.addMusicInPlaylist({playlistId, musicId});
      res.send('success');
    } catch (error) {
      console.log(error);
      res.status(400);
      res.send();
    }
  }

  async getViewsDetailPlaylistHandler(req, res){
    try {
      if(!req.session.isLogin){
        return res.redirect('/');
      }
      const {id:playlistId} = req.params;
      const playlist = await this.playlistRepository.getPlaylistById(playlistId);
      const musics = await this.musicRepositoryMysql.getMusicByPlaylist(playlistId);
      res.render('detailPlaylist',{
        isLogin : req.session.isLogin,
        user : req.session.user,
        playlist,
        musics
      });
    } catch (error) {
      console.log(error);
      res.redirect('/playlist');
    }
  }
  async editPlaylistHandler(req, res){
    try {
      if(!req.session.isLogin){
        return res.redirect('/');
      }
      const {id:playlistId} = req.params;
      const { playlistName : name } = req.body;
      await this.playlistRepository.editPlaylistById({playlistId, name});
      req.session.message = {
        message : 'Playlist berhasil diubah',
        type : 'success'
      }
      res.redirect(`/playlist/${playlistId}`);
    } catch (error) {
      console.log(error);
      req.session.message = {
        message : error.message,
        type : 'danger'
      }
      res.redirect(`/playlist`);
    }
  }

  async deletePlaylistHandler(req, res){
    try {
      if(!req.session.isLogin){
        return res.redirect('/');
      }
      const {id:playlistId} = req.params;
      await this.playlistRepository.deleteAllMusicByPlaylistId(playlistId);
      await this.playlistRepository.deletePlaylistbyId(playlistId);
      req.session.message = {
        message : 'Playlist Berhasil dihapus',
        type : 'success'
      }
      res.redirect('/playlist')
    } catch (error) {
      console.log(error);
      req.session.message = {
        message : error.message,
        type : 'danger'
      }
      res.redirect(`/playlist`);
    }
  }

  async deleteMusicInPlaylistHandler(req, res){
    try {
      const {playlistId, musicId} = req.params;
      await this.playlistRepository.deleteMusicInPlaylist({playlistId, musicId});
      req.session.message = {
        message : "Music berhasil dihapus dari playlist",
        type : 'success'
      }
      res.redirect(`/playlist/${playlistId}`);
    } catch (error) {
      console.log(error);
      req.session.message = {
        message : error.message,
        type : 'danger'
      }
      res.redirect(`/playlist`);
    }
  }
}

module.exports = PlaylistHandler;