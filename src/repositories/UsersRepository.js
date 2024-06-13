export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAll = () => {
    return this.dao.getAll();
  };
  getBy = (params) => {
    return this.dao.getBy(params);
  };
  createUser = (user) => {
    return this.dao.saveUser(user);
  };
  update = (id, user) => {
    return this.dao.updateUser(id, user);
  };
  updatePassword = (userId, newPassword) => {
    return this.dao.updatePassword(userId, newPassword);
  };
}
