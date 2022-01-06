const fs = require('fs');
const path = require('path');

class StorageRepositoryLocal{
  constructor(filePath){
    if(!fs.existsSync(filePath)){
      fs.mkdirSync(filePath);
    }

    this.filePath = filePath;
  }

  uploadImage(fileBuffer){
    fs.writeFileSync(path.join(this.filePath,Date.now()), fileBuffer)
  }
}

module.exports = StorageRepositoryLocal;