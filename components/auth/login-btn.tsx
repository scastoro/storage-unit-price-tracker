import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    console.log(`Session info: ${JSON.stringify(session)}`);
    return (
      <>
      Signed in as {session.user?.name}<br />
      <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign In</button>
    </>
  )
}