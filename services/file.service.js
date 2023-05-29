const fs = require('fs');
const config = require('config');

const dataFile = config.get('filePath');

class FileService {
  constructor() {
    this.dataFile = dataFile;
  }

  getFile() {
    const file = fs.readFileSync(this.dataFile, 'utf8');
    const parsedFile = JSON.parse(file);

    return parsedFile;
  }

  createFile(data) {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync(this.dataFile, stringifiedData);
  }
}

module.exports = new FileService();
