"use client";
import { signIn, signOut, useSession } from "next-auth/react";

type Props = {};

const Home = (props: Props) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} {session.user.role.name}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()} type="button">
        Sign in
      </button>
    </>
  );
};

export default Home;
