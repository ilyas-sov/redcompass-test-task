import { render, screen } from "@testing-library/react";
import Users from "./Users";
import { Provider } from "react-redux";
import store from "../store/store";

describe("Users", () => {
  const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => <Provider store={store}>{children}</Provider>;

  test("renders", () => {
    render(<Users />, {
      wrapper: ReduxProvider,
    });

    const header = screen.getByRole("heading", { name: /users/i });

    expect(header).toBeInTheDocument();
  });

  test("fetch users from /users", async () => {
    render(<Users />, {
      wrapper: ReduxProvider,
    });

    const users = await screen.findAllByRole("listitem");

    expect(users).toHaveLength(3);
  });
});
