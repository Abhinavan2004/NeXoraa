import React from 'react'
import { LoaderPinwheel } from 'lucide-react'
// This component is used to show a loading spinner while the page is loading
// It uses the LoaderPinwheel icon from lucide-react and applies a spinning animation to it
const PageLoader = () => {
  return (
    <div className='flex justify-center items-center '>
    <LoaderPinwheel className="animate-spin size-10 text-primary" />
 
 </div> )
}

export default PageLoader