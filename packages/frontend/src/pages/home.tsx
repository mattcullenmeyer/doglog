import React from 'react';
import { HelpText } from '@twilio-paste/core/help-text';
import { Box } from '@twilio-paste/core/box';
import { Button } from '@twilio-paste/core/button';
import { SuccessIcon } from '@twilio-paste/icons/esm/SuccessIcon';
import { WarningIcon } from '@twilio-paste/icons/esm/WarningIcon';
import { PlusIcon } from '@twilio-paste/icons/esm/PlusIcon';
import { Alert } from '@twilio-paste/core/alert';
import { Card } from '@twilio-paste/core/card';
import { Text } from '@twilio-paste/core/text';
import { Avatar } from '@twilio-paste/core/avatar';
import { Heading } from '@twilio-paste/core/heading';
import { Layout } from '../components/layout';
import { useGetDaysEventsQuery } from '../store/api';
import { Event } from '../store/types';
import { Goal } from '../components/goal';
import { Page } from '.';
import { getTime } from '../utils/get-time';

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

const EventRow = ({ event }: { event: Event }) => (
  <Box
    display="flex"
    justifyContent="space-between"
    paddingY="space40"
    borderTopColor="colorBorderWeaker"
    borderTopWidth="borderWidth10"
    borderTopStyle="solid"
  >
    <Avatar
      size="sizeIcon30"
      name={event.user}
      color={event.user === 'O' ? 'decorative40' : 'decorative20'}
    />
    <Text as="p" fontSize="fontSize30">
      {event.type === 'rep' ? 'Training rep' : 'Misc'}
    </Text>
    <Text as="p" fontSize="fontSize30">
      {event.start}
    </Text>
    <Text as="p" fontSize="fontSize30">
      {getTime(event.duration)}
    </Text>
    {event.success ? (
      <SuccessIcon
        decorative={false}
        title="Meets goal"
        size="sizeIcon30"
        color="colorTextIconSuccess"
      />
    ) : (
      <WarningIcon
        decorative={false}
        title="Does not meet goal"
        size="sizeIcon30"
        color="colorTextIconWarning"
      />
    )}
  </Box>
);

interface HomeProps {
  goal: number;
  onUpdateGoal: (goal: number) => void;
  onChangePage: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ goal, onChangePage }) => {
  const {
    data: eventsData,
    // error,
    // isLoading
  } = useGetDaysEventsQuery(
    {
      day: new Date().toLocaleString().split(',')[0],
    },
    { refetchOnMountOrArgChange: true }
  );

  if (!eventsData || !eventsData.events) {
    return null;
  }

  return (
    <Layout title="Home" onChangePage={onChangePage}>
      <Box display="flex" flexDirection="column" rowGap="space70" flexGrow={1}>
        <Goal goal={goal} />

        <Alert variant="neutral">
          <strong>{getTimeSinceLastRep(eventsData.last_rep)}</strong>
        </Alert>

        <Card padding="space0">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box paddingX="space40" paddingTop="space40">
              <Heading as="h3" variant="heading50">
                Today's events
              </Heading>
              {eventsData.events.map((event) => (
                <EventRow event={event} />
              ))}
            </Box>

            <Box
              display="flex"
              justifyContent="space-around"
              borderTopColor="colorBorderWeaker"
              borderTopWidth="borderWidth10"
              borderTopStyle="solid"
              padding="space30"
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <HelpText marginTop="space0">Goals met</HelpText>
                <Text
                  as="p"
                  fontSize="fontSize40"
                  fontWeight="fontWeightSemibold"
                >
                  {eventsData.stats.success_count}
                </Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <HelpText marginTop="space0">Total reps</HelpText>
                <Text
                  as="p"
                  fontSize="fontSize40"
                  fontWeight="fontWeightSemibold"
                >
                  {eventsData.stats.rep_count}
                </Text>
              </Box>

              <Box display="flex" flexDirection="column" alignItems="center">
                <HelpText marginTop="space0">Avg time</HelpText>
                <Text
                  as="p"
                  fontSize="fontSize40"
                  fontWeight="fontWeightSemibold"
                >
                  {getTime(eventsData.stats.average_duration)}
                </Text>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>

      <Box display="flex" justifyContent="space-between" columnGap="space50">
        <Button variant="primary" fullWidth>
          <PlusIcon decorative onClick={() => onChangePage('add-misc')} />
          Add event
        </Button>

        <Button
          variant="primary"
          fullWidth
          onClick={() => onChangePage('add-rep')}
        >
          <PlusIcon decorative />
          Add rep
        </Button>
      </Box>
    </Layout>
  );
};
