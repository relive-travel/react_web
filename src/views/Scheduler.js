import useLoginInterval from "hooks/useLoginInterval";

function Scheduler() {
  useLoginInterval(process.env.REACT_APP_INTERVAL_TIME);

  return null;
}

export default Scheduler;
