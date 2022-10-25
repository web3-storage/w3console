import React, { useState } from 'react'
import { useAuth, AuthStatus } from '@w3ui/react-keyring'
import {
    FolderIcon,
    ArrowLeftOnRectangleIcon,
    HomeIcon,
    UserCircleIcon,
    UsersIcon,
    LockClosedIcon,
  } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Uploads', href: '#', icon: UsersIcon, current: false },
    { name: 'Account', href: '#', icon: FolderIcon, current: false },
    { name: 'Keyring', href: '#', icon: LockClosedIcon, current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export function Sidebar() {
    const { authStatus, identity, unloadIdentity } = useAuth()

    return (
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700" >
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                    <div className="flex items-center gap-2 text-black dark:text-white">
                        <svg className="w-6 h-6" width="570" height="570" viewBox="0 0 570 570" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M263.845 206.682L239.393 249.034L266.808 264.862L291.26 222.51L315.376 263.441L340.264 250.803L316.011 207.339L365.779 206.61L364.28 178.737L316.775 178.317L341.226 135.965L313.811 120.137L289.359 162.489L266.785 122.449L241.04 134.592L265.979 178.452L215.525 178.785L217.196 206.756L263.845 206.682Z" fill="currentColor" />
                            <path d="M381.919 379.281L407.093 422.883L433.823 407.45L408.649 363.849L456.205 364.307L457.582 335.828L407.286 334.184L431.51 290.669L406.257 277.795L382.605 319.135L356.832 274.495L330.274 289.828L355.847 334.122L308.077 334.48L306.871 362.86L357.067 364.331L333.343 408.711L358.024 420.991L381.919 379.281Z" fill="currentColor" />
                            <path d="M172.56 363.797L147.386 407.399L173.97 422.747L199.144 379.145L223.353 421.037L248.462 407.85L224.94 363.587L273.853 362.297L273.8 333.66L225.216 333.986L250.789 289.692L224.205 274.344L198.632 318.638L174.975 277.757L149.696 290.846L173.518 334.59L123.423 336.351L125.028 364.269L172.56 363.797Z" fill="currentColor" />
                            <circle cx="285" cy="285" r="267.114" stroke="currentColor" strokeWidth="35.7715" />
                        </svg>
                        w3console
                    </div>
                </div>
                <nav className="mt-5 flex-1 space-y-1 bg-white dark:bg-gray-900 px-2">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current ? ' text-gray-900 dark:text-white' : 'text-gray-600 hover:text-gray-900 dark:hover:text-white',
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                            )}
                        >
                            <item.icon
                                className={classNames(
                                    item.current ? 'text-gray-900 dark:text-gray-200' : 'text-gray-400 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-white',
                                    'mr-3 flex-shrink-0 h-6 w-6'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>
            <div className="py-4">
                {identity && (
                    <div className="flex flex-shrink-0 px-4">
                        <a href="#" className="group block w-full flex-shrink-0">
                            <div className="flex items-center">
                                <div>
                                    <UserCircleIcon className="w-8 h-8 " />
                                </div>
                                <div className="ml-3">
                                    <p className="w-40 text-sm font-medium truncate">{identity?.email}</p>
                                    <p className="text-xs font-medium">Switch profile</p>
                                </div>
                            </div>
                        </a>
                    </div>
                )}
                {authStatus === AuthStatus.SignedIn && (
                    <div className="flex flex-shrink-0 px-4 mt-5">
                        <a href="#" className="group block w-full flex-shrink-0">
                            <div className="flex items-center">
                                <div>
                                    <ArrowLeftOnRectangleIcon className="w-8 h-8 " />
                                </div>
                                <div className="ml-3">
                                    <form onSubmit={e => { e.preventDefault(); unloadIdentity() }}>
                                        <button type='submit' className='text-sm font-medium'>Sign Out</button>
                                    </form>
                                </div>
                            </div>
                        </a>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Sidebar