import React from 'react';

import { Container } from './style';

type ButtonProps = {
  className?: string;
  children: React.ReactNode[] | React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, onClick }, ref) => {
    return (
      <Container ref={ref} className={className} onClick={onClick}>
        {children}
      </Container>
    );
  }
);

export default Button;
