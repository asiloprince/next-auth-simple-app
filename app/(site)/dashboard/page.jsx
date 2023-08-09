"use client";
import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }
  return (
    <div className="text-center">
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1 className="text-bold">Dashboard</h1>
      <h2>Hi! {session?.user?.name} Welocome back!</h2>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};
export default Dashboard;
