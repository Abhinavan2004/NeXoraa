import React from 'react'
import { LoaderPinwheel } from 'lucide-react'
// This component is used to show a loading spinner while the page is loading
// It uses the LoaderPinwheel icon from lucide-react and applies a spinning animation to it
const PageLoader = () => {
  return (
    <LoaderPinwheel className="animate-spin size-10 text-primary" />
  )
}

export default PageLoader