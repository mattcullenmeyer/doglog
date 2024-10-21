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

interface AddRepProps {
  onChangePage: (page: Page) => void;
}

const behaviors = ['Settled quickly', 'Stood by door', 'Barked a lot'];

export const AddRep: React.FC<AddRepProps> = ({ onChangePage }) => {
  const pillState = useFormPillState();
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedBehaviors, setSelectedBehaviors] = useState<Set<string>>(
    new Set([])
  );

  useEffect(() => {
    if (!isTimerRunning) return;
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  return (
    <Layout
      title="Training rep"
      onChangePage={onChangePage}
      onClickBack={() => onChangePage('home')}
    >
      <Box display="flex" flexDirection="column" rowGap="space70" flexGrow={1}>
        <Goal />

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

          <TextArea />
        </Card>
      </Box>

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
                onClick={() => setSeconds(0)}
              >
                <ResetIcon decorative size="sizeIcon50" />
              </Button>
            )}
          </Box>

          <Box display="flex" justifyContent="center">
            <Text as="p" fontSize="fontSize80" fontWeight="fontWeightSemibold">
              {getTime(seconds)}
            </Text>
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="secondary"
              size="circle"
              pressed={!isTimerRunning}
              onClick={() => setIsTimerRunning(!isTimerRunning)}
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
    </Layout>
  );
};
