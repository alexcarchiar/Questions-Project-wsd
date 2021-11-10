import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import * as optionsService from "../services/optionsService.js"
import { assertNotEquals, assertEquals, assertExists, assertObjectMatch } from "https://deno.land/std@0.113.0/testing/asserts.ts";

Deno.test({
    name: "Testing adding option",
    async fn() {
//Make sure to have a question with id = 15
        await optionsService.addOption(15,"automated test",true)
        const result = (await optionsService.getOptions(15))
        let found
        result.forEach( el => {
            if(el.question_id === 15 && el.option_text === "automated test"){
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
    name: "Testing deleting option by Id",
    async fn() {
//Make sure to have a question with id = 15
        await optionsService.addOption(15,"automated test",true)
        const result = (await optionsService.getOptions(15))
        let found
        result.forEach( el => {
            if(el.question_id === 15 && el.option_text === "automated test"){
                found = el
            }
        })
        assertExists(found)
        await optionsService.deleteOption(found.id)
        const newResult = (await optionsService.getOptionById())
        let array = [found]
        assertNotEquals(array,newResult)
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
//works
Deno.test({
    name: "Testing getting option by Id",
    async fn() {
//Make sure to have a question with id = 15
        await optionsService.addOption(15,"automated test",true)
        const result = (await optionsService.getOptions(15))
        let found
        result.forEach( el => {
            if(el.question_id === 15 && el.option_text === "automated test"){
                found = el
            }
        })
        assertExists(found)
        const newResult = (await optionsService.getOptionById())
        assertNotEquals(found,newResult[0])
    },
    sanitizeResources: false,
    sanitizeOps: false,
});