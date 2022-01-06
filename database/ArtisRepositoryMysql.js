const pool = require('./connection/pool');

class ArtisRepositoryMysql{
  async getAllArtis(){
    const query = 'SELECT id, name, photo FROM tb_artis';
    const [rows] = await pool.query(query);
    return rows;
  }

  async addArtis({artisName, startCarrer, aboutArtis, image}){
    const id = `artis-${Date.now()}`;
    const query =  `INSERT INTO tb_artis (id, name, start_carrer, photo, about) VALUES ('${id}', '${artisName}', '${startCarrer}', '${image}', '${aboutArtis}')`;
    await pool.query(query);
  }

  async getTopArtis(){
    const query = 'SELECT DISTINCT tb_artis.id, tb_artis.name, tb_artis.photo, tb_artis.about FROM tb_artis JOIN tb_music ON tb_artis.id = tb_music.artis_id LIMIT 3';
    const [rows] = await pool.query(query);
    return rows;
  }

  async getArtisById(artisId){
    const query =  `SELECT id, name, photo, about FROM tb_artis WHERE id = '${artisId}'`;
    const [rows] = await pool.query(query);
    return rows[0];
  }
}

module.exports =  ArtisRepositoryMysql;