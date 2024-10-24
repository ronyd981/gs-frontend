import { useEffect, useState } from "react";
import Papa from "papaparse";
import { toast } from "react-hot-toast";

import { ICSVTitles } from "@/interfaces";
import { getTextAnalized } from "@/services";

export default function useGetEmotionsData() {
  const [tweetsResults, setTweetsResults] = useState<Array<ICSVTitles>>([]);

  const { analyzeText } = getTextAnalized();

  const processCSVFile = (file: File) => {
    const toastId = toast.loading("Estamos procesando su información...");

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const data = results.data;
        const tempResults: Array<ICSVTitles> = [];

        for (let i = 0; i < data.length; i++) {
          const row = data[i] as ICSVTitles;
          const { text, comments, shares, likes, reactions_count } = row;

          if (text) {
            try {
              const analysisResult = await analyzeText(text);

              if (analysisResult) {
                const tweetResult: ICSVTitles = {
                  text,
                  comments,
                  shares,
                  likes,
                  reactions_count,
                  emotion: analysisResult.emotion,
                  sentiment: analysisResult.sentiment,
                };

                tempResults.push(tweetResult);

                if (tempResults.length === 10) {
                  setTweetsResults((prev) => [...prev, ...tempResults]);
                  localStorage.setItem(
                    "tweetsResults",
                    JSON.stringify([...tweetsResults, ...tempResults])
                  );
                  tempResults.length = 0;
                }
              }
            } catch (error: any) {
              if (error.response?.status === 503) {
                toast.error(
                  "El modelo está temporalmente inactivo. Inténtalo más tarde."
                );
              } else if (error.response?.status === 429) {
                toast.error("Límite de tokens excedido. Inténtalo más tarde.");
              } else {
                toast.error("Error llamando a la modelo, vuelve a intentar.");
              }
              toast.dismiss(toastId);
              break;
            }
          }
        }

        if (tempResults.length > 0) {
          setTweetsResults((prev) => [...prev, ...tempResults]);
          localStorage.setItem(
            "tweetsResults",
            JSON.stringify([...tweetsResults, ...tempResults])
          );
          toast.success("Análisis completado.");
        }

        toast.dismiss(toastId);
      },
    });
  };

  useEffect(() => {
    const storedResults = localStorage.getItem("tweetsResults");
    if (storedResults) {
      setTweetsResults(JSON.parse(storedResults));
    }
  }, []);

  return { tweetsResults, processCSVFile };
}
