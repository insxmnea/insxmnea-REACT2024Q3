import { HomePage } from "src/pages/homepage";
import { Providers } from "./providers";
import { FC } from "react";

type Props = {
  children?: React.ReactNode;
};

const App: FC<Props> = ({ children }) => {
  return (
    <Providers>
      <HomePage children={children} />
    </Providers>
  );
};

export default App;
