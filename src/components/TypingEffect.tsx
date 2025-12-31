"use client";

import { useState, useEffect, useCallback } from "react";

interface TypingEffectProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  onCharacterChange?: (charIndex: number, wordIndex: number) => void;
}

export default function TypingEffect({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  onCharacterChange,
}: TypingEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleTyping = useCallback(() => {
    const currentWord = words[currentWordIndex];

    if (isPaused) {
      return;
    }

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentWord.length) {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        onCharacterChange?.(currentText.length + 1, currentWordIndex);
      } else {
        // Word complete, pause before deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        onCharacterChange?.(currentText.length - 1, currentWordIndex);
      } else {
        // Move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }
  }, [currentText, currentWordIndex, isDeleting, isPaused, words, pauseDuration, onCharacterChange]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isPaused ? 0 : isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [handleTyping, isDeleting, isPaused, typingSpeed, deletingSpeed]);

  return (
    <span className="text-gradient">
      {currentText}
      <span className="typing-cursor">|</span>
    </span>
  );
}
