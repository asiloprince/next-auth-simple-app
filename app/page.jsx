import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between ">
        <div>
          <h1 className="text-3xl font-bold underline text-center">
            Hello World
          </h1>

          <div className="max-w-lg mx-auto flex flex-col justify-center items-center gap-4 sm:flex-row md:mt-8 lg:mt-10">
            <Link
              className="group relative inline-flex border border-indigo-500 focus:outline-none w-full sm:w-auto"
              href="/login"
            >
              <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-indigo-600 ring-1 ring-indigo-500 ring-offset-1 ring-offset-indigo-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                Get Started
              </span>
            </Link>
            <Link
              className="group relative inline-flex border border-indigo-600 focus:outline-none w-full sm:w-auto"
              href="register"
            >
              <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-indigo-600 text-center font-bold uppercase bg-white ring-1 ring-indigo-600 ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                Sign up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
