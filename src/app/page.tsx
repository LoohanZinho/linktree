'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Video, VideoOff, Mic, MicOff, PhoneOff, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function VideoCallPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        // Solicita acesso à câmera e ao microfone
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Acesso à Câmera Negado',
          description: 'Por favor, habilite as permissões de câmera e microfone nas configurações do seu navegador.',
        });
      }
    };

    getCameraPermission();

    // Função de limpeza para parar os tracks quando o componente for desmontado
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const toggleCamera = () => {
     if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isCameraOn;
        setIsCameraOn(!isCameraOn);
      }
    }
  };

  const toggleMic = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
        setIsMicOn(!isMicOn);
      }
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center rounded-2xl bg-black/50 shadow-2xl">
        
        {/* Vídeo da outra pessoa (placeholder) */}
        <div className="flex flex-1 w-full items-center justify-center bg-gray-800 rounded-t-2xl overflow-hidden">
             <div className="flex flex-col items-center text-muted-foreground">
                <User size={96} />
                <p>Aguardando outro participante...</p>
            </div>
        </div>
        
        {/* Vídeo local */}
        <div className="absolute bottom-24 right-6 md:bottom-28 md:right-8">
          <Card className="w-48 md:w-64 overflow-hidden rounded-xl border-2 border-primary shadow-lg">
            <CardContent className="p-0">
               <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
            </CardContent>
          </Card>
           {hasCameraPermission === false && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-md">
                 <p className="text-xs text-center text-white p-2">Câmera indisponível</p>
              </div>
           )}
        </div>

        {hasCameraPermission === false && (
          <div className="absolute top-4 left-4 right-4">
             <Alert variant="destructive">
              <AlertTitle>Acesso à Câmera e Microfone Necessário</AlertTitle>
              <AlertDescription>
                Por favor, permita o acesso nas configurações do seu navegador para usar esta funcionalidade.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Controles da chamada */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center h-20 bg-gray-900/50 backdrop-blur-sm rounded-b-2xl">
          <div className="flex items-center gap-4">
            <Button
              variant={isMicOn ? 'secondary' : 'destructive'}
              size="icon"
              className="w-14 h-14 rounded-full"
              onClick={toggleMic}
              disabled={hasCameraPermission === false}
            >
              {isMicOn ? <Mic size={28} /> : <MicOff size={28} />}
            </Button>
            <Button
              variant={isCameraOn ? 'secondary' : 'destructive'}
              size="icon"
              className="w-14 h-14 rounded-full"
              onClick={toggleCamera}
              disabled={hasCameraPermission === false}
            >
              {isCameraOn ? <Video size={28} /> : <VideoOff size={28} />}
            </Button>
            <Button variant="destructive" size="icon" className="w-16 h-14 rounded-full">
              <PhoneOff size={28} />
            </Button>
          </div>
        </div>

      </div>
    </main>
  );
}
