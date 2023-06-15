import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3000/shares/list", (req, res, ctx) => {
    return res(
      ctx.json({
        items:[{ id: 1, email: "test@test.com",user_id:1,
        user:{
          id:1,
          email:'test@test.com',
          token:'token'
        },
        url: "https://youtube.com" }],
        count:1
      })
    );
  }),
  rest.post("http://localhost:3000/auth/login", (req, res, ctx) => {
    console.log({req})
    return res(ctx.json({ id: 1, email: "test@test.com", token: "token" }));
  }),
  rest.post("http://localhost/api/auth/signout", (req, res, ctx) => {
    console.log({req})
    return res(ctx.json({}));
  }),
  rest.post("http://localhost/api/auth/_log", (req, res, ctx) => {
    console.log({req})
    return res(ctx.json({ }));
  }),
  rest.get("http://localhost/api/auth/csrf", (req, res, ctx) => {
    console.log({req})
    return res(ctx.json({ id: 1, csrf: "test@test.com", token: "token" }));
  }),
  rest.post("http://localhost/api/auth/session", (req, res, ctx) => {
    console.log({req})
    return res(ctx.json({ id: 1, email: "test@test.com", token: "token" }));
  }),
  
];


  

  
    
    
