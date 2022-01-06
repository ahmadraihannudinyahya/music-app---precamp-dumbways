const pool = require('./connection/pool');

class UserRepository{
  async registerUser({email, password}){
    const id = `user-${Date.now()}`;
    const query = `INSERT INTO tb_user (id, email, password, status) VALUES ('${id}', '${email}', '${password}', false)`
    await pool.query(query);
  };

  async verifyAvailableEmail(email){
    const query = `SELECT id from tb_user WHERE email = '${email}'`;
    const [rows] = await pool.query(query);
    if(rows.length > 0){
      throw new Error('Email sudah digunakan');
    }
  }
  async userVerifyCredentials({email, password}){
    const query = `SELECT id, email, status from tb_user WHERE email = '${email}' AND password = '${password}'`
    const [rows] = await pool.query(query);
    if(rows.length === 0){
      throw new Error('Credentials yang anda masukan salah');
    }
    return rows[0];
  }
}

module.exports = UserRepository;