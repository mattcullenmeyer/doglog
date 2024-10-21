import { HelpText } from '@twilio-paste/core/help-text';
import { Box } from '@twilio-paste/core/box';
import { Button } from '@twilio-paste/core/button';
import { ProductHomeIcon } from '@twilio-paste/icons/esm/ProductHomeIcon';
import { SuccessIcon } from '@twilio-paste/icons/esm/SuccessIcon';
import { PlusIcon } from '@twilio-paste/icons/esm/PlusIcon';
import { UserIcon } from '@twilio-paste/icons/esm/UserIcon';
import { CalendarIcon } from '@twilio-paste/icons/esm/CalendarIcon';
import { Alert } from '@twilio-paste/core/alert';
import { Card } from '@twilio-paste/core/card';
import { Text } from '@twilio-paste/core/text';
import { Avatar } from '@twilio-paste/core/avatar';
import { Heading } from '@twilio-paste/core/heading';

const Event = () => (
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
      Training rep
    </Text>
    <Text as="p" fontSize="fontSize30">
      00:30
    </Text>
    <SuccessIcon
      decorative={false}
      title="Success"
      size="sizeIcon30"
      color="colorTextIconSuccess"
    />
  </Box>
);

export const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      // justifyContent="space-between"
      height="100dvh"
    >
      <Box
        display="flex"
        flexDirection="column"
        backgroundColor="colorBackgroundPrimary"
        flexGrow={1}
        justifyContent="space-between"
      >
        {/* <Box> */}
        <Box display="flex" justifyContent="center" paddingY="space40">
          <Text
            as="h1"
            fontSize="fontSize60"
            fontWeight="fontWeightNormal"
            color="colorTextInverse"
          >
            Home
          </Text>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          backgroundColor="colorBackground"
          padding="space50"
          paddingTop="space70"
          borderTopLeftRadius="borderRadius60"
          borderTopRightRadius="borderRadius60"
        >
          <Box
            display="flex"
            flexDirection="column"
            rowGap="space70"
            flexGrow={1}
          >
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
                <Text
                  as="p"
                  // letterSpacing="7px"
                  // color="colorTextWeak"
                  fontWeight="fontWeightSemibold"
                >
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
                  <Event />
                  <Event />
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-around"
                  borderTopColor="colorBorderWeaker"
                  borderTopWidth="borderWidth10"
                  borderTopStyle="solid"
                  padding="space30"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <HelpText marginTop="space0">Goals met</HelpText>
                    <Text
                      as="p"
                      fontSize="fontSize40"
                      fontWeight="fontWeightSemibold"
                    >
                      3
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <HelpText marginTop="space0">Total reps</HelpText>
                    <Text
                      as="p"
                      fontSize="fontSize40"
                      fontWeight="fontWeightSemibold"
                    >
                      3
                    </Text>
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
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
            {/* </Box> */}
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            columnGap="space50"
          >
            <Button variant="primary" fullWidth>
              <PlusIcon decorative />
              Add rep
            </Button>
            <Button variant="primary" fullWidth>
              <PlusIcon decorative />
              Add event
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-around"
        borderTopColor="colorBorderWeaker"
        borderTopWidth="borderWidth10"
        borderTopStyle="solid"
        paddingY="space40"
        // paddingX="space90"
      >
        <Button size="reset" variant="reset">
          <Box display="flex" flexDirection="column" alignItems="center">
            <ProductHomeIcon decorative size="sizeIcon70" />
            <HelpText marginTop="space0">Home</HelpText>
          </Box>
        </Button>

        <Button size="reset" variant="reset">
          <Box display="flex" flexDirection="column" alignItems="center">
            <CalendarIcon decorative size="sizeIcon70" />
            <HelpText marginTop="space0">History</HelpText>
          </Box>
        </Button>

        <Button size="reset" variant="reset">
          <Box display="flex" flexDirection="column" alignItems="center">
            <UserIcon decorative size="sizeIcon70" />
            <HelpText marginTop="space0">Profile</HelpText>
          </Box>
        </Button>
      </Box>
    </Box>
  );
};
