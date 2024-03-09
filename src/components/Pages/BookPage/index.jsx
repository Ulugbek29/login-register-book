import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addBook,  searchBooks } from '../../services/booksService'
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function index() {
  const [searchBook, setSearchBook] = useState("")
  const [bookList, setBookList] = useState([])
  const [loader, setLoader] = useState(false)


  useEffect(()=> {
      const handler = setTimeout(() => {
        searchBookInput()
      }, 500);
      return () => {
        clearTimeout(handler);
  };
   
  },[searchBook])


 

  const searchBookInput = ()=> {
    setLoader(true)
        searchBooks(searchBook)
        .then((res)=> setBookList(res.data.data))
        .catch((err)=> console.log(err))
        .finally(()=> setLoader(false))
  }

  const addToBookShelf = (isbn)=> {
    addBook(isbn)
    .then(res => {
      toast.success('Succesfully added', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    })
    .catch((err) => console.log(err))
  }

  console.log(bookList);
  return (
    <>
    <div className='w-full h-full flex flex-col gap-8 items-center py-4 px-[8%]'>
        <div className='flex flex-col gap-4'>
            <h3 className='text-lg font-semibold'>Search Book</h3>
            <input value={searchBook} onChange={(e)=> setSearchBook(e.target.value)} className='px-4 py-2 w-[300px] rounded-lg border' placeholder='Search book...'/>
        </div>

        
        {loader ? (
        <div className='w-full flex justify-center'>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className='w-full grid grid-cols-4 gap-4'>
          {bookList.map((book) => (
            <div key={book.id} className="w-full flex flex-col justify-between gap-2 px-6 py-8 rounded-lg shadow-xl" >
              <div className='w-full h-[250px]'>
                <img src={book.cover === "" ? "/no-image.jpg" : book.cover} className="w-full h-full object-cover"/>
              </div>
              <div>
              <h2 className='text-lg font-semibold'>{book.title}</h2>
              <p className='text-lg'>{book.author}</p>
              </div>
              <div className='w-full flex justify-end'>
              <Button variant="contained" onClick={()=>addToBookShelf(book.isbn)} ><AddIcon /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {bookList.length === 0 && !loader && (
        <h3 className='text-xl font-bold text-center'>
          In order to add the book to your bookShelf, <br /> search for the book, it might take some seconds
        </h3>
      )}
    </div>
        <ToastContainer />
    </>
  )
}
