import Image from 'next/image';
import { Inter } from 'next/font/google';
import Header from '@/components/Header/Header';
import Body from '@/components/Body/Body';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className='px-[50px] pt-[50px]'>
      <Header />
      <Body />
    </main>
  );
}
