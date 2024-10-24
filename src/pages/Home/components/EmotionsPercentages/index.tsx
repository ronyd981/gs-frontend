import { useEffect } from "react";

import { ICSVTitles } from "@/interfaces";
import useProcessEmotionPercentages from "./useProcessEmotionPercentajes";

interface ISentimentsDataProps {
  tweetsResults: Array<ICSVTitles>;
}

export default function EmotionsPercentajes({
  tweetsResults,
}: ISentimentsDataProps) {
  const { options, percentages, processEmotion } =
    useProcessEmotionPercentages(tweetsResults);

  useEffect(() => {
    if (tweetsResults) processEmotion();
  }, [tweetsResults]);

  const emotionKeys = [
    "anger",
    "others",
    "disgust",
    "fear",
    "sadness",
    "surprise",
    "joy",
  ] as const;

  const colors: Record<(typeof emotionKeys)[number], string> = {
    anger: "bg-red-500",
    others: "bg-gray-500",
    disgust: "bg-green-500",
    fear: "bg-purple-500",
    sadness: "bg-blue-500",
    surprise: "bg-yellow-500",
    joy: "bg-orange-500",
  };

  return (
    <div
      className="
      w-full h-full flex flex-col gap-4 col-span-5 p-4 bg-white border shadow-sm rounded-md hover:shadow-md transition duration-150
      lg:row-start-2
      xl:row-start-1
  "
    >
      <h2 className="text-xl font-bold">Porcentajes de emociones</h2>
      {emotionKeys.map((key, index) => (
        <div key={key} className="w-full">
          <div className="flex justify-between mb-1">
            <span className="font-semibold">{options.labels[index]}:</span>
            <span>{percentages[key].toFixed(2)}%</span>
          </div>

          <div className="w-full h-2.5 bg-gray-100 rounded-sm">
            <div
              className={`h-full ${colors[key]} rounded-sm`}
              style={{ width: `${percentages[key]}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
