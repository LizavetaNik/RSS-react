import React, { useEffect, useRef } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Result from '../src/components/Result/Result';
import Search from "../src/components/Search/Search";
import { CharacterItem } from '@/src/data/users.data';
import CharacterDetails from '@/src/components/CharacterDetails/CharacterDetails';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchQuery = context.query.search as string || '';
  const pageNumber = context.query.page || 1;
  const quantity = context.query.quantity || 20;
  const characterId = context.query.characterId || '';

  try {
    const nameQuery = searchQuery ? `&name=${searchQuery}` : '';
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${pageNumber}${nameQuery}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();

    const totalPages = data.info.pages;
    const totalCharacters = data.info.count;
    const charactersArr: CharacterItem[] = data.results;

    return {
      props: { searchQuery, pageNumber, quantity, characterId, totalPages, totalCharacters, charactersArr },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: '/error-page',
        permanent: false,
      },
    };
  }
}

interface HomeProps {
  searchQuery: string;
  pageNumber: number;
  quantity: number;
  characterId: string;
  totalPages: string; 
  totalCharacters: string;
  charactersArr: CharacterItem[];
}

export default function Home({ searchQuery, pageNumber, quantity, characterId, totalPages, totalCharacters, charactersArr }: HomeProps) {
  const router = useRouter();
  const forceUpdateKey = useRef(Date.now());
  const characterDataRef = useRef(null);

  const handleSearchSubmit = (query: string) => {
    router.push(`/?search=${query}`);
  };

  const handleMoreClick = (selectedId: string) => {
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.searchParams;
    searchParams.set('characterId', selectedId);
    const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`;
    router.push(newUrl);
  };

  const handleCharacterClose = () => {
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.searchParams;
    searchParams.delete('characterId');
    const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`;
    router.push(newUrl);
  };

  useEffect(() => {
    async function fetchCharacterData() {
      try {
        if (characterId) {
          const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch character data');
          }
          const data = await response.json();
          characterDataRef.current = data;
          forceUpdateKey.current = Date.now();
        } else {
          characterDataRef.current = null;
        }
      } catch (error) {
        router.push('/error-page');
      }
    }
  
    fetchCharacterData();
  }, [characterId, router]);
  
  return (
    <>
      <Head>
        <title>Vention Next.js Showcase</title>
        <meta name="description" content="Learn more about Next.js." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Search onSearchSubmit={handleSearchSubmit}></Search>
        <div className="grid-container">
          <Result 
          searchQuery={searchQuery}
          pageNumber={pageNumber} 
          quantity={quantity} 
          characterId={characterId}
          totalPages={totalPages}
          totalCharacters={totalCharacters}
          charactersArr={charactersArr}
          onPageChange={(newPageNumber) => {
            const query = { ...router.query, page: newPageNumber };
            router.push({ pathname: router.pathname, query });
          }}
          onQuantityChange={(newQuantity) => {
            const query = { ...router.query, quantity: newQuantity, page: 1 };
            router.push({ pathname: router.pathname, query });
          }}
          onCharacterSelect={handleMoreClick}
        />
        {characterId && characterDataRef.current && (
        <CharacterDetails 
          key={forceUpdateKey.current}
          dataCharacter={characterDataRef.current} 
          characterId={characterId} 
          onClose={handleCharacterClose} 
        />
      )}
        </div>
        
      </main>
    </>
  );
}
