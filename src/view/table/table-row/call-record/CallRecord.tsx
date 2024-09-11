import { useEffect, useState } from "react";
import useSound from "use-sound";
import "./CallRecord.scss"
import { ReactComponent as Play } from "../../../../style/assets/play.svg";
import { ReactComponent as Pause } from "../../../../style/assets/pause.svg";
import { ReactComponent as Download } from "../../../../style/assets/download.svg";
import { ReactComponent as Close } from "../../../../style/assets/close.svg";
import { formatSeconds } from "../../../../inner-service";
import { useGetCallRecord } from "../../../../service";

type Props = {
  record: string
  time: number
  partnership_id: string
}

export const CallRecord = (
  {
    record,
    partnership_id,
    time
  }: Props) => {

  const {data} = useGetCallRecord(record !== undefined && record !== "", record, partnership_id)
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0)

  const createBlobUrl = (audioData: BlobPart) => {
    const blob = new Blob([audioData], { type: 'audio/mpeg' });
    return URL.createObjectURL(blob);
  };

  const [play, { pause, duration, sound }] = useSound(data ? createBlobUrl(data) : "")
  const [currTime, setCurrTime] = useState({
    min: 0,
    sec: 0,
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  const playingButton = () => {
    if (!data) return
    if (isPlaying) {
      pause()
      setIsPlaying(false);
    } else {
      play()
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (duration) {
      const min = Math.floor(duration / 60)
      const sec = Math.floor(duration % 60)
      setCurrTime({ min, sec })
    }
  }, [duration])

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        const currentTime = sound.seek() || 0
        setSeconds(currentTime);
        const min = Math.floor(currentTime / 60)
        const sec = Math.floor(currentTime % 60)
        setCurrTime({ min, sec })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [sound])

  useEffect(() => {
    if (data) {
      setIsPlaying(false);
    }
  }, [data])


  return (
    <div className={"call-record-root"}>
      <div>
        {formatSeconds(time)}
      </div>
      <div onClick={playingButton} className={"call-record-icon-play"}>
        {isPlaying ? <Pause/> : <Play/>}
      </div>
        <input
          type="range"
          min="0"
          max={duration || 1}
          value={seconds}
          className="call-record-timeline"
          onChange={(e) => {
            const newValue = parseFloat(e.target.value)
            sound.seek(newValue)
          }}
        />
      <div className={"call-record-icon"}>
        <Download/>
      </div>
      <div className={"call-record-icon"}>
        <Close/>
      </div>
    </div>
  )
}