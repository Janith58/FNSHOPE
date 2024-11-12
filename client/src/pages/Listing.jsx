import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import {useNavigate} from 'react-router-dom'
import 'swiper/css/bundle';

const Listing = () => {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate =useNavigate()
  const [comment, setComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);
  
  const [qty, setQty] = useState(1); // State for quantity selection

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentLoading(true);

    try {
      const res = await fetch(`/api/listing/${params.listing_id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment,
          name: currentUser.username,
          user: currentUser._id,
          avatar: currentUser.avatar,
        }),
      });

      const data = await res.json();
      if (data) {
        setListing((prevListing) => ({
          ...prevListing,
          reviews: [
            ...prevListing.reviews,
            {
              comment,
              avatar: currentUser.avatar,
              name: currentUser.username,
              user: currentUser._id,
              createdAt: new Date().toISOString(),
            },
          ],
        }));
        setComment('');
      } else {
        setCommentError('Failed to post comment');
      }
    } catch (err) {
      setCommentError('An error occurred');
    } finally {
      setCommentLoading(false);
    }
  };

  
  const handleOrder = async () => {
    navigate(`/order/:${params.listing_id}`,{ state: { listing } })
  };
  

  return (
    <main className="p-8 max-w-7xl mx-auto bg-gray-50 rounded-lg shadow-md">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center my-7 text-2xl">Something went wrong!</p>}
      {listing && !loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Section */}
          <section className="lg:col-span-2 flex flex-col rounded-lg overflow-hidden bg-white shadow-lg">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Swiper navigation className="h-[450px]">
                {listing.imageUrls?.length > 0 ? (
                  listing.imageUrls.map((url) => (
                    <SwiperSlide key={url}>
                      <div
                        className="h-[450px] bg-cover bg-center transition-transform duration-300 transform hover:scale-105"
                        style={{ backgroundImage: `url(${url})` }}
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
          <section className="p-6 bg-white rounded-lg shadow-md flex flex-col h-full space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">{listing.name ?? 'N/A'}</h2>
            <p className="text-xl text-green-600 font-bold">Price: ${listing.price ?? 'N/A'}</p>
            <p className="text-gray-600">Quantity: {listing.quantity ?? 'N/A'}</p>
            <p className="text-gray-600 leading-relaxed flex-grow">{listing.description ?? 'N/A'}</p> {/* Add flex-grow to make this element fill space */}
            
            <div className="mt-auto"> {/* Use mt-auto to push the button to the bottom */}
              <button 
                onClick={handleOrder}
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 transition-all duration-200"
              >
                Place Order
              </button>
            </div>
          </section>


          {/* Comment Section */}
          <section className="p-6 bg-white rounded-lg shadow-md lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>

            {commentError && <p className="text-red-500">Failed to load comments</p>}
            {listing.reviews?.length > 0 ? (
              <ul className="space-y-4">
                {listing.reviews.map((review) => (
                  <li key={review._id} className="flex items-start space-x-4 py-4 border-b border-gray-200">
                    <img
                      className="h-10 w-10 rounded-full object-cover border-2 border-green-500"
                      src={review.avatar}
                      alt="profile"
                    />
                    <div className="bg-gray-100 rounded-lg p-4 w-full break-words whitespace-pre-wrap overflow-y-auto">
                      <p className="text-gray-800 font-medium mb-1">{review.comment}</p>
                      <p className="text-xs text-gray-500">
                        Posted by {review.name} on {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No comments yet. Be the first to comment!</p>
            )}

            {/* New Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mt-6 flex flex-col space-y-4  ">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-4 text-gray-800 focus:outline-none focus:border-green-500 transition duration-200"
                rows="4"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 transition-all duration-200"
                disabled={commentLoading}
              >
                {commentLoading ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
};

export default Listing;
