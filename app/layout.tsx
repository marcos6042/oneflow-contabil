// app/layout.tsx - Layout padrão para o OneFlow
import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'OneFlow - Lançamentos Contábeis',
  description: 'Automação e controle de lançamentos contábeis com inteligência e dashboards.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main className="max-w-7xl mx-auto p-4 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
