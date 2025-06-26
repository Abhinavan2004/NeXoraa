import { QueryClient, useMutation } from '@tanstack/react-query';
import { SunSnowIcon , LogOutIcon , BellIcon, PaletteIcon } from 'lucide-react'
import React from 'react'
import { useLocation, Link } from 'react-router'
import axiosInstance from '../lib/axios'

const Navbar = () => {

  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat") ;
  const queryclient = QueryClient ;
  const {mutate:logoutMutation , } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/logout");
      return response.data;
    },
 onSuccess: () => {
    // Immediately set auth data to null
    queryclient.setQueryData(["authUser"], null);
    // Also invalidate to trigger refetch
    queryclient.invalidateQueries({ queryKey: ["authUser"] });
  }  })

  

return (
<nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex items-center justify-end w-full">
{/* LOGO - ONLY IN THE CHAT PAGE */}
{isChatPage && (
<div className="pl-5">
<Link to="/" className="flex items-center gap-2.5">
<SunSnowIcon className="size-9 text-primary" />
<span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r
from-primary to-secondary tracking-wider">
 NeXoraa
</span>
</Link>
</div>
  )}

  <div className="flex items-center gap-3 sm:gap-4">
<Link to="/notifications">
<button className="btn btn-ghost btn-circle">
<BellIcon className="h-6 w-6 text-base-content opacity-70" />
</button>
</Link>
</div>



<div className="flex items-center gap-3 sm:gap-4">
<button className="btn btn-ghost btn-circle">
<PaletteIcon className="h-6 w-6 text-base-content opacity-70" />
</button>
</div>


{/* Logout button */}
<button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
<LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
</button>
</div>
</div>
</nav>
  )
}

export default Navbar