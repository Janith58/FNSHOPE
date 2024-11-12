import { useState } from "react";
import { getDownloadURL, getStorage } from 'firebase/storage';
import { app } from '../firebase';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const { currentUser } = useSelector(state => state.user);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    brand: '',
    offer: 'false',
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
        setImageUploadError(false);
        setUploading(false);
      }).catch((err) => {
        setImageUploadError('Image upload failed (2MB max for image)');
        setUploading(false);
      });
    } else {
      setImageUploadError('You can upload up to 6 images');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length === 0) return setError('You must upload at least one image');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
          user: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      } else {
        navigate(`/listing/${data._id}`);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-5 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-10'>
      <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>Create a New Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-8">
        <div className='flex flex-col gap-6 flex-1'>
          <input onChange={handleChange} value={formData.name} type='text' placeholder='Name' className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' id='name' required />
          <textarea onChange={handleChange} value={formData.description} placeholder='Description' className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' id='description' required />
          <input onChange={handleChange} value={formData.price} type='number' placeholder='Price' className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' id='price' required />
          <input onChange={handleChange} value={formData.quantity} type='number' placeholder='Count in Stock' className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' id='quantity' required />
          <input onChange={handleChange} value={formData.brand} type='text' placeholder='Brand' className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' id='brand' />
          <select id="category" value={formData.category} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Select category</option>
                <option value="textile">Textile Crafts</option>
                <option value="pottery">Pottery and Ceramics</option>
                <option value="jewelry">Jewelry Making</option>
                <option value="wood">Wood Crafts</option>
                <option value="glass">Glass Crafts</option>
          </select>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="offer" className="w-5 h-5" onChange={handleChange} />
            <span>Offer Available</span>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-6'>
          <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
          <div className='flex items-center gap-4'>
            <input onChange={(e) => setFiles(e.target.files)} type="file" id="images" className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500" accept='image/*' multiple />
            <button disabled={uploading} type="button" onClick={handleImageSubmit} className='p-3 bg-green-600 text-white rounded-lg uppercase hover:bg-green-700 disabled:opacity-80'>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className="text-red-600 text-sm">{imageUploadError && imageUploadError}</p>

          {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
            <div key={url} className="flex border border-gray-300 rounded-lg p-3 items-center justify-between">
              <img src={url} alt="listing image" className="w-20 h-20 object-cover rounded-lg" />
              <button type="button" onClick={() => handleRemoveImage(index)} className="text-red-600 hover:text-red-800">
                Delete
              </button>
            </div>
          ))}

          <button disabled={loading || uploading} className='p-3 bg-green-600 text-white rounded-lg uppercase hover:bg-green-700 disabled:opacity-80'>
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
