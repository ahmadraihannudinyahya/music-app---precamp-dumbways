const pool = require('./connection/pool');

class PlaylistRepository{
  async addPlaylist({name, userId}){
    const id = `pllist-${Date.now()}`;
    const query = `INSERT INTO tb_playlist (id, name, user_id) VALUES ('${id}', '${name}', '${userId}')`;
    await pool.query(query);
  }

  async getPlaylistByUserId(userId){
    const query = `SELECT id, name FROM tb_playlist WHERE user_id = '${userId}'`;
    const [rows] = await pool.query(query);
    return rows
  }

  async addMusicInPlaylist({musicId, playlistId}){
    const id = `plms-${Date.now()}`;
    const query = `INSERT INTO junctions_playlist_music (id, playlist_id, music_id) VALUES ('${id}', '${playlistId}', '${musicId}')`;
    await pool.query(query);
  }

  async verifyMusicInPlaylist({musicId, playlistId}){
    const query = `SELECT id FROM junctions_playlist_music WHERE playlist_id = '${playlistId}' AND music_id = '${musicId}'`;
    const [rows] = await pool.query(query);
    if(rows.length > 0){
      throw new Error('masic sudah ada diplaylist');
    }
  }

  async getPlaylistById(playlistId){
    const query = `SELECT id, name FROM tb_playlist WHERE id = '${playlistId}'`;
    const [rows] = await pool.query(query);
    return rows[0];
  }

  async editPlaylistById({playlistId, name}){
    const query = `UPDATE tb_playlist SET name = '${name}' WHERE id = '${playlistId}'`;
    await pool.query(query);
  }

  async deletePlaylistbyId(playlistId){
    const query =  `DELETE FROM tb_playlist WHERE id ='${playlistId}'`;
    await pool.query(query);
  }

  async deleteAllMusicByPlaylistId(playlistId){
    const query =  `DELETE FROM junctions_playlist_music WHERE playlist_id = '${playlistId}'`;
    await pool.query(query);
  }

  async deleteMusicInPlaylist({playlistId, musicId}){
    const query = `DELETE FROM junctions_playlist_music WHERE playlist_id = '${playlistId}' AND music_id = '${musicId}'`;
    await pool.query(query);
  }
}

module.exports = PlaylistRepository