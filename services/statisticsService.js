import { executeQuery } from "../database/database.js";

const findFiveUsersWithMostAnswers = async () => {
    const res = await executeQuery(
        `SELECT users.email as email, count(*) as count FROM users
        JOIN question_answers ON users.id = question_answers.user_id
        GROUP BY users.email
        ORDER BY count
        LIMIT 5`,
      );
  return res.rows;
};

const getNumOfAnswers = async (userId) => {
    const res = await executeQuery(
    `SELECT * FROM question_answers
    WHERE user_id = $1;`,userId)

    return res.rows.length
}

export { findFiveUsersWithMostAnswers, getNumOfAnswers }