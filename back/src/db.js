// Database connection placeholder
// In the future, this could be replaced with Prisma, MongoDB, or SQLite connection

export const db = {
  users: [],
  houses: []
};

export const resetDb = () => {
  db.users = [];
  db.houses = [];
};
