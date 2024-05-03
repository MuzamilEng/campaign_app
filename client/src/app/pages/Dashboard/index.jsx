import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

const Index = () => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Check if a file was selected
    if (file) {
      // Check if the file has a .csv extension
      if (file.name.endsWith(".csv")) {
        setSelectedFile(file);
      } else {
        // If the file doesn't have a .csv extension, alert the user
        alert("Please select a CSV file.");
      }
    }
  };
  const uploadFile = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("csvFile", selectedFile);
    try {
      const res = await axios.post(`${apiUrl}/upload`, formData);
      console.log(res);
      toast.success(res.data.message);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      toast.error("Error uploading file");
      setLoading(false);
    }
  };
  return (
    <div>
      <Toaster position="top-center" />
      <h1 className="text-3xl bg-blue-200 p-[2vw]">Dashboard</h1>
      <div className="w-full flex justify-center h-[30vh] items-center">
        <form
          className=" bg-blue-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-blue-200 p-[2vw]"
          onSubmit={uploadFile}
        >
          <input
            type="file"
            accept=".csv"
            name=""
            id=""
            onChange={handleFileChange}
          />
          <input
            type="submit"
            value={loading ? "loading..." : "upload"}
            className="p-[0.5vw] bg-blue-200 rounded-md cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Index;
