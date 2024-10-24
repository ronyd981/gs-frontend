import { useState } from "react";

import { ICSVTitles } from "@/interfaces";

export default function useProcessEmotion(tweetsResults: Array<ICSVTitles>) {
  const [emotion, setEmotion] = useState({
    anger: 0,
    others: 0,
    disgust: 0,
    fear: 0,
    sadness: 0,
    surprise: 0,
    joy: 0,
  });
  const [options] = useState({
    labels: [
      "Ira",
      "Otros",
      "Asco",
      "Miedo",
      "Tristeza",
      "Sorpresa",
      "Alegría",
    ],
  });

  const processEmotion = () => {
    const accumulatedEmotions = {
      anger: 0,
      others: 0,
      disgust: 0,
      fear: 0,
      sadness: 0,
      surprise: 0,
      joy: 0,
    };

    tweetsResults.forEach((tweet) => {
      if (tweet.emotion) {
        //@ts-ignore
        tweet.emotion[0].forEach((emotion) => {
          switch (emotion.label) {
            case "anger":
              accumulatedEmotions.anger += emotion.score;
              break;
            case "disgust":
              accumulatedEmotions.disgust += emotion.score;
              break;
            case "fear":
              accumulatedEmotions.fear += emotion.score;
              break;
            case "sadness":
              accumulatedEmotions.sadness += emotion.score;
              break;
            case "surprise":
              accumulatedEmotions.surprise += emotion.score;
              break;
            case "joy":
              accumulatedEmotions.joy += emotion.score;
              break;
            default:
              accumulatedEmotions.others += emotion.score;
              break;
          }
        });
      }
      setEmotion((prevEmotion) => ({
        anger: Math.round(prevEmotion.anger + accumulatedEmotions.anger),
        others: Math.round(prevEmotion.others + accumulatedEmotions.others),
        disgust: Math.round(prevEmotion.disgust + accumulatedEmotions.disgust),
        fear: Math.round(prevEmotion.fear + accumulatedEmotions.fear),
        sadness: Math.round(prevEmotion.sadness + accumulatedEmotions.sadness),
        surprise: Math.round(
          prevEmotion.surprise + accumulatedEmotions.surprise
        ),
        joy: Math.round(prevEmotion.joy + accumulatedEmotions.joy),
      }));
    });
  };

  return { emotion, options, processEmotion };
}
