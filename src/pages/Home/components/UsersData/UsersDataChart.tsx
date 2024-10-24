import { useEffect } from "react";
import Chart from "react-apexcharts";

import { ICSVTitles } from "@/interfaces";
import useProcessSentiment from "./useProcessSentiment";

interface IUsersDataChartProps {
  tweetsResults: Array<ICSVTitles>;
}

export default function UsersDataChart({
  tweetsResults,
}: IUsersDataChartProps) {
  const { chartOptions, seriesData, processSentiment } =
    useProcessSentiment(tweetsResults);

  useEffect(() => {
    if (tweetsResults) processSentiment();
  }, [tweetsResults]);

  return (
    <div className="w-full h-[350px] p-4 bg-white border shadow-sm rounded-md hover:shadow-md transition duration-150 overflow-hidden">
      <Chart
        options={chartOptions}
        series={seriesData}
        type="bar"
        width="100%"
        height={"100%"}
      />
    </div>
  );
}
