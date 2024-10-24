import { Menu } from "@/components";
import {
  FileUpload,
  EmotionsData,
  UsersData,
  EmotionsPercentages,
  UploadNewCSV,
} from "./components";
import { useGetEmotionsData } from "@/hooks";

export default function Home() {
  const { tweetsResults, processCSVFile } = useGetEmotionsData();

  return (
    <main
      className="
      w-full min-h-[100dvh] bg-zinc-50
    "
    >
      <Menu />
      {tweetsResults && tweetsResults.length > 0 ? (
        <section
          className="
          max-w-[1535px] flex flex-col gap-6 mx-auto mt-12 px-6 pb-4
        "
        >
          <div
            className="
            w-full flex justify-between gap-4 flex-wrap
          "
          >
            <h1
              className="
              text-3xl font-bold
              md:text-4xl
            "
            >
              Bienvenido a <span className="text-blue-500">Genios Data</span>
            </h1>
            <FileUpload processCSVFile={processCSVFile} />
          </div>
          <div
            className="
            grid grid-cols-5 gap-4
            xl:grid-rows-1
          "
          >
            <EmotionsData tweetsResults={tweetsResults} />
            <UsersData tweetsResults={tweetsResults} />
            <EmotionsPercentages tweetsResults={tweetsResults} />
          </div>
        </section>
      ) : (
        <UploadNewCSV processCSVFile={processCSVFile} />
      )}
    </main>
  );
}
