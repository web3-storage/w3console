import React from 'react'
import { useUploadsList } from '@w3ui/react-uploads-list'
import { useAuth, AuthStatus } from '@w3ui/react-keyring'
import { withIdentity } from './Authenticator'
import Loading from './Loading'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export function UploadsList() {
  const { loading, error, data, reload } = useUploadsList()
  const { authStatus } = useAuth()

  if (authStatus !== AuthStatus.SignedIn) return null
  if (error && authStatus === AuthStatus.SignedIn) {
    return <Errored error={error} />
  }

  return (
    <div className='w-full my-8'>
      {data && data.results.length
        ? (
          <div className='overflow-auto border border-gray-300 dark:border-gray-700 rounded-md mb-5'>
            <table className='w-full border-collapse divide-y border-gray-300 dark:divide-gray-700'>
              <thead className='text-left bg-gray-400 dark:bg-gray-900 bg-opacity-50 text-sm'>
                <tr>
                  <th className='p-3'>Data CID</th>
                  <th className='p-3'>CAR CID</th>
                  <th className='p-3'>Date</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-300 dark:divide-gray-700 text-gray-600 dark:text-gray-300'>
                {data.results.map(({ dataCid, carCids, uploadedAt }, idx) => (
                  <tr key={dataCid} className={idx % 2 === 0 ? undefined : 'bg-gray-900 dark:bg-gray-50 bg-opacity-10 dark:bg-opacity-5'}>
                    <td className='p-3'><span className="block truncate w-48">{dataCid}</span></td>
                    <td className='p-3'><span className="block truncate w-48">{carCids[0]}</span></td>
                    <td className='p-3'>{uploadedAt.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        : <p className='tc my-5'>No uploads</p>}
      <button type='button' onClick={reload} className='flex items-center gap-2 rounded px-2 py-1 mr3 bg-gray-400 dark:bg-gray-900'>Refresh {loading ? <Loading /> : null}</button>
    </div>
  )
}

const Errored = ({ error }) => (
  <div className='h-32 flex items-start p-8 bg-gray-900 rounded-md mt-5'>
    <ExclamationTriangleIcon className='w-8 h-8 mr-4 text-yellow-500' />
    <div>
      <h1 className="mb-1 text-lg">Error: failed to list uploads: {error.message}</h1>
      <p className="opacity-70">Check the browser console for details.</p>
    </div>
  </div>
)

export default withIdentity(UploadsList)
