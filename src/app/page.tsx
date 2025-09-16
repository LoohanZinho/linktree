'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Video, VideoOff, Mic, MicOff, PhoneOff, User, Phone, PlusCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';

// Mock data for friends
const initialFriends = [
  { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: 2, name: 'Bruno', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
  { id: 3, name: 'Carlos', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
];

export default function VideoCallPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [friends, setFriends] = useState(initialFriends);
  const [newFriendName, setNewFriendName] = useState('');
  const [activeCall, setActiveCall] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
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

  const handleAddFriend = () => {
    if (newFriendName.trim() !== '') {
      const newFriend = {
        id: friends.length + 1,
        name: newFriendName.trim(),
        avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
      };
      setFriends([...friends, newFriend]);
      setNewFriendName('');
      toast({
        title: 'Amigo adicionado!',
        description: `${newFriend.name} agora está na sua lista de amigos.`,
      });
    }
  };

  const handleCall = (friendName: string) => {
    setActiveCall(friendName);
    toast({
      title: 'Ligando...',
      description: `Iniciando chamada com ${friendName}.`,
    });
  }
  
  const handleEndCall = () => {
    setActiveCall(null);
  }

  return (
    <main className="flex h-screen w-screen bg-gray-100 dark:bg-gray-900">
      {/* Friends Sidebar */}
      <aside className="w-80 flex-shrink-0 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Amigos</h2>
        </div>

        <div className="p-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Nome do amigo"
                value={newFriendName}
                onChange={(e) => setNewFriendName(e.target.value)}
                className="dark:bg-gray-700 dark:text-white"
                onKeyDown={(e) => e.key === 'Enter' && handleAddFriend()}
              />
              <Button onClick={handleAddFriend} size="icon">
                <PlusCircle />
              </Button>
            </div>
        </div>

        <Separator />

        <div className="flex-1 overflow-y-auto p-2">
            <div className="flex flex-col gap-2">
              {friends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{friend.name}</span>
                  </div>
                  <div className="flex gap-2">
                     <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-800 dark:hover:text-white" onClick={() => handleCall(friend.name)}>
                        <Phone size={20}/>
                     </Button>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </aside>

      {/* Main Video Call Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center rounded-2xl bg-black/80 shadow-2xl text-white">
          
          <div className="flex flex-1 w-full items-center justify-center bg-gray-800/50 rounded-t-2xl overflow-hidden">
              {activeCall ? (
                <div className="flex flex-col items-center text-white">
                    <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src={friends.find(f => f.name === activeCall)?.avatar} />
                        <AvatarFallback>{activeCall.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-2xl">Em chamada com {activeCall}...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-muted-foreground">
                    <User size={96} />
                    <p>Selecione um amigo para ligar.</p>
                </div>
              )}
          </div>
          
          <div className="absolute bottom-24 right-6 md:bottom-28 md:right-8">
            <Card className="w-48 md:w-64 overflow-hidden rounded-xl border-2 border-primary shadow-lg bg-black">
              <CardContent className="p-0 relative">
                 <video ref={videoRef} className={`w-full aspect-video rounded-md transition-opacity duration-300 ${isCameraOn ? 'opacity-100' : 'opacity-0'}`} autoPlay muted playsInline />
                 {!isCameraOn && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                      <User size={48} className="text-white" />
                    </div>
                 )}
                 {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-md">
                       <p className="text-xs text-center text-white p-2">Câmera indisponível</p>
                    </div>
                 )}
              </CardContent>
            </Card>
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
              <Button variant="destructive" size="icon" className="w-16 h-14 rounded-full" onClick={handleEndCall} disabled={!activeCall}>
                <PhoneOff size={28} />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
