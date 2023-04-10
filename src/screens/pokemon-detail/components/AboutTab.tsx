import { Rocket, Ruler } from '@tamagui/lucide-icons';
import { FunctionComponent } from 'react';
import { Paragraph, XStack } from 'tamagui';

type AboutProps = {
  color: string;
  about: {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: Array<string | undefined>;
  };
};
const AboutTab: FunctionComponent<AboutProps> = (props) => {
  return (
    <XStack
      paddingVertical={50}
      paddingHorizontal={50}
      width="100%"
      height="100%"
      justifyContent="space-between"
      alignItems="flex-start"
      backgroundColor={props.color}>
      <XStack alignItems="center">
        <Ruler size={40} color="white" />
        <Paragraph color="white">Height: {props.about.height / 10} m</Paragraph>
      </XStack>
      <XStack alignItems="center">
        <Rocket size={40} color="white" />
        <Paragraph color="white">
          Weight: {props.about.weight / 10} kg
        </Paragraph>
      </XStack>
    </XStack>
  );
};

export default AboutTab;
