import { ComponentProps, ReactNode } from 'react';
import { Paragraph, Button as TamaButton, styled } from 'tamagui';

type ButtonProps = {
  text?: string;
  loading?: true;
  variant?: 'contained' | 'outlined';
  iconLeft?: () => ReactNode;
  iconRight?: () => ReactNode;
} & ComponentProps<typeof BaseButton>;

export default function Button({
  iconLeft,
  text,
  children,
  iconRight,
  ...props
}: ButtonProps) {
  return (
    <BaseButton {...props}>
      {iconLeft ? iconLeft() : null}
      {text && <Paragraph>{text}</Paragraph>}
      {children}
      {iconRight ? iconRight() : null}
    </BaseButton>
  );
}

const BaseButton = styled(TamaButton, {
  variants: {
    variant: {
      contained: {},
      outlined: {},
    },
  },
});
