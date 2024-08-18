import { FC } from "react";
import { Provider } from "react-redux";
import { setupStore } from "../store";

type Props = {
  readonly children: JSX.Element;
};

const store = setupStore();

export const Providers: FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
