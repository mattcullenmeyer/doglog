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

export const Home = () => {
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
    <Layout title="Home">
      <Box display="flex" flexDirection="column" rowGap="space70" flexGrow={1}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="flex-end" columnGap="space20">
            <Text
              as="p"
              fontSize="fontSize110"
              letterSpacing="-3px"
              lineHeight="lineHeight80"
            >
              00:30
            </Text>
            <Text as="p" fontWeight="fontWeightSemibold">
              Goal
            </Text>
          </Box>

          <Box display="flex" alignItems="flex-end">
            <Button variant="secondary" size="small">
              Edit goal
            </Button>
          </Box>
        </Box>

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
          <PlusIcon decorative />
          Add rep
        </Button>
        <Button variant="primary" fullWidth>
          <PlusIcon decorative />
          Add event
        </Button>
      </Box>
    </Layout>
  );
};
