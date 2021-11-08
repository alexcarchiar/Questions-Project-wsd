import { executeQuery } from "../database/database.js";

const addQuestion = async (user_id, title, question_text) =>{
    await executeQuery(
        `INSERT INTO questions
          (user_id, title, question_text)
            VALUES ($1, $2, $3)`,
        user_id,
        title,
        question_text
      );
}

const getAllQuestionsForUser = async (user_id) => {
    const result = await executeQuery(
        "SELECT * FROM questions WHERE user_id = $1",
        user_id
      );
    return result.rows
}

export { addQuestion, getAllQuestionsForUser }