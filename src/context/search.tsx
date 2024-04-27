import { ReactNode, createContext, useState } from 'react';

export const MyContext = createContext<any>("");

function SearchContext({ children }: {children: ReactNode}) {
  const [text, setText] = useState<string>("");

  return (
    <div>
      <MyContext.Provider value={{ text, setText }}>
        {children}
      </MyContext.Provider>
    </div>
  );
}

export default SearchContext;