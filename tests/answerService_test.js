import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import * as userService from "../services/userService.js"
import { assertNotEquals, assertEquals, assertExists, assertObjectMatch } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import { bcrypt } from "../deps.js";
import { executeQuery } from "../database/database.js";
import * as optionsService from "../services/optionsService.js"
import * as questionsService from "../services/questionsService.js"
import * as answerService from "../services/answerService.js"

Deno.test({
    name: "Testing adding answer",
    async fn() {
        //adding random new user
        const generateRandomEmail = function(){
            return Math.random().toString(20).substr(2, 6) + "@mail.com"
        }
        const email = generateRandomEmail()
        
        await userService.addUser(email,await bcrypt.hash("password"))
        const user = (await userService.findUserByEmail(email))[0]
        assertEquals(user.email,email)
        //adding question
        await questionsService.addQuestion(1,"automated test","please")
        const resultQ = (await questionsService.getAllQuestionsForUser(1))
        let questionAdded
        resultQ.forEach( el => {
            if(el.user_id === 1 && el.title === "automated test" && el.question_text === "please"){
                questionAdded = el
            }
        })
        assertExists(questionAdded)
        //adding option
        await optionsService.addOption(15,"automated test",true)
        const resultO = (await optionsService.getOptions(15))
        let optionAdded
        resultO.forEach( el => {
            if(el.question_id === 15 && el.option_text === "automated test"){
                optionAdded = el
            }
        })
        assertExists(optionAdded)
        //adding answer
        await answerService.addAnswer(user.id,questionAdded.id,optionAdded.id,optionAdded.is_correct)
        let resultA = (await executeQuery("SELECT * FROM question_answers WHERE user_id=$1 AND question_id =$2 AND question_answer_option_id=$3;",
        user.id,questionAdded.id,optionAdded.id
        ))
        assertExists(resultA.rows[0])

    },
    sanitizeResources: false,
    sanitizeOps: false,
});