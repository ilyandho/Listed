import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRP" });
  const subs = trpc.youtube.subscriptions.useQuery();
  console.log(subs.data);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Create <span className="text-purple-300">T3</span> App
        </h1>
        <p className="text-2xl text-gray-700">My channels </p>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {subs.data?.map((sub) => {
            console.log(sub?.snippet.thumbnails.high.url);
            return (
              <TechnologyCard
                key={sub.id}
                name={sub?.snippet.title}
                description={sub?.snippet.description}
                documentation={`https://www.youtube.com/channel/${sub?.snippet.resourceId.channelId}`}
                img={sub?.snippet.thumbnails.high.url}
              />
            );
          })}
        </div>
        <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>
        <AuthShowcase />
      </main>

      <div className="carousel-center carousel rounded-box max-w-md space-x-4 bg-neutral p-4">
        <div className="carousel-item">
          <img
            src="https://placeimg.com/250/180/arch"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://placeimg.com/250/180/arch"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://placeimg.com/250/180/arch"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://placeimg.com/250/180/arch"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://placeimg.com/250/180/arch"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://placeimg.com/250/180/arch"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://placeimg.com/250/180/arch"
            className="rounded-box"
          />
        </div>
      </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl text-blue-500">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
      {secretMessage && (
        <p className="text-2xl text-blue-500">{secretMessage}</p>
      )}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
  img: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
  img,
}: TechnologyCardProps) => {
  return (
    <div className="group relative">
      <div className="min-h-80 aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 lg:h-80">
        <img
          src={img}
          alt={`${name}'s thumbnail`}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className=" absolute bottom-0 left-0 mt-4 flex h-20 w-full justify-between bg-gradient-to-t from-black via-gray-700 to-transparent">
        <div className="">
          <h3 className="pl-4 text-xl font-medium text-gray-200 ">
            <a href={documentation}>
              <span aria-hidden="true" className=" inset-0 " />
              {name}
            </a>
          </h3>
          {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p> */}
        </div>
      </div>
    </div>
  );
};
