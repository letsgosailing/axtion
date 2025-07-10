"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Axe } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AxeLumberjackPage() {
  const [score, setScore] = useState(0);
  const [treeHealth, setTreeHealth] = useState(100);
  const [isChopping, setIsChopping] = useState(false);

  const CHOP_DAMAGE = 20;
  const POINTS_PER_CHOP = 100;

  const handleChop = () => {
    if (treeHealth <= 0 || isChopping) return;

    setIsChopping(true);
    setScore((prevScore) => prevScore + POINTS_PER_CHOP);
    setTreeHealth((prevHealth) => Math.max(0, prevHealth - CHOP_DAMAGE));

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

      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md">
        <div className="w-full space-y-4">
            <h2 className="text-xl font-semibold text-center text-primary-foreground">Tree Health</h2>
            <Progress value={treeHealth} className="w-full h-8 border border-primary-foreground/20" />
            {isTreeFelled && (
                <p className="text-center text-lg text-primary-foreground animate-pulse">New tree growing...</p>
            )}
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
