import { useEffect } from "react";
import Chart from "react-apexcharts";

import { ICSVTitles } from "@/interfaces";
import useProcessEmotion from "./useProcessEmotion";
import useProcessSentiment from "./useProcessSentiment";

interface IEmotionsDataProps {
  tweetsResults: Array<ICSVTitles>;
}

export default function EmotionsData({ tweetsResults }: IEmotionsDataProps) {
  const {
    emotion,
    options: emotionOptions,
    processEmotion,
  } = useProcessEmotion(tweetsResults);
  const {
    sentiment,
    options: sentimentOptions,
    processSentiment,
  } = useProcessSentiment(tweetsResults);

  useEffect(() => {
    if (tweetsResults.length > 0) {
      processEmotion();
      processSentiment();
    }
  }, [tweetsResults]);

  const emotionSeries = Object.values(emotion);
  const sentimentSeries = Object.values(sentiment);

  return (
    <div
      className="
      w-full h-full flex flex-col gap-4 row-start-2 col-span-5
      lg:row-start-1 lg:col-span-2
      xl:col-auto
    "
    >
      <div
        className="
        w-full flex items-center justify-center p-2 bg-white border shadow-sm rounded-md hover:shadow-md transition duration-150 overflow-hidden
        lg:h-1/2
      "
      >
        <div>
          <Chart
            options={emotionOptions}
            series={emotionSeries}
            type="donut"
            width="100%"
            height="100%"
          />
        </div>
      </div>

      <div
        className="
        w-full flex items-center justify-center p-2 border shadow-sm rounded-md hover:shadow-md transition duration-150 overflow-hidden
        lg:h-1/2
      "
      >
        <div>
          <Chart
            options={sentimentOptions}
            series={sentimentSeries}
            type="donut"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}
