import { useState, useEffect } from "react";
import { ICSVTitles } from "@/interfaces";

export default function useProcessEmotionPercentages(
  tweetsResults: Array<ICSVTitles>
) {
  const [emotion, setEmotion] = useState({
    anger: 0,
    others: 0,
    disgust: 0,
    fear: 0,
    sadness: 0,
    surprise: 0,
    joy: 0,
  });

  const [percentages, setPercentages] = useState({
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
    });

    setEmotion((prevEmotion) => ({
      anger: prevEmotion.anger + accumulatedEmotions.anger,
      others: prevEmotion.others + accumulatedEmotions.others,
      disgust: prevEmotion.disgust + accumulatedEmotions.disgust,
      fear: prevEmotion.fear + accumulatedEmotions.fear,
      sadness: prevEmotion.sadness + accumulatedEmotions.sadness,
      surprise: prevEmotion.surprise + accumulatedEmotions.surprise,
      joy: prevEmotion.joy + accumulatedEmotions.joy,
    }));
  };

  useEffect(() => {
    const totalEmotions =
      emotion.anger +
      emotion.others +
      emotion.disgust +
      emotion.fear +
      emotion.sadness +
      emotion.surprise +
      emotion.joy;

    if (totalEmotions > 0) {
      setPercentages({
        anger: (emotion.anger / totalEmotions) * 100,
        others: (emotion.others / totalEmotions) * 100,
        disgust: (emotion.disgust / totalEmotions) * 100,
        fear: (emotion.fear / totalEmotions) * 100,
        sadness: (emotion.sadness / totalEmotions) * 100,
        surprise: (emotion.surprise / totalEmotions) * 100,
        joy: (emotion.joy / totalEmotions) * 100,
      });
    }
  }, [emotion]);

  return { emotion, percentages, options, processEmotion };
}
