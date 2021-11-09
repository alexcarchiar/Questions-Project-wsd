import { Pool } from "../deps.js";

const CONCURRENT_CONNECTIONS = 2;
//const connectionPool = new Pool({}, CONCURRENT_CONNECTIONS);
const connectionPool = new Pool({
  hostname: "hattie.db.elephantsql.com",
  database: "wcphofqf",
  user: "wcphofqf",
  password: "sX40biZQp4LdJ3ZfMl6vYe4xH5h0wI-Y",
  port: 5432,
}, CONCURRENT_CONNECTIONS);
/*const connectionPool = new Pool({
  hostname: "hattie.db.elephantsql.com",
  database: "gqushfld",
  user: "gqushfld",
  password: "AAzFQ26uo0gx7MXcjKwjOLY1NFqd62OJ-Y",
  port: 5432,
}, CONCURRENT_CONNECTIONS);*/

const executeQuery = async (query, ...args) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };
