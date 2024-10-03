import {useRef,useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase.js';

const Profile = () => {
  const fileRef=useRef(null)
  const {currentUser}= useSelector((state) => state.user);
  const [file,setFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});



  useEffect(()=>{
    if(file){
      handleFileUpload(file);
      }
  },[file]);

  const  handleFileUpload = (file)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime()+file.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress));
        },
     
      (error)=>{
        setError(false);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloaURL)=>
          setFormData({...formData,avatar:downloaURL})
        )},
    );
  }


  return (
    <div className='mx-auto max-w-lg ' >
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-5'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar||currentUser.avatar} alt='profile' className='rounded-full self-center h-24 w-24 object-cover cursor-pointer mt-2'/>

          <p className='text-sm self-center'>
            {error ? (
              <span className='text-red-600'>Error Image Uploaded</span>
            ) : progress > 0 && progress < 100 ? (
              <span className='text-slate-700'>{`Uploading ${progress}%`}</span>
            ) : progress === 100 ? (
              <span className='text-green-600'>{`Image Uploaded Successfully`}</span>
            ) : (
              ''
            )}
          </p>


        <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg'/>
        <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg'/>
        <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 hover:opacity-85 text-white font-bold p-3 px-4 rounded-lg'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-600 cursor-pointer'>Delete Acount</span>
        <span className='text-red-600 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile
