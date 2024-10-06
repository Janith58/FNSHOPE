import { useState } from "react";
import {getDownloadURL, getStorage} from 'firebase/storage';
import {app} from '../firebase';
import { ref, uploadBytesResumable } from 'firebase/storage';


const CreateListing = () => {
  const [files,setFiles]=useState([]);
  const [formData,setFormData]=useState({imageUrls:[]});
  const [imageUploadError,setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log(formData);

  const handleImageSubmite =()=>{
    if(files.length > 0 && files.length+formData.imageUrls.length < 7){
      setUploading(true);
      setImageUploadError(false);
      const promises =[];
      for(let i = 0; i<files.length; i++){
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises).then((urls)=>{
        setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)});
        setImageUploadError(false);
        setUploading(false);
        
      }).catch((err)=>{
        setImageUploadError('Image upload failed (2mb max for image)');
        setUploading(false);
      });
      
    }else{
      setImageUploadError('You can upload up to 6 images');
      setUploading(false);
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve,reject) => {
      const storage =getStorage(app);
      const fileName =new Date().getTime()+file.name;
      const storageRef= ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            resolve(downloadURL);
              });
          }
      );
    })
  }
  const handleRemoveImage =(index)=>{
    setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i)=>i !== index)
    })
  }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a new listing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className='flex flex-col gap-4 flex-1 '>
          <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' required/>
          <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description' required/>
          <input type='number' placeholder='price' className='border p-3 rounded-lg' id='price' required/>
          <input type='number' placeholder='Count in stock' className='border p-3 rounded-lg' id='quintity' required/>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
          <div className='flex gap-4'>
            <input onChange={(e)=>setFiles(e.target.files)} type="file" id="images" className="border p-3 rounded w-full border-gray-300" accept='image/*' multiple />
            <button 
              disabled={uploading}
              type="button" 
              onClick={handleImageSubmite} 
              className='p-3 text-green-900 border border-green-900 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                {uploading? 'uploading...' : 'upload'}
              </button>
          </div>
          <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>

          {
            formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => (
              <div key={url} className="flex border justify-between p-3 items-center">
              <img src={url} alt="listing image" className="w-20 h-20 object-cover rounded"/>
              <button type="button" onClick={()=>handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg hover:opacity-85 uppercase">Delete</button>
              </div>
            ))
          }

          <button className='p-3 bg-green-700 text-white rounded-lg uppercase hover:opacity-85 disabled:opacity-80'>Create listing</button>
        </div> 
      </form>
    </main>
  )
}

export default CreateListing
