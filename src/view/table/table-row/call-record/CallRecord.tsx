import React, { useEffect, useRef, useState } from "react";
import "./CallRecord.scss"
import { ReactComponent as Play } from "../../../../style/assets/play.svg";
import { ReactComponent as Pause } from "../../../../style/assets/pause.svg";
import { ReactComponent as Download } from "../../../../style/assets/download.svg";
import { ReactComponent as Close } from "../../../../style/assets/close.svg";
import { formatSeconds } from "../../../../inner-service";
import { useGetCallRecord } from "../../../../service";

type Props = {
  record: string
  partnership_id: string
  time: number
}

export const CallRecord = ({record, partnership_id, time}: Props) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const {data} = useGetCallRecord(record !== undefined && record !== "", record, partnership_id);
  useEffect(() => {
    if (data) {
      setAudioUrl(data);
    }
  }, [record, partnership_id]);

  useEffect(() => {
    if (audioRef.current) {

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current!.duration);
      };

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current!.currentTime);
      };
    }
  }, [audioUrl]);

  const playPauseAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="call-record-root">
      <div>{formatSeconds(time)}</div>
      <div onClick={playPauseAudio} className="call-record-icon-play">
        {isPlaying ? <Pause/> : <Play/>}
      </div>
      <input
        type="range"
        min="0"
        max={duration || 1}
        value={currentTime}
        className="call-record-timeline"
        onChange={handleSliderChange}
      />
      <div className="call-record-icon">
        <Download/>
      </div>
      <div className="call-record-icon">
        <Close/>
      </div>
      <audio ref={audioRef} src={audioUrl || ''} preload="metadata"/>
    </div>
  );
};

