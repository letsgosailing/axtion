"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Axe } from "lucide-react";

export default function AxeLumberjackPage() {
  const [score, setScore] = useState(0);
  const [treeHealth, setTreeHealth] = useState(100);
  const [isChopping, setIsChopping] = useState(false);
  const [treeKey, setTreeKey] = useState(0);

  const CHOP_DAMAGE = 20;
  const POINTS_PER_CHOP = 100;

  const handleChop = () => {
    if (treeHealth <= 0 || isChopping) return;

    setIsChopping(true);
    setScore((prevScore) => prevScore + POINTS_PER_CHOP);
    setTreeHealth((prevHealth) => Math.max(0, prevHealth - CHOP_DAMAGE));

    setTimeout(() => {
      setIsChopping(false);
    }, 300); // Corresponds to animation duration in tailwind.config.ts
  };

  useEffect(() => {
    if (treeHealth <= 0) {
      const timer = setTimeout(() => {
        setTreeHealth(100);
        setTreeKey((prevKey) => prevKey + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [treeHealth]);

  const isTreeFelled = treeHealth <= 0;

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-gray-900 via-background to-background p-4 sm:p-8 font-body overflow-hidden">
      <header>
        <Card className="bg-card/70 backdrop-blur-sm border-accent shadow-lg">
          <CardContent className="p-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary-foreground font-headline" style={{ textShadow: '2px 2px 4px hsl(var(--accent))' }}>
              Score: {score}
            </h1>
          </CardContent>
        </Card>
      </header>

      <div className="relative w-full flex-grow flex items-end justify-center mt-8">
        <div className="flex items-end justify-center">
            {/* Character */}
            <div className="relative w-[128px] h-[128px] sm:w-[192px] sm:h-[192px] z-10">
                <Image
                    src="https://placehold.co/256x256.png"
                    alt="Axe the lumberjack character"
                    fill
                    className={`${isChopping ? 'animate-chop' : ''} object-contain object-bottom drop-shadow-2xl`}
                    data-ai-hint="fantasy warrior axe"
                    style={{transformOrigin: 'bottom center'}}
                />
            </div>
            {/* Tree */}
            <div 
            key={treeKey}
            className="relative w-[150px] h-[300px] sm:w-[200px] sm:h-[400px] -ml-10 sm:-ml-16"
            >
            {!isTreeFelled ? (
                <div className="absolute bottom-0 w-full transition-all duration-300 ease-out" style={{ height: `${treeHealth}%` }}>
                <Image
                    src="https://placehold.co/200x400.png"
                    alt="A tall pine tree in a dark forest"
                    fill
                    className="object-contain object-bottom drop-shadow-lg"
                    data-ai-hint="pine tree night"
                    priority
                />
                </div>
            ) : (
                <div className="absolute bottom-0 w-full h-[48px] sm:h-[64px]">
                <Image
                    src="https://placehold.co/200x64.png"
                    alt="A tree stump"
                    fill
                    className="object-contain object-bottom drop-shadow-lg"
                    data-ai-hint="tree stump forest"
                />
                </div>
            )}
            </div>
        </div>
      </div>

      <footer className="py-8">
        <Button 
          onClick={handleChop} 
          size="lg" 
          className="font-bold text-xl sm:text-2xl px-10 py-6 sm:px-12 sm:py-8 rounded-xl shadow-lg shadow-primary/30 transform active:scale-95 transition-all duration-150 ease-in-out border-2 border-primary-foreground/20 hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isChopping || isTreeFelled}
          aria-label="Chop the tree"
        >
          <Axe className="mr-2 sm:mr-4 h-6 w-6 sm:h-8 sm:w-8" />
          {isTreeFelled ? '...' : 'Chop'}
        </Button>
      </footer>
    </main>
  );
}
