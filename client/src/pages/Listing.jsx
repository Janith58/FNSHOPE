import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore  from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        const fetchListing = async ()=>{
            try {
                setLoading(true);
                const res =await fetch(`/api/listing/get/${params.listing_id}`);
                const data = await res.json();
                if(data.success===false){
                    setError(true);
                    setLoading(false);
                    return
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            } 
        }
        fetchListing()
    },[params.listing_id])

  return (
    <main>
  {loading && <p className='text-center my-7 text-2xl'>loading...</p>}
  {error && (<p className='text-center my-7 text-2xl'>something went wrong!</p>)}
  {listing && !loading && !error && (
    <div className='max-w-lg mx-auto mt-10 rounded-xl bg-gray-300'>
      <Swiper navigation>
        {
          listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <div className='h-[400px]' style={{
                 background: `url(${url}) center no-repeat`,
                 backgroundSize: 'contain',
                 }}>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )}
</main>
  )
}

export default Listing


