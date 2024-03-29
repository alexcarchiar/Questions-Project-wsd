import { executeQuery } from "../database/database.js";

const addOption = async (question_id, option_text, is_correct) => {
    await executeQuery("INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($1,$2,$3);",
    question_id,
    option_text,
    is_correct)
}

const getOptions = async (question_id) => {
    let result = await executeQuery("SELECT * FROM question_answer_options WHERE question_id=$1;",
    question_id)
    return result.rows
}

const deleteOption = async (option_id) => {
    await executeQuery("DELETE FROM question_answer_options WHERE id=$1;",
    option_id)
}

const getOptionById = async (option_id) => {
    let result = await executeQuery("SELECT * FROM question_answer_options WHERE id=$1;",
    option_id)
    return result.rows
}

export { addOption, getOptions, deleteOption, getOptionById }