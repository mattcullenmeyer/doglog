import React from 'react';
import { HelpText } from '@twilio-paste/core/help-text';
import { Box } from '@twilio-paste/core/box';
import { Button } from '@twilio-paste/core/button';
import { SuccessIcon } from '@twilio-paste/icons/esm/SuccessIcon';
import { ErrorIcon } from '@twilio-paste/icons/esm/ErrorIcon';
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

const EventRow = ({ event }: { event: Event }) => (
  <Box
    display="flex"
    justifyContent="space-between"
    paddingY="space40"
    borderTopColor="colorBorderWeaker"
    borderTopWidth="borderWidth10"
    borderTopStyle="solid"
  >
    <Avatar size="sizeIcon30" name="Matt Cullen-Meyer" />
    <Text as="p" fontSize="fontSize30">
      {event.type === 'rep' ? 'Training rep' : 'Misc'}
    </Text>
    <Text as="p" fontSize="fontSize30">
      {event.duration}
    </Text>
    {event.success ? (
      <SuccessIcon
        decorative={false}
        title="Meets goal"
        size="sizeIcon30"
        color="colorTextIconSuccess"
      />
    ) : (
      <ErrorIcon
        decorative={false}
        title="Does not meet goal"
        size="sizeIcon30"
        color="colorTextError"
      />
    )}
  </Box>
);

interface HomeProps {
  onChangePage: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ onChangePage }) => {
  const {
    data: eventsData,
    // error,
    // isLoading
  } = useGetDaysEventsQuery({
    day: '10/18/2024',
  });

  if (!eventsData || !eventsData.events) {
    return null;
  }

  return (
    <Layout title="Home" onChangePage={onChangePage}>
      <Box display="flex" flexDirection="column" rowGap="space70" flexGrow={1}>
        <Goal />

        <Alert variant="neutral">
          <strong>2 hours since last rep</strong>
        </Alert>

        <Card padding="space0">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box paddingX="space40" paddingTop="space40">
              <Heading as="h3" variant="heading50">
                Event log
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
                  3
                </Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <HelpText marginTop="space0">Total reps</HelpText>
                <Text
                  as="p"
                  fontSize="fontSize40"
                  fontWeight="fontWeightSemibold"
                >
                  3
                </Text>
              </Box>

              <Box display="flex" flexDirection="column" alignItems="center">
                <HelpText marginTop="space0">Avg time</HelpText>
                <Text
                  as="p"
                  fontSize="fontSize40"
                  fontWeight="fontWeightSemibold"
                >
                  00:30
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
