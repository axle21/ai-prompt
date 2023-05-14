'use client';
import { SessionProvider } from "next-auth/react";

type Props = {
  session:any,
  children: React.ReactNode
}


const Provider = ({ children, session }:Props) => (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
)

export default Provider
