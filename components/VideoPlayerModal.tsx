import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import { Download, Maximize, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";

interface VideoPlayerModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    videoUrl: string;
    posterUrl?: string; // Optional thumbnail image URL
}

function VideoPlayerModal({ isOpen, onClose, title, videoUrl, posterUrl }: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  
  // Format time in MM:SS format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space to toggle play/pause
      if (e.code === 'Space' && videoRef.current) {
        e.preventDefault();
        togglePlay();
      }
      
      // M to toggle mute
      if (e.code === 'KeyM' && videoRef.current) {
        e.preventDefault();
        toggleMute();
      }
      
      // F to toggle fullscreen
      if (e.code === 'KeyF' && videoRef.current) {
        e.preventDefault();
        toggleFullscreen();
      }
      
      // Left arrow to rewind 5 seconds
      if (e.code === 'ArrowLeft' && videoRef.current) {
        e.preventDefault();
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
      }
      
      // Right arrow to forward 5 seconds
      if (e.code === 'ArrowRight' && videoRef.current) {
        e.preventDefault();
        videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
  
  // Autoplay when modal opens and pause when it closes
  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Small delay to ensure video is loaded
      const timer = setTimeout(() => {
        videoRef.current?.play().catch(() => {
          // Autoplay might be blocked by browser policy
          console.log('Autoplay prevented by browser');
        });
      }, 300);
      return () => clearTimeout(timer);
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);
  
  // Update video event listeners
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
      // Update progress bar
      if (progressRef.current && videoElement.duration) {
        const progress = (videoElement.currentTime / videoElement.duration) * 100;
        progressRef.current.style.width = `${progress}%`;
      }
    };
    const handleDurationChange = () => setDuration(videoElement.duration);
    const handleVolumeChange = () => {
      setVolume(videoElement.volume);
      setIsMuted(videoElement.muted);
    };
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === videoElement);
    };
    
    // Add event listeners
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('durationchange', handleDurationChange);
    videoElement.addEventListener('volumechange', handleVolumeChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    // Clean up
    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('durationchange', handleDurationChange);
      videoElement.removeEventListener('volumechange', handleVolumeChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Player control functions
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
  };
  
  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };
  
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current?.parentElement) return;
    
    const progressBar = progressRef.current.parentElement;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = clickPosition * videoRef.current.duration;
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    if (newVolume === 0) {
      videoRef.current.muted = true;
    } else if (videoRef.current.muted) {
      videoRef.current.muted = false;
    }
  };
  
  // Handle video download
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `${title}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full z-[200] max-w-[90vw] md:max-w-[80vw] h-[85vh] flex-col border-none bg-[#1C1F2E]/95 backdrop-blur-sm p-0 overflow-hidden rounded-xl">
        {/* Header with title and close button */}
        <div className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-b from-black/70 to-transparent absolute top-0 left-0 right-0 z-10">
          <DialogTitle className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
            {title}
          </DialogTitle>
          
          {/* Download button */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDownload}
              className="text-white/80 hover:text-white focus:outline-none transition-colors"
              aria-label="Download video"
            >
              <Download className="h-5 w-5" />
            </button>
            
            <DialogClose className="rounded-full h-8 w-8 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors">
              <X className="h-5 w-5 text-white" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </div>
        
        {/* Custom Video Player */}
        <div className="flex-1 w-full h-full flex items-center justify-center bg-black overflow-hidden relative">
          {/* Video element */}
          <video 
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl}
            className="w-full h-full object-contain"
            onClick={togglePlay}
            playsInline
          />
          
          {/* Play/Pause overlay button (shows briefly when clicked) */}
          <div 
            className={`absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300 ${isPlaying ? '' : 'opacity-100'}`}
          >
            <div className="bg-black/40 p-6 rounded-full">
              {isPlaying ? (
                <Pause className="h-12 w-12 text-white" />
              ) : (
                <Play className="h-12 w-12 text-white" />
              )}
            </div>
          </div>
          
          {/* Controls */}
          <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            {/* Progress bar */}
            <div 
              className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer relative"
              onClick={handleProgressBarClick}
            >
              <div ref={progressRef} className="absolute top-0 left-0 h-full bg-[#0E78F9] rounded-full" style={{ width: '0%' }} />
            </div>
            
            <div className="flex items-center justify-between">
              {/* Left controls group */}
              <div className="flex items-center space-x-4">
                {/* Play/Pause button */}
                <button 
                  onClick={togglePlay} 
                  className="text-white focus:outline-none"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </button>
                
                {/* Volume control */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={toggleMute} 
                    className="text-white focus:outline-none"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                  
                  <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 md:w-24 accent-[#0E78F9]"
                  />
                </div>
                
                {/* Time display */}
                <div className="text-white text-sm hidden md:block">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              
              {/* Right controls group */}
              <div className="flex items-center space-x-4">
                {/* Full screen button */}
                <button 
                  onClick={toggleFullscreen} 
                  className="text-white focus:outline-none"
                  aria-label={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
                >
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default VideoPlayerModal;
