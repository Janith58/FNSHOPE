import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
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

  const handleOrder = () => {
    // Implement order functionality here
    alert('Order functionality is not yet implemented!');
  };

  return (
    <main className="p-8 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center my-7 text-2xl">Something went wrong!</p>}
      {listing && !loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Image Section */}
          <section className="flex flex-col">
            <div className="rounded-xl overflow-hidden bg-gray-300 shadow-lg">
              <Swiper navigation>
                {listing.imageUrls?.length > 0 ? (
                  listing.imageUrls.map((url) => (
                    <SwiperSlide key={url}>
                      <div
                        className="h-[400px] bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${url})`,
                        }}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <p className="text-center p-4">No images available</p>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </section>

          {/* Details Section */}
          <section className="border rounded-lg p-5 bg-white shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{listing.name ?? 'N/A'}</h2>
            <p className="text-lg font-bold">Price: ${listing.price ?? 'N/A'}</p>
            <p>Quantity: {listing.quintity ?? 'N/A'}</p>
            <p>Description: {listing.description ?? 'N/A'}</p>
          </section>

          {/* Order Functionality Section */}
          <section className="flex flex-col border rounded-lg p-5 bg-white shadow-md">
            <h3 className="text-xl font-semibold mb-4">Order This Item</h3>
            <button
              onClick={handleOrder}
              className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200"
            >
              Place Order
            </button>
          </section>
        </div>
      )}
    </main>
  );
};

export default Listing;
