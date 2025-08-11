import { useState, useEffect, useCallback, useRef } from 'react';

export interface TypewriterOptions {
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenStrings?: number;
  delayBeforeDelete?: number;
  loop?: boolean;
  cursor?: string;
  showCursor?: boolean;
  pauseOnHover?: boolean;
  startDelay?: number;
}

export interface TypewriterState {
  text: string;
  isTyping: boolean;
  isDeleting: boolean;
  currentIndex: number;
  isPaused: boolean;
}

export const useTypewriter = (
  strings: string[],
  options: TypewriterOptions = {}
) => {
  const {
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenStrings = 2000,
    delayBeforeDelete = 1000,
    loop = true,
    cursor = '|',
    showCursor = true,
    pauseOnHover = false,
    startDelay = 0,
  } = options;

  const [state, setState] = useState<TypewriterState>({
    text: '',
    isTyping: false,
    isDeleting: false,
    currentIndex: 0,
    isPaused: false,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);
  const hasStartedRef = useRef(false);

  const clearCurrentTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleNextAction = useCallback(
    (callback: () => void, delay: number) => {
      clearCurrentTimeout();
      timeoutRef.current = setTimeout(() => {
        if (!pauseOnHover || !isHoveredRef.current) {
          callback();
        } else {
          // Reschedule if paused
          scheduleNextAction(callback, 50);
        }
      }, delay);
    },
    [clearCurrentTimeout, pauseOnHover]
  );

  const typeNextCharacter = useCallback(() => {
    if (strings.length === 0) return;

    setState((prevState) => {
      const currentString = strings[prevState.currentIndex];
      const isComplete = prevState.text === currentString;

      if (isComplete) {
        // Start deletion after delay
        scheduleNextAction(() => {
          setState((prev) => ({
            ...prev,
            isTyping: false,
            isDeleting: true,
          }));
          deleteCharacter();
        }, delayBeforeDelete);

        return {
          ...prevState,
          isTyping: false,
        };
      }

      const nextText = currentString.slice(0, prevState.text.length + 1);
      
      scheduleNextAction(typeNextCharacter, typingSpeed);

      return {
        ...prevState,
        text: nextText,
        isTyping: true,
      };
    });
  }, [strings, typingSpeed, delayBeforeDelete, scheduleNextAction]);

  const deleteCharacter = useCallback(() => {
    setState((prevState) => {
      if (prevState.text.length === 0) {
        // Move to next string
        const nextIndex = loop
          ? (prevState.currentIndex + 1) % strings.length
          : Math.min(prevState.currentIndex + 1, strings.length - 1);

        const shouldContinue = loop || nextIndex < strings.length;

        if (shouldContinue) {
          scheduleNextAction(() => {
            setState((prev) => ({
              ...prev,
              isDeleting: false,
              isTyping: true,
            }));
            typeNextCharacter();
          }, delayBetweenStrings);
        }

        return {
          ...prevState,
          currentIndex: nextIndex,
          isDeleting: false,
          isTyping: shouldContinue,
        };
      }

      const nextText = prevState.text.slice(0, -1);
      
      scheduleNextAction(deleteCharacter, deletingSpeed);

      return {
        ...prevState,
        text: nextText,
        isDeleting: true,
      };
    });
  }, [strings.length, loop, deletingSpeed, delayBetweenStrings, scheduleNextAction, typeNextCharacter]);

  const startTypewriter = useCallback(() => {
    if (strings.length === 0 || hasStartedRef.current) return;

    hasStartedRef.current = true;
    
    setState({
      text: '',
      isTyping: true,
      isDeleting: false,
      currentIndex: 0,
      isPaused: false,
    });

    if (startDelay > 0) {
      scheduleNextAction(typeNextCharacter, startDelay);
    } else {
      typeNextCharacter();
    }
  }, [strings.length, startDelay, scheduleNextAction, typeNextCharacter]);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: true }));
    isHoveredRef.current = true;
  }, []);

  const resume = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: false }));
    isHoveredRef.current = false;
  }, []);

  const reset = useCallback(() => {
    clearCurrentTimeout();
    hasStartedRef.current = false;
    setState({
      text: '',
      isTyping: false,
      isDeleting: false,
      currentIndex: 0,
      isPaused: false,
    });
  }, [clearCurrentTimeout]);

  useEffect(() => {
    startTypewriter();

    return () => {
      clearCurrentTimeout();
    };
  }, [startTypewriter, clearCurrentTimeout]);

  useEffect(() => {
    return () => {
      clearCurrentTimeout();
    };
  }, [clearCurrentTimeout]);

  const displayText = showCursor ? `${state.text}${cursor}` : state.text;

  return {
    text: displayText,
    isTyping: state.isTyping,
    isDeleting: state.isDeleting,
    currentIndex: state.currentIndex,
    isPaused: state.isPaused,
    pause,
    resume,
    reset,
  };
};
