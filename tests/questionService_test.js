import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import * as questionsService from "../services/questionsService.js"
import { assertNotEquals, assertEquals, assertExists, assertObjectMatch } from "https://deno.land/std@0.113.0/testing/asserts.ts";

Deno.test({
    name: "Testing adding question",
    async fn() {
//Make sure to have a user with id = 1
        await questionsService.addQuestion(1,"automated test","please")
        const result = (await questionsService.getAllQuestionsForUser(1))
        let found
        result.forEach( el => {
            if(el.user_id === 1 && el.title === "automated test" && el.question_text === "please"){
                found = el
            }
        })
        assertExists(found)
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
//works
Deno.test({
    name: "Testing getting question by id",
    async fn() {
//Make sure to have a user with id = 1
        await questionsService.addQuestion(1,"automated test 2","please")
        const result = (await questionsService.getAllQuestionsForUser(1))
        let found
        result.forEach( el => {
            if(el.user_id === 1 && el.title === "automated test 2" && el.question_text === "please"){
                found = el
            }
        })
        assertExists(found)
        let res = (await(questionsService.getQuestionById(found.id)))[0]
        assertObjectMatch(found,res)
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
//works
Deno.test({
    name: "Testing getting random question",
    async fn() {
//Make sure to have a user with id = 1
        await questionsService.addQuestion(1,"automated test 3","please")
        const result = (await questionsService.getAllQuestionsForUser(1))
        assertExists(questionsService.getRandomQuestion())
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
//works
Deno.test({
    name: "Testing deleting question by id",
    async fn() {
//Make sure to have a user with id = 1
        await questionsService.addQuestion(1,"automated test 4","please")
        const result = (await questionsService.getAllQuestionsForUser(1))
        let found
        result.forEach( el => {
            if(el.user_id === 1 && el.title === "automated test 4" && el.question_text === "please"){
                found = el
            }
        })
        assertExists(found)
        await questionsService.deleteQuestionById(found.id)
        let newFound
        const newResult = (await questionsService.getAllQuestionsForUser(1))
        newResult.forEach( el => {
            if(el.user_id === 1 && el.title === "automated test 4" && el.question_text === "please"){
                newFound = el
            }
        })
        assertNotEquals(found,newFound)
    },
    sanitizeResources: false,
    sanitizeOps: false,
});