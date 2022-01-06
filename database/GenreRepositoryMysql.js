const pool = require('./connection/pool');

class GenreRepositoryMysql{

  async getAllGenre(){
    const query = 'SELECT id, name FROM tb_genre';
    const result = await pool.query(query);
    return result[0]
  }
  async addGenre({name}){
    const id = `genre-${Date.now()}`;
    const query = `INSERT INTO tb_genre (id, name) VALUES ('${id}', '${name}')`
    await pool.query(query);
  }
  async getGenreById(genreId){
    const query = `SELECT id, name FROM tb_genre WHERE id = '${genreId}'`;
    const [rows] = await pool.query(query);
    return rows[0]
  }
}
module.exports = GenreRepositoryMysql;