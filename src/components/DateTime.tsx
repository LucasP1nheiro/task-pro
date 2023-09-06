'use client'

import { getCurrentDateTime } from '@/lib/getCurrentDateTime'
import React, { useState, useEffect } from 'react'

function DateTime() {
  const [currentDateTime, setCurrentDateTime] = useState<string>(
    getCurrentDateTime(),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime())
    }, 60000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-5xl font-bold text-secondary">Today</h1>
      <h1 className="text-xl text-tertiary">{currentDateTime}</h1>
    </div>
  )
}

export default DateTime
