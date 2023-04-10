import { FunctionComponent } from 'react';
import { Paragraph, XStack } from 'tamagui';

type TabProps = {
  color: string;
  textColor: string;
  title: string;
  onClick: () => void;
};
export const Tab: FunctionComponent<TabProps> = (props) => {
  return (
    <XStack
      backgroundColor={props.color}
      borderTopStartRadius={10}
      borderTopEndRadius={10}
      minWidth={120}
      justifyContent="center"
      onClick={props.onClick}>
      <Paragraph fontSize={12} color={props.textColor}>
        {props.title}
      </Paragraph>
    </XStack>
  );
};
