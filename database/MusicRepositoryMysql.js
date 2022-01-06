const pool = require('./connection/pool');

class MusicRepositoryMysql {
  async addMusic({title, genre, artis, music, cover=null}){
    const id = `music-${Date.now()}`;
    const query = `INSERT INTO tb_music (id, title, music, genre_id, artis_id, cover_music) VALUES ('${id}', '${title}', '${music}', '${genre}', '${artis}', '${cover}')`;
    await pool.query(query);
  };

  async getMusic(){
    const query = 'SELECT tb_music.id, tb_music.title, tb_music.cover_music, (SELECT COUNT(tb_likes.music_id) FROM tb_likes WHERE tb_likes.music_id = tb_music.id) AS musiclike FROM tb_music ORDER BY musiclike DESC LIMIT 6';
    const [rows] = await pool.query(query);
    return rows;
  }
  async getAllMusic(){
    const query = 'SELECT id, title, cover_music FROM tb_music';
    const [rows] = await pool.query(query);
    return rows;
  }

  async getMusicById(id){
    const query = `SELECT tb_music.id, tb_music.title, tb_music.cover_music, tb_music.music, tb_genre.name AS genre, tb_artis.name AS artis FROM tb_music JOIN tb_genre ON tb_music.genre_id = tb_genre.id JOIN tb_artis ON tb_music.artis_id = tb_artis.id WHERE tb_music.id = '${id}'`;
    const [rows] = await pool.query(query);
    return rows[0];
  }

  async getMusicByPlaylist(playlistId){
    const query = `SELECT tb_music.id, tb_music.title FROM tb_music LEFT JOIN junctions_playlist_music ON tb_music.id = junctions_playlist_music.music_id WHERE junctions_playlist_music.playlist_id = '${playlistId}'`;
    const [rows] = await pool.query(query);
    return rows;
  }

  async getMusicByGenreId(genreId){
    const query = `SELECT id, title FROM tb_music WHERE genre_id = '${genreId}'`;
    const [rows] = await pool.query(query);
    return rows;
  }

  async getMusicByArtisId(artisId){
    const query = `SELECT id, title FROM tb_music WHERE artis_id = '${artisId}'`;
    const [rows] = await pool.query(query);
    return rows;
  }
}

module.exports = MusicRepositoryMysql;