import {useRef,useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase.js';
import { updateUserStart,updateUserFailure,updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';


const Profile = () => {
  const fileRef=useRef(null)
  const {currentUser,loading,error}= useSelector((state) => state.user);
  const [file,setFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [err, seterr] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess,setUpdateSuccess] = useState(false);
  console.log(formData);


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
     
      (err)=>{
        seterr(false);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloaURL)=>
          setFormData({...formData,avatar:downloaURL})
        )},
    );
  }
  const handleChange =  (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(updateUserFailure(error.message));
        return
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }
  const handleDeleteUser =async()=>{
    try {
      dispatch(deleteUserStart());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(deleteUserFailure(error.message));
        return
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }


  return (
    <div className='mx-auto max-w-lg ' >
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar||currentUser.avatar} alt='profile' className='rounded-full self-center h-24 w-24 object-cover cursor-pointer mt-2'/>

          <p className='text-sm self-center'>
            {err ? (
              <span className='text-red-600'>err Image Uploaded</span>
            ) : progress > 0 && progress < 100 ? (
              <span className='text-slate-700'>{`Uploading ${progress}%`}</span>
            ) : progress === 100 ? (
              <span className='text-green-600'>{`Image Uploaded Successfully`}</span>
            ) : (
              ''
            )}
          </p>


        <input 
        type="text" 
        placeholder='username' 
        id='username' 
        defaultValue={currentUser.username}
        className='border p-3 rounded-lg'
        onChange={handleChange}
        />

        <input 
        type="email" 
        placeholder='email' 
        id='email' 
        defaultValue={currentUser.email}
        className='border p-3 rounded-lg'
        onChange={handleChange}
        />

        <input 
        type="password" 
        placeholder='password' 
        id='password' 
        className='border p-3 rounded-lg'
        onChange={handleChange}
        />

        <button disabled={loading}
        className='bg-slate-700 hover:opacity-85 uppercase
        text-white font-bold p-3 px-4 rounded-lg'>
        {loading? 'loading' :'upadate'}
        </button>

      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-600 cursor-pointer'>Delete Acount</span>
        <span className='text-red-600 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess? 'User is updated successfully':''}</p>
    </div>
  )
}

export default Profile
