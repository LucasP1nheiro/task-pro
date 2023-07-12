'use client'

import { getCurrentDateTime } from '@/lib/getCurrentDateTime';
import React, { useState, useEffect } from 'react';

function DateTime() {
  const [currentDateTime, setCurrentDateTime] = useState<string>(getCurrentDateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 60000); 

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='space-y-2'>
        <h1 className='text-secondary font-bold text-2xl'>Today</h1>
        <h1 className='text-tertiary'>{currentDateTime}</h1>
    </div>
  );
}

export default DateTime;