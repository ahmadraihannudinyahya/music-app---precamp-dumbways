class GenreHandler{
  constructor({genreRepositoryMysql, musicRepositoryMysql}){
    this.genreRepositoryMysql = genreRepositoryMysql;
    this.musicRepositoryMysql = musicRepositoryMysql;

    this.addGenreHandler = this.addGenreHandler.bind(this);
    this.getViewsGenreListHandler = this.getViewsGenreListHandler.bind(this);
    this.getViewsGenreDetailHandler = this.getViewsGenreDetailHandler.bind(this);
  }

  async addGenreHandler(req, res){
    try{
      if(!req.session.isLogin){
        return res.redirect('/')
      }
      const { genreName } = req.body;
      await this.genreRepositoryMysql.addGenre({name : genreName})
      req.session.message = {
        message : 'Genre berhasil ditambahkan',
        type : 'success'
      }
      res.redirect('/music/add');
    }catch(error){
      console.log(error);
      req.session.message = {
        message : error.message,
        type : 'danger'
      }
      res.redirect('/music/add');
    }
  }

  async getViewsGenreListHandler(req, res){
    try {
      const genres = await this.genreRepositoryMysql.getAllGenre();
      res.render('genreList',{
        isLogin : req.session.isLogin,
        user : req.session.user,
        genres
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  }

  async getViewsGenreDetailHandler(req, res){
    try {
      const {genreId} = req.params;
      const genre = await this.genreRepositoryMysql.getGenreById(genreId);
      const musics = await this.musicRepositoryMysql.getMusicByGenreId(genreId);
      res.render('detailGenre',{
        isLogin : req.session.isLogin,
        user : req.session.user,
        genre,
        musics
      });
    } catch (error) {
      console.log(error);
      res.redirect('/genre')
    }
  }
}

module.exports = GenreHandler;