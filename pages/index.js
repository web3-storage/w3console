import Head from 'next/head'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const navigation = [


  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Users', href: '#', icon: UsersIcon, current: false },
  { name: 'Uploads', href: '#', icon: FolderIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div>
      <Head>
        <title>w3console</title>
        <meta name="description" content="w3console dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                          type="button"
                          className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                      <div className="flex flex-shrink-0 items-center px-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center text-black gap-2">
                          <svg className="w-6 h-6" width="570" height="570" viewBox="0 0 570 570" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M263.845 206.682L239.393 249.034L266.808 264.862L291.26 222.51L315.376 263.441L340.264 250.803L316.011 207.339L365.779 206.61L364.28 178.737L316.775 178.317L341.226 135.965L313.811 120.137L289.359 162.489L266.785 122.449L241.04 134.592L265.979 178.452L215.525 178.785L217.196 206.756L263.845 206.682Z" fill="black" />
                            <path d="M381.919 379.281L407.093 422.883L433.823 407.45L408.649 363.849L456.205 364.307L457.582 335.828L407.286 334.184L431.51 290.669L406.257 277.795L382.605 319.135L356.832 274.495L330.274 289.828L355.847 334.122L308.077 334.48L306.871 362.86L357.067 364.331L333.343 408.711L358.024 420.991L381.919 379.281Z" fill="black" />
                            <path d="M172.56 363.797L147.386 407.399L173.97 422.747L199.144 379.145L223.353 421.037L248.462 407.85L224.94 363.587L273.853 362.297L273.8 333.66L225.216 333.986L250.789 289.692L224.205 274.344L198.632 318.638L174.975 277.757L149.696 290.846L173.518 334.59L123.423 336.351L125.028 364.269L172.56 363.797Z" fill="black" />
                            <circle cx="285" cy="285" r="267.114" stroke="black" stroke-width="35.7715" />
                          </svg>
                          w3console
                        </div>
                      </div>
                      <nav className="mt-5 space-y-1 px-2">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                'mr-4 flex-shrink-0 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                    <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                      <a href="#" className="group block flex-shrink-0">
                        <div className="flex items-center">
                          <div>
                            <UserCircleIcon className="w-8 h-8 text-gray-700" />
                          </div>
                          <div className="ml-3">
                            <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
                            <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Switch User</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
                <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <div className="flex items-center text-black gap-2">
                    <svg className="w-6 h-6" width="570" height="570" viewBox="0 0 570 570" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M263.845 206.682L239.393 249.034L266.808 264.862L291.26 222.51L315.376 263.441L340.264 250.803L316.011 207.339L365.779 206.61L364.28 178.737L316.775 178.317L341.226 135.965L313.811 120.137L289.359 162.489L266.785 122.449L241.04 134.592L265.979 178.452L215.525 178.785L217.196 206.756L263.845 206.682Z" fill="black" />
                      <path d="M381.919 379.281L407.093 422.883L433.823 407.45L408.649 363.849L456.205 364.307L457.582 335.828L407.286 334.184L431.51 290.669L406.257 277.795L382.605 319.135L356.832 274.495L330.274 289.828L355.847 334.122L308.077 334.48L306.871 362.86L357.067 364.331L333.343 408.711L358.024 420.991L381.919 379.281Z" fill="black" />
                      <path d="M172.56 363.797L147.386 407.399L173.97 422.747L199.144 379.145L223.353 421.037L248.462 407.85L224.94 363.587L273.853 362.297L273.8 333.66L225.216 333.986L250.789 289.692L224.205 274.344L198.632 318.638L174.975 277.757L149.696 290.846L173.518 334.59L123.423 336.351L125.028 364.269L172.56 363.797Z" fill="black" />
                      <circle cx="285" cy="285" r="267.114" stroke="black" stroke-width="35.7715" />
                    </svg>
                    w3console
                  </div>
                </div>
                <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                <a href="#" className="group block w-full flex-shrink-0">
                  <div className="flex items-center">
                    <div>
                      <UserCircleIcon className="w-8 h-8 text-gray-800" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Switch profile</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col md:pl-64">
            <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
              <button
                type="button"
                className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <main className="flex-1">
              <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  {/* Replace with your content */}
                  <div className="py-4">
                    <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
                  </div>
                  {/* /End replace */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
