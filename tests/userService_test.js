import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import * as userService from "../services/userService.js"
import { assertNotEquals, assertEquals, assertExists, assertObjectMatch } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import { bcrypt } from "../deps.js";

Deno.test({
    name: "Testing adding user",
    async fn() {
        const generateRandomEmail = function(){
            return Math.random().toString(20).substr(2, 6) + "@mail.com"
        }
        const email = generateRandomEmail()
        
        await userService.addUser(email,await bcrypt.hash("password"))
        const user = (await userService.findUserByEmail(email))[0]
        assertEquals(user.email,email)
    },
    sanitizeResources: false,
    sanitizeOps: false,
});