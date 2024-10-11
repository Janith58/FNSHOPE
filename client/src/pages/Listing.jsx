import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);  // Start with null to handle no data better
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listing_id}`);
        const data = await res.json();
        if (data.success === false || !data) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setError(false);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listing_id]);

  return (
    <main className='p-8 max-w-4xl mx-auto'>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
      {listing && !loading && !error && (
        <div className='flex flex-col sm:flex-row gap-4'>
          {/* Image section */}
          <div className='flex flex-col flex-1 gap-4'>
            <div className='max-w-lg mt-auto rounded-xl bg-gray-300'>
              <Swiper navigation>
                {listing?.imageUrls?.length > 0 ? (
                  listing.imageUrls.map((url) => (
                    <SwiperSlide key={url}>
                      <div className='h-[400px]' style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: 'contain',
                      }} />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <p>No images available</p>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </div>

          {/* Details section */}
          <div className='flex flex-col flex-1 gap-4'>
            <div className='border rounded-lg p-5'>
              <p>Price: {listing?.price ?? 'N/A'}</p>
              <p>Name: {listing?.name ?? 'N/A'}</p>
              <p>Quantity: {listing?.quintity ?? 'N/A'}</p>
              <p>Description: {listing?.description ?? 'N/A'}</p>
            </div>
          </div>

          {/* Additional section */}
          <div className='flex flex-col flex-1 gap-4'>
            <p>psid sdaun madushanka</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Listing;
