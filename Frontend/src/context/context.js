import { createContext } from 'react';

export const Context = createContext({});

export const ContextProvider = Context.Provider;

export const useContext = () => {
  return useContext(Context);
};
