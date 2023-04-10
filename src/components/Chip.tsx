import { ComponentProps } from 'react';
import { XStack, styled } from 'tamagui';

type ChipProps = {
  selected?: true;
  onClose?: () => void;
} & ComponentProps<typeof BaseChip>;
export default function Chip({
  onClose,
  children,
  ...props
}: ChipProps) {
  return (
    <BaseChip {...props}>
      {children}
      {onClose && <XStack onClick={onClose}></XStack>}
    </BaseChip>
  );
}

const BaseChip = styled(XStack, {
  borderRadius: 10,
});
