import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TicTacToe = () => {
  const { toast } = useToast();
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'draw'>('playing');
  const [winner, setWinner] = useState<string | null>(null);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const checkWinner = (newBoard: (string | null)[]) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || gameStatus !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    
    const gameWinner = checkWinner(newBoard);
    
    if (gameWinner) {
      setWinner(gameWinner);
      setGameStatus('won');
      toast({
        title: "Game Over! 🎉",
        description: `Player ${gameWinner} wins!`,
      });
    } else if (newBoard.every(cell => cell !== null)) {
      setGameStatus('draw');
      toast({
        title: "Game Over! 🤝",
        description: "It's a draw!",
      });
    }

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus('playing');
    setWinner(null);
  };

  const getStatusMessage = () => {
    if (gameStatus === 'won') {
      return `Player ${winner} wins!`;
    }
    if (gameStatus === 'draw') {
      return "It's a draw!";
    }
    return `Player ${isXNext ? 'X' : 'O'}'s turn`;
  };

  const getStatusColor = () => {
    if (gameStatus === 'won') return 'bg-green-100 text-green-800 border-green-200';
    if (gameStatus === 'draw') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <Card className="bg-gradient-card shadow-medical border-0 max-w-sm mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-foreground text-lg">
          <Gamepad2 className="w-5 h-5 text-medical-blue" />
          Tic Tac Toe
        </CardTitle>
        <CardDescription className="text-sm">
          Take a quick brain break with a classic game
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Game Status */}
        <div className={`p-2 rounded-lg border text-center text-sm font-medium ${getStatusColor()}`}>
          {getStatusMessage()}
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
          {board.map((cell, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-16 w-16 text-2xl font-bold border-2 border-medical-blue/30 hover:border-medical-blue hover:bg-medical-blue/10"
              onClick={() => handleClick(index)}
              disabled={gameStatus !== 'playing' || cell !== null}
            >
              {cell && (
                <span className={cell === 'X' ? 'text-medical-blue' : 'text-wellness-green'}>
                  {cell}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Game Controls */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={resetGame}
            className="flex items-center gap-2 border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
            New Game
          </Button>
        </div>

        {/* Game Stats */}
        <div className="flex justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-medical-blue"></span>
            <span>Player X</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-wellness-green"></span>
            <span>Player O</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            🧠 Playing games can help reduce stress and improve focus
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicTacToe;