const pool = require('./connection/pool');

class LikesRepositoryMysql{
  async likeMusic({userId, musicId}){
    const id = `like-${Date.now()}`
    const query = `INSERT INTO tb_likes (id, user_id, music_id) VALUES ('${id}', '${userId}', '${musicId}')`;
    await pool.query(query);
  }
  async unLikeMusic({userId, musicId}){
    const id = `like-${Date.now()}`
    const query = `DELETE FROM tb_likes WHERE user_id = '${userId}' AND music_id = '${musicId}'`;
    await pool.query(query);
  }

  async verifyUserLikeInMusic({userId, musicId}){
    const query = `SELECT id FROM tb_likes WHERE user_id = '${userId}' AND music_id = '${musicId}'`;
    const [rows] = await pool.query(query);
    if(rows.length > 0){
      throw new Error();
    }
  }

  async getLikeStatusMusicIdByUserId({userId, musicId}){
    const query = `SELECT id FROM tb_likes WHERE user_id = '${userId}' AND music_id = '${musicId}'`;
    const [rows] = await pool.query(query);
    if(rows.length > 0){
      return true
    }
    return false;
  }
}

module.exports = LikesRepositoryMysql;