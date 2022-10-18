import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useTimer } from "react-timer-hook";

export default function Clock({ expiryTimestamp, started }) {
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
    onExpire: () => console.warn("onExpire called"),
  });

  const handleStart = (started) => {
    console.log(started);
    if (started) start();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "80px" }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <Button variant="outline-secondary me-2" onClick={handleStart}>
        Iniciar
      </Button>
      <Button variant="outline-secondary" onClick={pause}>
        Pausar
      </Button>
      {/* <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 30 * 60);
          restart(time);
        }}
      >
        Restart
      </button> */}
    </div>
  );
}
