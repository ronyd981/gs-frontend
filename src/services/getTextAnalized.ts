import axios from "axios";

import {
  emotionAnalysisUrl,
  sentimentAnalysisUrl,
  VITE_HF_TOKEN,
} from "@/consts";

export default function getTextAnalized() {
  const analyzeText = async (text: string) => {
    try {
      const [emotionResponse, sentimentResponse] = await Promise.all([
        axios.post(
          emotionAnalysisUrl,
          { inputs: text },
          { headers: { Authorization: `Bearer ${VITE_HF_TOKEN}` } }
        ),
        axios.post(
          sentimentAnalysisUrl,
          { inputs: text },
          { headers: { Authorization: `Bearer ${VITE_HF_TOKEN}` } }
        ),
      ]);

      return {
        emotion: emotionResponse.data,
        sentiment: sentimentResponse.data,
      };
    } catch (error: any) {
      throw error;
    }
  };

  return { analyzeText };
}
