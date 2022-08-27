import React, { useState } from "react";
const [progress, setProgress] = React.useState(100);

function oldTimer() {
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(function (prevProgress) {
        var time = prevProgress - 0.2;
        console.log(time);
        return time;
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);
}
