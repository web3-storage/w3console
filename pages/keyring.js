import Head from 'next/head'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { useUploader } from '@w3ui/react-uploader'
import { useAuth, AuthStatus } from '@w3ui/react-keyring'
import { Uploader } from '../components/Uploader'
import Authenticator from '../components/Authenticator'
import Sidebar from '../components/Sidebar'
import { UploadsList } from '../components/UploadsList'
import { Toaster } from 'react-hot-toast';

export default function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [progress, uploader] = useUploader();
    const auth = useAuth();
    const { authStatus, identity, loadDefaultIdentity, registerAndStoreIdentity } = useAuth()
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    // eslint-disable-next-line
    useEffect(() => { loadDefaultIdentity() }, []) // try load default identity - once.
    const handleRegisterSubmit = async e => {
        e.preventDefault()
        setSubmitted(true)
        try {
            await registerAndStoreIdentity(email)
        } catch (err) {
            throw new Error('failed to register', { cause: err })
        } finally {
            setSubmitted(false)
        }
    }

    return (
        <div>
            <Head>
                <title>w3console</title>
                <meta name="description" content="w3console dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
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
                                    <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-900">
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
                                                    <XMarkIcon className="h-6 w-6 text-white dark:text-black" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4 text-gray-900 dark:text-white">
                                            <Sidebar />
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                                <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
                            </div>
                        </Dialog>
                    </Transition.Root>

                    {/* Static sidebar for desktop */}
                    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                        <Sidebar />
                    </div>
                    <div className="flex flex-1 flex-col md:pl-64">
                        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
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
                            <div className="">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-8">
                                    Keyring info
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <div><Toaster /></div>
        </div>
    )
}
