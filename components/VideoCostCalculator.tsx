"use client";

import { useState } from "react";
import { costPerAcceptedMinute } from "@/lib/video-cost";

export default function VideoCostCalculator() {
  const [spend, setSpend] = useState("");
  const [seconds, setSeconds] = useState("");
  const ready = spend.trim() !== "" && seconds.trim() !== "";
  const result = ready ? costPerAcceptedMinute(Number(spend), Number(seconds)) : null;
  return <section className="article-checklist" aria-labelledby="video-cost-heading">
    <h2 id="video-cost-heading">Calculate cost per accepted video minute</h2>
    <p>Enter actual generation spend and footage you accepted. Use one currency throughout. This calculates your inputs; it is not a provider quote or a benchmark. Values stay in this page and are not submitted.</p>
    <p><label>Total generation spend in your currency<br /><input type="number" min="0" step="any" value={spend} onChange={e => setSpend(e.target.value)} /></label></p>
    <p><label>Accepted footage in seconds<br /><input type="number" min="0" step="any" value={seconds} onChange={e => setSeconds(e.target.value)} /></label></p>
    <p role="status" aria-live="polite">{!ready ? "Enter both values to calculate." : result === null ? "No rate: use nonnegative finite values and more than zero accepted seconds. Zero accepted footage is not free output." : `Cost per accepted minute: ${result.toLocaleString(undefined, { maximumFractionDigits: 2 })} in your currency.`}</p>
    <p>Formula: generation spend ÷ accepted seconds × 60. Include rejected takes in spend; count accepted footage only once. Editing, upscaling and audio costs are separate.</p>
  </section>;
}
