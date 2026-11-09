import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'우리 언제 만나?',description:'친구들과 가능한 날을 모아 함께 만나는 날을 찾아요.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}</body></html>;}
