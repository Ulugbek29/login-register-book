import { Button } from "@mui/base";
import React, { useEffect, useState } from "react";
import { changeStatus, deleteBook, getBooks } from "../../services/booksService";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function index() {
  const [personalLibrary, setPersonalLibrary] = useState([]);
  const [selectedOption, setSelectedOption] = useState("0");

  useEffect(() => {
    getPersonalLibrary()
  }, [selectedOption]);


  const getPersonalLibrary = ()=> {
        getBooks()
        .then((res) => setPersonalLibrary(res.data.data))
        .catch((err) => console.log(err));
  }



  const handleOptionChange = (id, status) => {
    setSelectedOption(status);
    changeStatus(id, +status)
    .then((res)=> {
        toast.success('Succesfully changed', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        getPersonalLibrary()
    })
    .catch((err) => console.log(err))
  };

  const deletePersonalBook = (id) => {
    deleteBook(id)
      .then((res) => {
        toast.success('Succesfully Deleted', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        getPersonalLibrary()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <div className="px-[7%] py-8">
    {personalLibrary && personalLibrary.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
        {personalLibrary.map((book) => (
          <div
            key={book.book.id}
            className="w-full h-full flex flex-col justify-between gap-2 items-start px-6 py-8 rounded-lg shadow-xl"
          >
            <div className='w-full h-[250px]'>
                <img src={book.book.cover === "" ? "/no-image.jpg" : book.book.cover} className="w-full h-full object-cover"/>
              </div>
              <div>
            <h2 className="text-lg font-semibold">{book.book.title}</h2>
            <p className="text-lg">{book.book.author}</p>
              </div>

            <div className="w-full flex items-start justify-between gap-4">
              <select 
              value={book.status} 
              onChange={(e)=>handleOptionChange(book.book.id, e.target.value)}
              className="cursor-pointer w-full px-4 py-2 mt-1 text-sm text-gray-700 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              >
                <option value="0">New</option>
                <option value="1">Reading</option>
                <option value="2">Finished</option>
              </select>
              <IconButton onClick={()=>deletePersonalBook(book.book.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex justify-center">
            <p className="text-lg font-semibold">No books available in your personal library.</p>
      </div>
    )}
     
      
    </div>
    <ToastContainer />
    </>
  );
}
