import { useState, useRef } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components";

interface IFileUploadProps {
  processCSVFile: (file: File) => void;
}

export default function FileUpload({ processCSVFile }: IFileUploadProps) {
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
    <div>
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        id="input-csv"
      />
      {csvFile ? (
        <div className="flex gap-2">
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
      ) : (
        <div className="flex items-center gap-2">
          <p>Analizar otro archivo</p>
          <label
            htmlFor="input-csv"
            className="
            max-w-max px-4 py-1.5 rounded-md hover:brightness-90 font-semibold transition duration-150 outline-none border border-blue-500 text-blue-500 cursor-pointer
          "
          >
            Subir archivo
          </label>
        </div>
      )}
    </div>
  );
}
