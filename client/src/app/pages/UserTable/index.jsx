import React, { useEffect, useState } from "react";
import { useDeleteAdminDataMutation, useGetAdminDataQuery } from "../../store/storeApi";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormPopup } from "../../components/Popups";
import { useGlobalContext } from "../../context/GlobalStateProvider";
import Loading from "../../components/Loading";

const Index = () => {
  const [popup, setPopup] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const {uploadFile} = useGlobalContext()
  const { isError, isLoading, data, refetch: refetchUserData } = useGetAdminDataQuery();
  const formatDate = (dateString) => {
    const options = { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  const [deleteAdminData, { isLoading: isDeleting, isError: deleteError }] = useDeleteAdminDataMutation();

  const showPopup = (id) => {
    setPopup(true);
    setIdToDelete(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAdminData(id);
      // Optionally, you can refetch data here to update the UI
      console.log("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(()=> {
    refetchUserData()
  }, [uploadFile])

  return (
    <>
      <div className="flex justify-center items-center -mt-[1vw] w-full">
        {isError && <div>Error loading data</div>}
        {isLoading ? (
          <div className="w-full h-[10vw]"><Loading /></div>
        ) : (
          <table className="w-full max-w-[70vw]  table-auto border-collapse border border-gray-300 shadow rounded mt-[2vw]">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Check</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Created at</th>

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
                  <td className="border border-gray-300 items-center text-center px-4 py-2">
                    {item.name}
                  </td>

                  <td className={`border border-gray-300 items-center text-center px-4 py-2 ${item?.status === 'Awaiting' ? 'text-yellow-600' : 'text-green-600'}`}>
                    {item.status}
                  </td>
                  <td className="border border-gray-300 items-center text-center px-4 py-2">
                  {formatDate(item.createdAt)}
                  </td>
                  <td className="border border-gray-300 p-[0.7vw]">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="bg-blue-700 hover:bg-blue-800 text-[1vw] text-white w-[2vw] h-[2vw] flex items-center justify-center rounded-md transition duration-300 ease-in-out transform hover:scale-105 "
                        onClick={() => showPopup(item._id)}
                      >
                        <Icon icon="bx:edit" />
                      </button>
                      <button
                        className="bg-red-700 hover:bg-red-800 text-white text-[1vw] w-[2vw] h-[2vw] flex items-center justify-center rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => handleDelete(item._id)}
                        disabled={isDeleting}
                      >
                        <Icon icon="material-symbols:delete-outline" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {popup ? <FormPopup setPopup={setPopup} id={idToDelete} /> : null}
    </>
  );
};

export default Index;
