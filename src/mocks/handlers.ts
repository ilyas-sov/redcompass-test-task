import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3000/users", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: "111", name: "Name One" },
        { id: "222", name: "Name Two" },
        { id: "333", name: "Name Three" },
      ])
    );
  }),
];
