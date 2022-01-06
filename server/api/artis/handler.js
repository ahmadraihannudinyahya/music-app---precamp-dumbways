class ArtisHandler{
  constructor({artisRepositoryMysql, musicRepositoryMysql}){
    this.artisRepositoryMysql = artisRepositoryMysql;
    this.musicRepositoryMysql = musicRepositoryMysql;

    this.addArtisHandler = this.addArtisHandler.bind(this);
    this.getViewsArtisListHandler = this.getViewsArtisListHandler.bind(this);
    this.getViewsDetailArtisHandler = this.getViewsDetailArtisHandler.bind(this);
  }

  async addArtisHandler(req, res){
    try{
      if(!req.session.isLogin){
        return res.redirect('/')
      }
      console.log(req.files);
      // const image = req.file.filename;
      // await this.artisRepositoryMysql.addArtis({...req.body, image})
      req.session.message = {
        message : 'Artis Berhasil dibuat',
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

  async getViewsArtisListHandler(req, res){
    try {
      const artis = await this.artisRepositoryMysql.getAllArtis();
      res.render('artisList',{
        isLogin : req.session.isLogin,
        user : req.session.user,
        artis,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  }

  async getViewsDetailArtisHandler(req, res){
    try {
      const {artisId} = req.params;
      const artis = await this.artisRepositoryMysql.getArtisById(artisId);
      const musics = await this.musicRepositoryMysql.getMusicByArtisId(artisId);
      res.render('detailArtis',{
        isLogin : req.session.isLogin,
        user : req.session.user,
        artis,
        musics
      });
    } catch (error) {
      console.log(error);
      res.redirect('/artis')
    }
  }
}

module.exports = ArtisHandler;