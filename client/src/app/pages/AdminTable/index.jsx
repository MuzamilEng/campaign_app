import React, { useState } from "react";
import {
  useDeleteAdminDataMutation,
  useGetAdminDataQuery,
  useUpdateAdminDataMutation,
  useUpdateAdminStatusMutation,
} from "../../store/storeApi";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormPopup } from "../../components/Popups";
import { useGlobalContext } from "../../context/GlobalStateProvider";
import { Toaster, toast } from "sonner";

const Index = () => {
  const [idToDelete, setIdToDelete] = useState(null);

  const { isError, isLoading, data } = useGetAdminDataQuery();
  const [deleteAdminData, { isLoading: isDeleting, isError: deleteError }] =
    useDeleteAdminDataMutation();

  const handleDelete = async (id) => {
    try {
      await deleteAdminData(id);
      // Optionally, you can refetch data here to update the UI
      console.log("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const [
    updateAdmin,
    {
      isLoading: isUpdating,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
    },
  ] = useUpdateAdminStatusMutation();
  const updateStatus = async (id, status) => {
    try {
      updateAdmin({ id, data: { status } }).unwrap();

      console.log(status);
    } catch (err) {
      console.log(err.message);
    }
  };
  if (isUpdateError) {
    toast.error("Something wrong");
  }
  return (
    <>
      <div className="container mx-auto p-4">
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
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.createdAt}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {item.status}
                  </td>
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
                        className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => updateStatus(item._id, "Approved")}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "approved..." : "Approved"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Index;
