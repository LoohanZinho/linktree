'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa6';

type DiscordPopupProps = {
  username: string;
  children: React.ReactNode;
};

export function DiscordPopup({ username, children }: DiscordPopupProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copiado!',
      description: 'Nome de usuário copiado para a área de transferência.',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FaDiscord />
            Discord
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Copie meu nome de usuário para me adicionar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input
            id="discord-username"
            readOnly
            defaultValue={username}
            className="flex-1 bg-black/20 border-white/10"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => copyToClipboard(username)}
            className="bg-black/20 border-white/10 hover:bg-black/40"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <a
              href="https://discord.com/app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:underline"
            >
              Abrir no Discord
            </a>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
