import React, { useEffect, useState } from 'react'
import StartRecording from './StartRecording';

const ExampleCard = ({ data }) => {
    const [practiceAudioUrl, setPracticeAudioUrl] = useState(null)

  useEffect(() => {
    async function importAudio() {
      try {
        const { default: audio } = await import(`../assets/originalAudio/mockAudio.mp3`);
        setPracticeAudioUrl(audio)
      } catch (error) {
        console.error(`Error importing audio for ID ${data.id}:`, error);
        return null;
      }
    }

    importAudio()
  })

  return (
    <section className='w-full flex flex-col items-center space-y-4'>
        <p className='w-full text-start'>Example - {data.id}: <strong className='uppercase'>{data.word}</strong></p>
          <div className='flex flex-col space-y-4 py-6'>
            <span>Listen to the below audio and practice the accent yourself</span>
            <audio
                    src={practiceAudioUrl}
                    controls
                    className='w-full'
                    autoPlay={false}
                    preload="auto"
                />
          </div>
    </section>
  )
}

export default ExampleCard