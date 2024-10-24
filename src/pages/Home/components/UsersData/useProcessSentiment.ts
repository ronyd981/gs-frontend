import { useState } from "react";

import { ICSVTitles } from "@/interfaces";

export default function useProcessSentiment(tweetsResults: Array<ICSVTitles>) {
  const [chartOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["Neutral", "Negativo", "Positivo"],
    },
  });

  const [seriesData, setSeriesData] = useState([
    {
      data: [0, 0, 0],
    },
  ]);

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

      setSeriesData((prevSeriesData) => [
        {
          data: [
            Math.round(prevSeriesData[0].data[0] + accumulatedSentiment.NEG),
            Math.round(prevSeriesData[0].data[1] + accumulatedSentiment.NEU),
            Math.round(prevSeriesData[0].data[2] + accumulatedSentiment.POS),
          ],
        },
      ]);
    });
  };

  return { chartOptions, seriesData, processSentiment };
}
