import { useState } from 'react';
import { Home } from './home';
import { AddRep } from './add-rep';

export type Page = 'home' | 'add-rep' | 'add-misc';

export const Pages = () => {
  const [page, setPage] = useState<Page>('home');

  const onChangePage = (newPage: Page) => {
    setPage(newPage);
  };

  switch (page) {
    case 'home':
      return <Home onChangePage={onChangePage} />;
    case 'add-rep':
      return <AddRep onChangePage={onChangePage} />;
    case 'add-misc':
      return <></>;
  }
};
