var jwt = require('jsonwebtoken');
var fs = require('fs');


// verify an existing JWT
var existingToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE2MTU3NDg5ODksImV4cCI6MTYxNTc0OTEwOSwic3ViIjoiMSJ9.H' +
  'kszlpDRrkWVLWYRXH6roFuXhQ59hwyoRNJzZ3XY_9JMYBgixBwsUApsKe0lEV_mnD_HOtcORyqvpw9lp_TELfgULDnXvGxelcBI6LXwVtzegxQQPPsIYgVJN0xnZI_l8v56' +
  'l85Xt713tOzX2nuL_WUuqsXGMTOjzRdSBeMEXD-AFK531KEA1T9j0x7OHvaTgtLD6Gk1orLv1ci7UhfsS4IPZI3U36y1j-73bcGqwN_J6KU_FJENOttXs_3nJJeMlTRLMPA' +
  'WrwoUwgBgFkh1ysKWokzn9joAPi9jQ8qx_tLWM4zrYo9MyW3RCxDqXwm0f0tiMLdUzgWODKWBEaziMw';

var publicKey = fs.readFileSync('./demos/JWT/public.key');


console.log("verifying");

const verify = jwt.verify(existingToken, publicKey);



console.log("Decoded JWT:", verify);
