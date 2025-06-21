import React from 'react'
import { LoaderPinwheel } from 'lucide-react'
// This component is used to show a loading spinner while the page is loading
// It uses the LoaderPinwheel icon from lucide-react and applies a spinning animation to it
const PageLoader = () => {
  return (
      <div className="min-h-screen flex justify-center items-center">
    <LoaderPinwheel className="size-8 animate-spin" />
  </div> )
}

export default PageLoader