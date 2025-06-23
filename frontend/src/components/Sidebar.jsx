import { SunSnowIcon , HomeIcon, User2Icon} from 'lucide-react'
import React from 'react'
import { Link, useLocation} from 'react-router'

const Sidebar = () => {
  const location = useLocation()
  const currentPath = location.pathname  // for getting path of url for sidebar options 

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky
top-0">
<div className="p-5 border-b border-base-300">
<Link to="/" className="flex items-center gap-2.5">
<SunSnowIcon className="size-9 text-primary" />
<span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r
from-primary to-secondary tracking-wider">
NexCall
</span>
</Link>
</div>
<nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>
      </nav>


<nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <User2Icon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>
      </nav>
</aside>
  )
}

export default Sidebar