import { Button } from '@twilio-paste/core/button';
import { Text } from '@twilio-paste/core/text';
import { Box } from '@twilio-paste/core/box';
import React from 'react';
import { getTime } from '../utils/get-time';

interface GoalProps {
  goal: number;
}

export const Goal: React.FC<GoalProps> = ({ goal }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" alignItems="flex-end" columnGap="space20">
        <Text
          as="p"
          fontSize="fontSize110"
          letterSpacing="-3px"
          lineHeight="lineHeight80"
        >
          {getTime(goal)}
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
  );
};
