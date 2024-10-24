import { useState } from "react";

import { ICSVTitles } from "@/interfaces";

export default function useProcessSentiment(tweetsResults: Array<ICSVTitles>) {
  const [sentiment, setSentiment] = useState({
    NEU: 0,
    NEG: 0,
    POS: 0,
  });
  const [options] = useState({
    labels: ["Positivo", "Negativo", "Neutral"],
  });

  const processSentiment = () => {
    const accumulatedSentiment = {
      NEU: 0,
      NEG: 0,
      POS: 0,
    };

    tweetsResults.forEach((tweet) => {
      if (tweet.sentiment) {
        //@ts-ignore
        tweet.sentiment[0].forEach((sentiment) => {
          switch (sentiment.label) {
            case "NEU":
              accumulatedSentiment.NEU += sentiment.score;
              break;
            case "NEG":
              accumulatedSentiment.NEG += sentiment.score;
              break;
            case "POS":
              accumulatedSentiment.POS += sentiment.score;
              break;
          }
        });
      }
      setSentiment((prevSentiment) => ({
        NEG: Math.round(prevSentiment.NEG + accumulatedSentiment.NEU),
        NEU: Math.round(prevSentiment.NEU + accumulatedSentiment.NEG),
        POS: Math.round(prevSentiment.POS + accumulatedSentiment.POS),
      }));
    });
  };

  return { sentiment, options, processSentiment };
}
