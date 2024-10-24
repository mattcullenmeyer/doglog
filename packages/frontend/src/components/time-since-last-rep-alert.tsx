import { Alert } from '@twilio-paste/core/alert';
import { useEffect, useState } from 'react';

const getTimeSinceLastRep = (lastRep: number) => {
  if (lastRep === 0) {
    return 'Get started by adding a rep';
  }

  const now = new Date().getTime();
  const diff = now - lastRep;
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (days >= 1) {
    return `${Math.floor(days)} days since last rep`;
  }

  if (hours >= 1) {
    return `${Math.floor(hours)} hours since last rep`;
  }

  return `${Math.floor(minutes)} minutes since last rep`;
};

export const TimeSinceLastRepAlert = ({ lastRep }: { lastRep: number }) => {
  const [timeSinceLastRep, setTimeSinceLastRep] = useState(() =>
    getTimeSinceLastRep(lastRep)
  );

  useEffect(() => {
    // update every minute
    const interval = setInterval(() => {
      setTimeSinceLastRep(getTimeSinceLastRep(lastRep));
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [lastRep]);

  return (
    <Alert variant="neutral">
      <strong>{timeSinceLastRep}</strong>
    </Alert>
  );
};
