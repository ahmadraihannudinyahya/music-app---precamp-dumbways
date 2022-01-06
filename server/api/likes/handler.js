class LikesHandler{
  constructor({likesRepositoryMysql}){
    this.likesRepositoryMysql = likesRepositoryMysql;

    this.putMusicLikes = this.putMusicLikes.bind(this);
  }
  async putMusicLikes(req, res){
    try {
      const {musicId} = req.params;
      const {id : userId} = req.session.user;
      try {
        await this.likesRepositoryMysql.verifyUserLikeInMusic({musicId, userId});
        await this.likesRepositoryMysql.likeMusic({musicId, userId});
      } catch{
        await this.likesRepositoryMysql.unLikeMusic({musicId, userId});
      }
      res.send('success');
    } catch (error) {
      console.log(error);
      res.status(400);
      res.send();
    }
  }
}

module.exports = LikesHandler;