'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import playlist from '@/lib/musicas.json';

type Song = {
  id: number;
  title: string;
  artist: string;
  cover: string;
  url: string;
};

export default function MusicPlayer() {
  const { musicas } = playlist;
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong: Song = musicas[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.error("Audio play failed:", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % musicas.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + musicas.length) % musicas.length);
    setIsPlaying(true);
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if(newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-4 text-white shadow-2xl">
      <div className="flex items-center gap-4">
        <Image
          src={currentSong.cover || 'https://i.imgur.com/5d5tC2d.png'}
          alt={currentSong.title}
          width={64}
          height={64}
          className="rounded-md w-16 h-16 object-cover"
          unoptimized
        />
        <div className="flex-1 overflow-hidden">
          <h3 className="font-bold text-base truncate">{currentSong.title}</h3>
          <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={handlePrev} className="p-2 transition-transform duration-200 hover:scale-110 active:scale-95">
             <SkipBack className="h-5 w-5" />
           </button>
           <button onClick={togglePlay} className="p-2 rounded-full bg-white/20 transition-transform duration-200 hover:scale-110 active:scale-95">
             {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
           </button>
           <button onClick={handleNext} className="p-2 transition-transform duration-200 hover:scale-110 active:scale-95">
             <SkipForward className="h-5 w-5" />
           </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2">
            <span className="text-xs w-10 text-center">{formatTime(progress)}</span>
            <Slider
                value={[progress]}
                max={duration || 100}
                onValueChange={handleProgressChange}
                className="flex-1"
            />
            <span className="text-xs w-10 text-center">{formatTime(duration || 0)}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button onClick={toggleMute} className="p-1">
          {isMuted || volume === 0 ? <VolumeX className="h-4 w-4 text-gray-400" /> : <Volume2 className="h-4 w-4 text-gray-400" />}
        </button>
        <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24"
        />
      </div>

      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
}
