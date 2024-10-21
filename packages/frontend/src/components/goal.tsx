import { Button } from '@twilio-paste/core/button';
import { Text } from '@twilio-paste/core/text';
import { Box } from '@twilio-paste/core/box';

export const Goal = () => {
  return (
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
  );
};
