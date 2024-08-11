import { useEffect, useState } from 'react';

type TimerPropsType = {
  time: number;
  action: () => void;
};

const Timer = ({ time, action }: TimerPropsType) => {
  // states
  const [timeLeft, setTimeLeft] = useState<number>(time);

  // count down the time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          action();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [action]);

  return (
    <>
      <p>
        {Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, '0')}
        :{(timeLeft % 60).toString().padStart(2, '0')}
      </p>
    </>
  );
};

export default Timer;
