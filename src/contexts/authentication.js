import { createContext, useContext, useState } from "react";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
   const [idToken, setIdToken] = useState(null);
   const [userInfo, setUserInfo] = useState(null);
   const [authenticated, setAuthenticated] = useState(false);

   return (
      <AuthenticationContext.Provider
         value={{
            idToken,
            setIdToken,
            authenticated,
            setAuthenticated,
            userInfo,
            setUserInfo,
         }}
      >
         {children}
      </AuthenticationContext.Provider>
   );
};

export const useAuthentication = () => useContext(AuthenticationContext);