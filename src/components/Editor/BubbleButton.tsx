import React, { ReactNode } from 'react'

import { Button, ButtonProps } from '../ui/button'

interface BubbleButtonProps extends ButtonProps {
  children?: ReactNode
}

const BubbleButton = ({ children, ...props }: BubbleButtonProps) => {
  return (
    <Button
      variant={'secondary'}
      size="sm"
      className="border-y p-2  data-[active=true]:bg-primary data-[active=true]:text-secondary"
      {...props}
    >
      {children}
    </Button>
  )
}

export default BubbleButton
