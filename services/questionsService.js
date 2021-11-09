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

const getQuestionById = async (id) => {
  const result = await executeQuery("SELECT * FROM questions WHERE id=$1;",
  id)
  return result.rows
}

const deleteQuestionById = async (id) => {
  await executeQuery("DELETE FROM questions WHERE id=$1;",
  id)
}

const getRandomQuestion = async () => {
  let result = (await executeQuery("SELECT * FROM questions ORDER BY RANDOM() LIMIT 1;"))
  if(result.rows.length === 0){
    return undefined
  }
  return result.rows[0]
}

export { addQuestion, getAllQuestionsForUser, getQuestionById, deleteQuestionById, getRandomQuestion }