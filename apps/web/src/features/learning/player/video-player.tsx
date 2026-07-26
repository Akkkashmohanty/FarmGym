"use client"

import ReactPlayer from "react-player"

interface Props {
  url: string
}

export default function VideoPlayer({
  url: _url,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl">
      <ReactPlayer
        url={_url}
        width="100%"
        height="100%"
        controls
      />
    </div>
  )
}