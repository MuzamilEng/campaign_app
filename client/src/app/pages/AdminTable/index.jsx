import React, { useState } from "react";
import { useDeleteAdminDataMutation, useGetAdminDataQuery, useUpdateAdminDataMutation, useUpdateAdminStatusMutation } from "../../store/storeApi";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormPopup } from "../../components/Popups";
import { useGlobalContext } from "../../context/GlobalStateProvider";
import { Toaster, toast } from "sonner";
import AdminLayout from "../../Layout/AdminLayout";
import { parse } from 'papaparse';


const Index = () => {
  const [idToDelete, setIdToDelete] = useState(null);
  const apiUrl = 'http://localhost:5173' || import.meta.env.VITE_REACT_API_URL;
  const { isError, isLoading, data } = useGetAdminDataQuery();
  const [deleteAdminData, { isLoading: isDeleting, isError: deleteError }] =  useDeleteAdminDataMutation();
  const formatDate = (dateString) => {
    const options = { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  const handleDelete = async (id) => {
    try {
      await deleteAdminData(id);
      console.log("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const [updateAdmin, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError}] = useUpdateAdminStatusMutation();
  const updateStatus = async (id, status) => {
    try {
      updateAdmin({ id, data: { status } }).unwrap();
      console.log(status);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleView = (fileName) => {
    window.open(`/temp/${fileName}`, "_blank");
  };
  
  const downloadCsvFile = async (fileName) => {
    try {
      // Fetch CSV data from the server
      const response = await fetch(`${apiUrl}/public/temp/${fileName}`);
      const csvData = await response.text();
  
      // Parse CSV data using papaparse
      const parsedData = parse(csvData, { header: true });
  
      // Convert CSV data to text format
      const textContent = parsedData.data.map(row => Object.values(row).join(',')).join('\n');
  
      // Create a Blob containing the text data
      const blob = new Blob([textContent], { type: 'text/plain' });
  
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
  
      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.txt`); // Set the file name and extension
  
      // Append the link to the body and trigger the download
      document.body.appendChild(link);
      link.click();
  
      // Clean up by revoking the URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CSV file:', error);
    }
  }; 

  
  if (isUpdateError) {
    toast.error("Something wrong");
  }
  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-[2vw] w-full mt-[3vw] text-center font-bold mb-4">Admin Dashboard</h1>
        <Toaster />
        {isError && <div>Error loading data</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300 shadow rounded mt-[2vw]">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Check</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Created at</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatDate(item.createdAt)}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                  <td className="border border-gray-300 px-4 py-[0.5vw]">
                    <div className="flex gap-8 justify-center">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => updateStatus(item._id, "Reject")}
                        disabled={isDeleting}
                      >
                        {isUpdating ? "reject..." : "Reject"}
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => updateStatus(item._id, "Approved")}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "approved..." : "Approved"}
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => downloadCsvFile(item.filePath)}
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default Index;
