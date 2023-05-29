const FileService = require('../services/file.service');

class UserController {
  getUsers(req, res) {
    res.json(FileService.getFile());
  }

  getUser(req, res) {
    const { userId } = req.params;

    const parsedData = FileService.getFile();
    const user = parsedData.find((item) => item.id === +userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json('Not found');
    }
  }

  createUser(req, res) {
    const requestBody = req.body;

    if (Object.keys(requestBody).length === 0) {
      return res.status(404).json('Empty data');
    }

    const parsedData = FileService.getFile();

    const highestId = Math.max(...parsedData.map((item) => item.id));
    const newUser = { id: highestId + 1, ...requestBody };
    parsedData.push(newUser);

    FileService.createFile(parsedData);
    res.json(newUser);
  }

  deleteUser(req, res) {
    const { userId } = req.params;

    const parsedData = FileService.getFile();

    const newData = parsedData.filter((item) => item.id !== +userId);

    if (parsedData.length === newData.length) {
      return res
        .status(404)
        .json({ status: 'error', message: 'user not found' });
    }

    FileService.createFile(newData);
    res.json({ status: 'success', id: userId });
  }

  updateUser(req, res) {
    const requestBody = req.body;

    if (Object.keys(requestBody).length === 0) {
      return res.status(404).json({ status: 'error', message: 'empty data' });
    }

    if (!requestBody.id) {
      return res
        .status(404)
        .json({ status: 'error', message: 'id is required' });
    }

    const parsedData = FileService.getFile();

    const user = parsedData.filter((item) => item.id === requestBody.id)[0];

    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'user not found' });
    }

    const newData = parsedData.map((item) =>
      item.id === requestBody.id ? requestBody : item
    );
    FileService.createFile(newData);
    res.json({ status: 'success', id: requestBody.id });
  }
}

module.exports = new UserController();
