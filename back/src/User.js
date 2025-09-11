// User model for in-memory storage
export class User {
  constructor({ id, email, password, name, createdAt = new Date() }) {
    this.id = id;
    this.email = email;
    this.password = password; // Will be hashed
    this.name = name;
    this.createdAt = createdAt;
  }

  // Remove password from response
  toJSON() {
    const { password, ...user } = this;
    return user;
  }
}

export default User;
