import { createContext, useState } from "react";
type Mode = "Light" | "Dark";

interface AppContext {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export const Context = createContext<AppContext>({
  mode: "Light",
  setMode: () => {},
});

export const AppContextProvider = (props: any) => {
  const [mode, setMode] = useState<Mode>("Light");

  return <Context.Provider value={{ mode, setMode }} {...props} />;
};
