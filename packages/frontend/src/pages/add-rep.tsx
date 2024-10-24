import React, { useEffect, useState } from 'react';
import { Box } from '@twilio-paste/core/box';
import { Layout } from '../components/layout';
import { Goal } from '../components/goal';
import { Page } from '.';
import { Card } from '@twilio-paste/core/card';
import { Button } from '@twilio-paste/core/button';
import { Text } from '@twilio-paste/core/text';
import { ResetIcon } from '@twilio-paste/icons/esm/ResetIcon';
import { PlayIcon } from '@twilio-paste/icons/esm/PlayIcon';
import { PauseIcon } from '@twilio-paste/icons/esm/PauseIcon';
import { getTime } from '../utils/get-time';
import { Heading } from '@twilio-paste/core/heading';
import {
  FormPill,
  FormPillGroup,
  useFormPillState,
} from '@twilio-paste/core/form-pill-group';
import { TextArea } from '@twilio-paste/core/textarea';
import { useAddRepEventMutation } from '../store/api';

interface AddRepProps {
  goal: number;
  onChangePage: (page: Page) => void;
}

const behaviors = ['Settled quickly', 'Stood by door', 'Barked a lot'];

export const AddRep: React.FC<AddRepProps> = ({ goal, onChangePage }) => {
  const pillState = useFormPillState();
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedBehaviors, setSelectedBehaviors] = useState<Set<string>>(
    new Set([])
  );
  const [comment, setComment] = useState('');
  const [start, setStart] = useState<Date>();
  const [isAddRepEventLoading, setIsAddRepEventLoading] = useState(false);

  const isSaveDisabled = seconds === 0 || isTimerRunning;

  useEffect(() => {
    if (!isTimerRunning) return;
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  const [addRepEvent] = useAddRepEventMutation();

  const onAddRepEvent = async () => {
    setIsAddRepEventLoading(true);
    const date = new Date();

    if (!start) {
      console.error('Start time is required');
      return;
    }

    try {
      await addRepEvent({
        start_utc: start.getTime(),
        day: date.toLocaleString().split(',')[0], // eg 10/18/2024
        start: start.toLocaleString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }), // eg 1:13 PM
        duration: seconds,
        goal,
        success: seconds >= goal,
        comment,
        behavior: Array.from(selectedBehaviors),
        user: localStorage.getItem('user') || 'A',
      });
      onChangePage('home');
    } catch (error) {
      console.error('Failed to add rep event', error);
    } finally {
      setIsAddRepEventLoading(false);
    }
  };

  return (
    <Layout
      title="Training rep"
      onChangePage={onChangePage}
      onClickBack={() => onChangePage('home')}
    >
      <Box display="flex" flexDirection="column" rowGap="space70" flexGrow={1}>
        <Goal goal={goal} />

        <Card padding="space40">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Heading as="h3" variant="heading50">
              Behaviors
            </Heading>
            <Button variant="link">Skip</Button>
          </Box>
          <FormPillGroup {...pillState} aria-label="behaviors" size="large">
            {behaviors.map((behavior) => (
              <FormPill
                key={behavior}
                {...pillState}
                selected={selectedBehaviors.has(behavior)}
                onSelect={() => {
                  const newSelectedBehaviors = new Set(selectedBehaviors);
                  if (newSelectedBehaviors.has(behavior)) {
                    newSelectedBehaviors.delete(behavior);
                  } else {
                    newSelectedBehaviors.add(behavior);
                  }
                  setSelectedBehaviors(newSelectedBehaviors);
                }}
              >
                {behavior}
              </FormPill>
            ))}
          </FormPillGroup>
        </Card>

        <Card padding="space40">
          <Heading as="h3" variant="heading50">
            Comments
          </Heading>

          <TextArea
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
          />
        </Card>
      </Box>

      <Box display="flex" flexDirection="column" rowGap="space70">
        <Card padding="space50">
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            alignItems="center"
          >
            <Box>
              {!isTimerRunning && seconds > 0 && (
                <Button
                  variant="secondary"
                  size="circle"
                  onClick={() => {
                    setSeconds(0);
                    setStart(undefined);
                  }}
                >
                  <ResetIcon decorative size="sizeIcon50" />
                </Button>
              )}
            </Box>

            <Box display="flex" justifyContent="center">
              <Text
                as="p"
                fontSize="fontSize80"
                fontWeight="fontWeightSemibold"
              >
                {getTime(seconds)}
              </Text>
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="secondary"
                size="circle"
                pressed={!isTimerRunning}
                onClick={() => {
                  if (!isTimerRunning) {
                    setStart(new Date());
                  }
                  setIsTimerRunning(!isTimerRunning);
                }}
              >
                {isTimerRunning ? (
                  <PauseIcon decorative size="sizeIcon50" />
                ) : (
                  <PlayIcon decorative size="sizeIcon50" />
                )}
              </Button>
            </Box>
          </Box>
        </Card>

        <Button
          variant="primary"
          onClick={onAddRepEvent}
          disabled={isSaveDisabled}
          loading={isAddRepEventLoading}
        >
          Save
        </Button>
      </Box>
    </Layout>
  );
};
