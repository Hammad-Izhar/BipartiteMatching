import React, { useEffect, useState } from "react";

const UploadButton = () => {
  const [uploadedFile, setUploadedFile] = useState<File>();

  useEffect(() => {
    console.log(uploadedFile);
  }, [uploadedFile]);

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;
    if (files === null) return;
    setUploadedFile(files[0]);
  };

  return (
    <label htmlFor="CSV-upload-button">
      <div className="bg-green rounded-full w-fit px-5 font-bold">
        Import CSV
      </div>
      <input onChange={handleFile} type="file" id="CSV-upload-button" hidden />
    </label>
  );
};

export default UploadButton;
