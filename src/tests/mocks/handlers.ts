import {
  rest,
  type RestHandler,
  type MockedRequest,
  type DefaultBodyType,
} from "msw";

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get("https://api.example.com/data", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
      ])
    );
  }),
];
