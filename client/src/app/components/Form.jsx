import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { dashboardForm } from "../data";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useSubmitFormMutation } from "../store/storeApi";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalStateProvider";

const Form = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [submitData, { isLoading, isError, error, isSuccess, success }] =
    useSubmitFormMutation();
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

  const onSubmitSuccess = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", data.name);
    formData.append("time", data.time);
    formData.append("date", data.date);
    console.log(data);
    submitData(formData);
  };
  if (error) {
    toast.error(error.data.message);
    console.log(error);
  }
  if (isSuccess) {
    toast.success("Form Submitted Successfully");

    navigate("/userTable");
  }
  return (
    <main className="flex justify-center items-center mt-[5vw]">
      <Toaster position="top-center" />
      <form
        className="shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 bg-green-100 bg-opacity-90" // Adjusted bg-green-100
        onSubmit={handleSubmit(onSubmitSuccess)}
      >
        <input
          type="file"
          accept=".csv"
          name=""
          id=""
          onChange={handleFileChange}
          className="mb-4 w-full px-4 py-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {dashboardForm.map((elem, index) => (
          <div key={index} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={elem.name}
            >
              {elem.label}
            </label>
            <Controller
              name={elem.name}
              control={control}
              defaultValue={elem.value}
              rules={elem.rules}
              render={({ field }) => (
                <input
                  {...field}
                  id={elem.name}
                  type={elem.type}
                  className="mb-2 w-full px-4 py-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={elem.placeholder}
                />
              )}
            />
            {errors[elem.name] && (
              <p className="text-red-500 text-xs italic">
                {errors[elem.name].message}
              </p>
            )}
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            className={`${
              isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "UpisLoading..." : "Submit"}
          </button>
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            type="button"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </form>
    </main>
  );
};

export default Form;
