import React from 'react'
import { ClipLoader } from 'react-spinners'

const LoadingSpinner = () => {
  return (
    <>
        <ClipLoader className="fill-black dark:fill-white" size={16}/>
    </>
  )
}

export default LoadingSpinner