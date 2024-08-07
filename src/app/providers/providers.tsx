import { FC } from "react";
import { setupStore } from "../store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./theme-provider";

type Props = {
  readonly children: JSX.Element;
};

const store = setupStore();

export const Providers: FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};
