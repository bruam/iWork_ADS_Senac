import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";

export default function Clock({
  expiryTimestamp,
  started,
  paused,
  clockCallback,
  concludeTask,
}) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => concludeTask(),
  });

  useEffect(() => {
    if (started === true) {
      resume();
    } else {
      pause();
      clockCallback(minutes, seconds);
      console.log(minutes);
      console.log(seconds);
    }
  }, [started, paused]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "50px" }}>
        <span>{minutes}</span>:
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
    </div>
  );
}
