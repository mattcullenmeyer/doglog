import { HelpText } from '@twilio-paste/core/help-text';
import { Box } from '@twilio-paste/core/box';
import { Button } from '@twilio-paste/core/button';
import { ProductHomeIcon } from '@twilio-paste/icons/esm/ProductHomeIcon';
import { UserIcon } from '@twilio-paste/icons/esm/UserIcon';
import { CalendarIcon } from '@twilio-paste/icons/esm/CalendarIcon';
import { Text } from '@twilio-paste/core/text';
import React from 'react';
import { Page } from '../pages';
import { ArrowBackIcon } from '@twilio-paste/icons/esm/ArrowBackIcon';

interface LayoutProps {
  title: string;
  onChangePage: (page: Page) => void;
  onClickBack?: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  title,
  onChangePage,
  onClickBack,
  children,
}) => {
  return (
    <Box display="flex" flexDirection="column" height="100dvh">
      <Box
        display="flex"
        flexDirection="column"
        backgroundColor="colorBackgroundPrimary"
        flexGrow={1}
        justifyContent="space-between"
      >
        <Box
          display="grid"
          gridTemplateColumns="1fr 3fr 1fr"
          alignItems="center"
          paddingY="space30"
          paddingX="space50"
        >
          <Box display="flex">
            {onClickBack && (
              <Button
                size="reset"
                variant="reset"
                onClick={onClickBack}
                color="colorTextInverse"
              >
                <ArrowBackIcon decorative size="sizeIcon70" />
              </Button>
            )}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={32} // set height same as button icon size
          >
            <Text
              as="h1"
              fontSize="fontSize60"
              fontWeight="fontWeightNormal"
              color="colorTextInverse"
            >
              {title}
            </Text>
          </Box>
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
          {children}
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-around"
        borderTopColor="colorBorderWeaker"
        borderTopWidth="borderWidth10"
        borderTopStyle="solid"
        paddingY="space40"
      >
        <Button
          size="reset"
          variant="reset"
          onClick={() => onChangePage('home')}
        >
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
