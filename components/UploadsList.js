import React from 'react'
import { useUploadsList } from '@w3ui/react-uploads-list'
import { withIdentity } from './Authenticator'

export function UploadsList () {
  const { loading, error, data, reload } = useUploadsList()

  if (error) {
    return <Errored error={error} />
  }

  return (
    <div className='w-full'>
      {data && data.results.length
        ? (
          <div className='overflow-auto'>
            <table className='w-100 mb-3 collapse'>
              <thead className='near-white tl'>
                <tr>
                  <th className='p-3'>Data CID</th>
                  <th className='p-3'>CAR CID</th>
                  <th className='p-3'>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.results.map(({ dataCid, carCids, uploadedAt }) => (
                  <tr key={dataCid} className='stripe-light'>
                    <td className='p-3'>{dataCid}</td>
                    <td className='p-3'>{carCids[0]}</td>
                    <td className='p-3'>{uploadedAt.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )
        : <p className='tc my-5'>No uploads</p>}
      <button type='button' onClick={reload} className='rounded px-2 py-1 mr3 bg-gray-900'>Refresh</button>
      {loading ? <span className='spinner dib' /> : null}
    </div>
  )
}

const Errored = ({ error }) => (
  <div>
    <h1 className='near-white'>⚠️ Error: failed to list uploads: {error.message}</h1>
    <p>Check the browser console for details.</p>
  </div>
)

export default withIdentity(UploadsList)
