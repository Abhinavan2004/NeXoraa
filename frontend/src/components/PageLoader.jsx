import React from 'react'
import { LoaderPinwheel, RectangleEllipsis } from 'lucide-react'
// This component is used to show a loading spinner while the page is loading
// It uses the LoaderPinwheel icon from lucide-react and applies a spinning animation to it
const PageLoader = () => {
  return (
      <div className="min-h-screen flex justify-center items-center" data-theme="night">
    <RectangleEllipsis className="size-10 animate-spin" />
  </div> )
}

export default PageLoader