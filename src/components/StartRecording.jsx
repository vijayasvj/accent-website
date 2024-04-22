import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Recording } from '../assets';

const StartRecording = ({ item, onRecordingStopped, onScoreChange }) => {
  let [isOpen, setIsOpen] = useState(false)

  const closeDialog = () => {
    setIsOpen(false)
  }

  const openDialog = () => {
    setIsOpen(true)
  }

  // When the recording is stopped this function gets triggered
  const onRecordingSubmit = async (blob) => {
    const url = URL.createObjectURL(blob);
    const reader = new FileReader();
    
    reader.onload = async () => {
      const base64String = reader.result.split(',')[1];
      try {
        const response = await sendAudioToServer(base64String, item.id);
        onRecordingStopped(url);
        onScoreChange(response.score);
        closeDialog();
      } catch (error) {
        console.error('Error while sending data to server:', error);
      }
    };
    
    reader.readAsDataURL(blob);
  };

  const sendAudioToServer = async (base64String, id) => {
    const response = await fetch('http://localhost:3002/compare_audios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audio: base64String, testId: id }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send data to server');
    }
    
    return response.json();
  };

  const recorderControls = useAudioRecorder()

  const startRecording = () => {
    recorderControls.startRecording()
  }

  const stopRecording = () => {
    recorderControls.stopRecording()
  }
  
  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openDialog}
          className="rounded-md bg-slate-200 text-slate-950 px-4 py-2 text-sm font-medium hover:bg-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 flex items-center space-x-2"
        >
          <span>Start Recording</span>
          <Recording />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    Read the below text loudly
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-lg font-semibold text-slate-800">
                      Text: {item.text}
                    </p>
                  </div>
                  <div className='w-full flex flex-col items-center'>
                  <AudioRecorder 
       onRecordingComplete={(blob) => onRecordingSubmit(blob)}
       recorderControls={recorderControls}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }} 
      // downloadOnSavePress={true}
      downloadFileExtension="webm"
      showVisualizer={true}
    />
                  </div>
                  <div className="mt-4 w-full flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={startRecording}
                    >
                      Record Audio
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={stopRecording}
                    >
                      Stop Recording
                    </button>
                    
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default StartRecording