//adapted from  https://github.com/facebook/react/issues/11163

import React, { VideoHTMLAttributes, useEffect, useRef } from 'react'
type PropsType = VideoHTMLAttributes<HTMLVideoElement> & {
  mediaStream: MediaStream
}

export default function Stream({ mediaStream, ...props }: PropsType):JSX.Element {
  const refVideo = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (refVideo.current === null) return;
    refVideo.current.srcObject = mediaStream;
  })

  return <video className="stream" controls autoPlay ref={refVideo} {...props} />
}
