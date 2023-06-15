import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";
import { server } from "./__mocks__/server";
import "@testing-library/jest-dom";
beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
