import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    console.log(`Session info: ${JSON.stringify(session)}`);
    return (
      <>
      <span className='my-auto'>Signed in as {session.user?.email}</span><br />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className='btn btn-blue my-auto' onClick={() => signIn()}>Sign In</button>
    </>
  )
}