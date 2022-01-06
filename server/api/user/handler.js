class UserHandler{
  constructor({userRepositoryMysql}){
    this.userRepositoryMysql = userRepositoryMysql;

    this.registerUserHandler = this.registerUserHandler.bind(this);
    this.loginUserHandler = this.loginUserHandler.bind(this);
  }

  getViewRegisterHandler(req, res){
    if(req.session.isLogin){
      return res.redirect('/')
    }
    res.render('register', {
      isLogin : req.session.isLogin,
      user : req.session.user,
    });
  }

  async registerUserHandler(req, res){
    try {
      const {email, password} = req.body;
      if(!email || !password){
        throw new Error('Mohon masukan email dan password')
      }
      await this.userRepositoryMysql.verifyAvailableEmail(email);
      await this.userRepositoryMysql.registerUser({email, password});
      req.session.message = {
        message : 'Akun berhasil dibuat, silahkan Login',
        type : 'success'
      }
      res.redirect('/user/login');
    } catch (error) {
      console.log(error);
      req.session.message = {
        message : error.message,
        type : 'danger'
      }
      res.redirect('/user/register');
    }
  }

  getViewLoginHandler(req, res){
    if(req.session.isLogin){
      return res.redirect('/')
    }
    res.render('login',{
      isLogin : req.session.isLogin,
      user : req.session.user,
    })
  }

  async loginUserHandler(req, res){
    try {
      const {email , password} = req.body;
      if(!email || !password){
        throw new Error('')
      }
      const {id, email : verifiedEmail, status} = await this.userRepositoryMysql.userVerifyCredentials({email, password});
      req.session.isLogin = true;
      req.session.user = {
        id,
        email :verifiedEmail,
        status
      }
      res.redirect('/');
    } catch (error) {
      console.log(error);
      req.session.message = {
        message : error.message,
        type : 'danger'
      }
      res.redirect('/user/login');
    }
  }

  logoutUserHandler(req, res){
    req.session.destroy();
    res.redirect('/');
  }
}

module.exports = UserHandler;