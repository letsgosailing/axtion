
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Axe as AxeIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function AxeLumberjackPage() {
  const [score, setScore] = useState(0);
  const [treeHealth, setTreeHealth] = useState(100);
  const [isChopping, setIsChopping] = useState(false);
  const chopSoundRef = useRef<HTMLAudioElement>(null);
  const fellSoundRef = useRef<HTMLAudioElement>(null);

  const CHOP_DAMAGE = 20;
  const POINTS_PER_CHOP = 100;

  const handleChop = () => {
    if (treeHealth <= 0 || isChopping) return;

    if (chopSoundRef.current) {
      chopSoundRef.current.currentTime = 0;
      chopSoundRef.current.play();
    }

    setIsChopping(true);
    setScore((prevScore) => prevScore + POINTS_PER_CHOP);
    
    const newHealth = Math.max(0, treeHealth - CHOP_DAMAGE);
    setTreeHealth(newHealth);

    if (newHealth <= 0) {
      if (fellSoundRef.current) {
        // Add a slight delay to play after the last chop sound
        setTimeout(() => {
          fellSoundRef.current!.currentTime = 0;
          fellSoundRef.current!.play();
        }, 150);
      }
    }

    setTimeout(() => {
      setIsChopping(false);
    }, 300);
  };

  useEffect(() => {
    if (treeHealth <= 0) {
      const timer = setTimeout(() => {
        setTreeHealth(100);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [treeHealth]);

  const isTreeFelled = treeHealth <= 0;

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-background p-4 sm:p-8 font-body overflow-hidden relative">
      <audio ref={chopSoundRef} src="https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c8/Weapons_hero_axe_attack01.mp3/revision/latest" preload="auto"></audio>
      <audio ref={fellSoundRef} src="https://static.wikia.nocookie.net/dota2_gamepedia/images/4/47/Weapons_hero_axe_culling_blade_success.mp3/revision/latest" preload="auto"></audio>
      <div className="absolute inset-0 bg-[url('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/wandering_waters/patch_notes_bg.jpg')] bg-cover bg-center opacity-30"></div>
      
      <header className="w-full flex justify-between items-start z-10">
        <Card className="bg-card/70 backdrop-blur-sm border-accent/30 shadow-lg">
          <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-center text-primary-foreground/80 mb-2">Tree Health</h2>
              <Progress value={treeHealth} className="w-40 h-4 border border-primary-foreground/20" />
              {isTreeFelled && (
                  <p className="text-center text-sm text-primary-foreground/80 animate-pulse mt-2">Respawning...</p>
              )}
          </CardContent>
        </Card>

        <Card className="bg-card/70 backdrop-blur-sm border-accent/30 shadow-lg">
          <CardContent className="p-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary-foreground" style={{ textShadow: '2px 2px 4px hsl(var(--accent))' }}>
              Score: {score}
            </h1>
          </CardContent>
        </Card>
      </header>

      <div className="flex-grow flex items-center justify-center w-full max-w-md z-10 -mt-20">
        <div className="relative w-full flex items-end justify-center h-96">
            <div className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 transition-transform duration-300", isChopping ? "animate-chop" : "rotate-6")}>
                 <Image
                    src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/axe.png"
                    alt="Axe"
                    width={400}
                    height={400}
                    unoptimized
                    data-ai-hint="red warrior"
                    className="object-contain"
                />
            </div>
        </div>
      </div>

      <footer className="py-8 z-10">
        <Button 
          onClick={handleChop} 
          size="lg" 
          variant="secondary"
          className="font-bold text-xl sm:text-2xl px-10 py-6 sm:px-12 sm:py-8 rounded-lg shadow-lg shadow-primary/30 transform active:scale-95 transition-all duration-150 ease-in-out border-2 border-primary-foreground/20 hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed bg-secondary/80 hover:bg-secondary"
          disabled={isChopping || isTreeFelled}
          aria-label="Chop the tree"
        >
          <AxeIcon className="mr-2 sm:mr-4 h-6 w-6 sm:h-8 sm:w-8" />
          {isTreeFelled ? '...' : 'Chop'}
        </Button>
      </footer>
    </main>
  );
}
