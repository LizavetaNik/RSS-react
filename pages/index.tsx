import React, { useState } from 'react';
import Head from "next/head";
import Search from "./components/Search/Search";

import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

interface HomeProps {
  searchQuery: string;
}

export default function Home({ searchQuery }: HomeProps) {
  const router = useRouter();

  const handleSearchSubmit = (query: string) => {
    router.push(`/?search=${query}`);
  };

  return (
    <>
      <Head>
        <title>Vention Next.js Showcase</title>
        <meta name="description" content="Learn more about Next.js." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Search onSearchSubmit={handleSearchSubmit}></Search>

      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchQuery = context.query.search as string || '';

  return {
    props: { searchQuery },
  };
}
