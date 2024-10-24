import { Button } from "@/components";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface IUploadNewCSV {
  processCSVFile: (file: File) => void;
}

export default function UploadNewCSV({ processCSVFile }: IUploadNewCSV) {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.type !== "text/csv" || !file.name.endsWith(".csv")) {
        toast.error("Solo se permiten archivos .csv");
        e.target.value = "";
        return;
      }

      setCsvFile(file);
    }
  };

  const handleProcessFile = () => {
    if (csvFile) {
      processCSVFile(csvFile);
    } else {
      toast.error("No hay archivo válido para procesar.");
    }
  };

  const removeFile = () => {
    setCsvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full h-[calc(100%-80px)] flex justify-center pt-20 px-6">
      <div
        className="
        max-w-[600px] h-auto flex items-start flex-col gap-4 bg-white p-8 border shadow-sm rounded-md
      "
      >
        <h1
          className="
          text-3xl font-bold text-center
          md:text-4xl
        "
        >
          Bienvenido a <span className="text-blue-500">Genios Data</span>
        </h1>
        <span className="text-gray-800 text-center">
          ¡Analiza tus tweets con Inteligencia Artificial!
        </span>
        {csvFile ? (
          <>
            <div className="w-full h-40 flex items-center justify-center mt-4 rounded-md border border-blue-300 bg-blue-50">
              <span className="text-blue-500">
                Archivo cargado exitósamente
              </span>
            </div>
            <div className="w-full flex justify-center gap-4">
              <Button
                title="Analizar archivo"
                className="bg-blue-500 border border-blue-500 text-white"
                onClick={handleProcessFile}
              />
              <Button
                title="Eliminar"
                className="bg-red-500 border border-red-500 text-white"
                onClick={removeFile}
              />
            </div>
          </>
        ) : (
          <div className="w-full mt-4">
            <input
              type="file"
              className="hidden"
              accept=".csv"
              onChange={handleFileUpload}
              id="input-csv"
            />
            <label
              htmlFor="input-csv"
              className="
              w-full h-40 flex items-center justify-center rounded-md border border-blue-300 cursor-pointer hover:bg-blue-50 transition duration-150
            "
            >
              <span className="text-blue-500">
                Click aquí para seleccionar tu archivo .csv
              </span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
