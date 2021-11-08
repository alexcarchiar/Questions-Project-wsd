import { executeQuery } from "../database/database.js";

const addUser = async (email, password) => {
  await executeQuery(
    `INSERT INTO users
      (email, password)
        VALUES ($1, $2)`,
    email,
    password,
  );
};

export { addUser };