"use client";
import { useState } from "react";

export default function CSVUploadForm() {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!files) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    try {
      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Files successfully uploaded");
      } else {
        console.error("Error uploading files");
      }
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" multiple onChange={handleFileChange} />
      <button type="submit">Upload CSV Files</button>
    </form>
  );
}
