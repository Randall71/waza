import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "~/hooks/useStorageState";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (token: string) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  console.log(value.session, "SESSION IN USESESSION HOOK");

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  console.log(session, "SESSION IN SESSION PROVIDER");

  return (
    <AuthContext.Provider
      value={{
        signIn: (token: string) => {
          // Perform sign-in logic here
          setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
