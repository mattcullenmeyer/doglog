import { useState } from 'react';
import { Home } from './home';
import { AddRep } from './add-rep';

export type Page = 'home' | 'add-rep' | 'add-misc';

export const Pages = () => {
  const [page, setPage] = useState<Page>('home');
  const [goal, setGoal] = useState(30);

  const onChangePage = (newPage: Page) => {
    setPage(newPage);
  };

  const onUpdateGoal = (newGoal: number) => setGoal(newGoal);

  switch (page) {
    case 'home':
      return (
        <Home
          onChangePage={onChangePage}
          onUpdateGoal={onUpdateGoal}
          goal={goal}
        />
      );
    case 'add-rep':
      return <AddRep onChangePage={onChangePage} goal={goal} />;
    case 'add-misc':
      return <></>;
  }
};
