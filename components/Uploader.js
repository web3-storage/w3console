import React, { useState, useEffect } from 'react'
import { useUploader } from '@w3ui/react-uploader'
import { withIdentity } from './Authenticator'
import { useAuth, AuthStatus } from '@w3ui/react-keyring'
import Loading from './Loading'
import toast from 'react-hot-toast';

export function Uploader() {
    const [{ uploadedCarChunks }, uploader] = useUploader()
    const [files, setFiles] = useState([])
    const [allowDirectory, setAllowDirectory] = useState(false)
    const [wrapInDirectory, setWrapInDirectory] = useState(false)
    const [dataCid, setDataCid] = useState('')
    const [status, setStatus] = useState('')
    const [error, setError] = useState(null)
    const { identity, authStatus } = useAuth()

    if (!uploader || !identity) return null

    const handleUploadSubmit = async e => {
        e.preventDefault()
        try {
            setStatus('uploading')
            const cid = files.length > 1
                ? await uploader.uploadDirectory(files)
                : wrapInDirectory
                    ? await uploader.uploadDirectory(files)
                    : await uploader.uploadFile(files[0])
            setDataCid(cid.toString())
        } catch (err) {
            console.error(err)
            setError(err)
        } finally {
            setStatus('done')
            if (error) {
                toast.error(error)
            } else {
                toast.success((
                    <>
                        <span>
                            <Done files={files} dataCid={dataCid} uploadedCarChunks={uploadedCarChunks} />
                        </span>
                    </>
                ), {
                    duration: 10000,
                    position: 'bottom-right',
                });
            }
            setFiles([])
        }
    }

    return (
        <>
            <form onSubmit={handleUploadSubmit}>
                <div className='my-6'>
                    <label htmlFor='files' className='db mb2'>Files:</label>

                    <div className="w-full my-4">
                        <label
                            className="relative flex justify-center w-full h-32 px-4 transition border-2 border-gray-300 dark:border-gray-500 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                            <span className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="font-medium text-gray-600 dark:text-gray-400">
                                    Drop files to Attach, or{' '}
                                    <span className="text-orange-300 underline">browse</span>
                                </span>
                            </span>
                            {allowDirectory ? (
                                <input id='file' type='file' className="absolute left-0 top-0 w-full h-full opacity-0" webkitdirectory onChange={e => setFiles(Array.from(e.target.files))} required />
                            ) : (
                                <input id='file' type='file' className="absolute left-0 top-0 w-full h-full opacity-0" multiple={true} onChange={e => setFiles(Array.from(e.target.files))} required />
                            )}
                        </label>
                    </div>
                </div>

                {files.map((file, idx) => {
                    return (
                        <div className={`rounded w-full flex justify-between p-4 ${idx % 2 === 0 ? 'bg-gray-200 dark:bg-gray-900' : undefined}`}>
                            <span>{file.name}</span>
                            <span>{file.type}</span>
                            <span>{file.size}</span>
                        </div>
                    )
                })}

                <div className="flex justify-start gap-8 mt-6">
                    <div className='mb3'>
                        <label>
                            <input className="bg-gray-50" type='checkbox' value={allowDirectory} onChange={e => setAllowDirectory(e.target.checked)} /> Allow directory selection
                        </label>
                    </div>
                    {files.length === 1
                        ? (
                            <div className='mb3'>
                                <label>
                                    <input className="bg-gray-50" type='checkbox' value={wrapInDirectory} onChange={e => setWrapInDirectory(e.target.checked)} /> Wrap file in a directory
                                </label>
                            </div>
                        )
                        : null}
                </div>
                <button type='submit' className='rounded px-2 py-1 mt-5 bg-orange-300 text-black'>Upload</button>
            </form>
            {status === 'uploading' && (
                <Uploading files={files} uploadedCarChunks={uploadedCarChunks} />
            )}
        </>
    )
}

const Uploading = ({ files, dataCid, uploadedCarChunks }) => (
    <div className='flex flex-col items-center my-6 p-4 min-h-32 justify-center border-2 border-gray-300 dark:border-gray-500 rounded-md'>
        <div className=''>
            <div className="flex items-center gap-2"><Loading /><p className='truncate'>Uploading DAG for {files.length > 1 ? `${files.length} files` : files[0].name}</p></div>

            {uploadedCarChunks.map(({ cid, size }) => (
                <p key={cid.toString()} className='f7 truncate'>
                    {cid.toString()} ({size} bytes)
                </p>
            ))}
        </div>
    </div>
)

const Errored = ({ error }) => (
    <div>
        <h1 className='near-white'>⚠️ Error: failed to upload file(s): {error.message}</h1>
        <p>Check the browser console for details.</p>
    </div>
)

const Done = ({ files, dataCid, uploadedCarChunks }) => (
    <div className="">
        <p className=''>Success!</p>
        <p className='w-64 truncate'>{dataCid.toString()}</p>
        <p><a href={`https://w3s.link/ipfs/${dataCid}`} className='underline'>View {files.length > 1 ? 'files' : files[0].name} on IPFS Gateway.</a></p>
        <p className=''>Chunks ({uploadedCarChunks.length}):</p>
        {uploadedCarChunks.map(({ cid, size }) => (
            <p key={cid.toString()} className='w-64 truncate'>
                {cid.toString()} ({size} bytes)
            </p>
        ))}
    </div>
)

export default withIdentity(Uploader)