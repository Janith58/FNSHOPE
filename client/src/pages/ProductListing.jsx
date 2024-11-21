import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userListing, setUserListing] = useState([]);
  const [showListingError, setShowListingError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      handleShowListing();
    }
  }, [currentUser]);

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  return (
    <div className="flex justify-center min-h-screen p-6">
      <div className="w-full max-w-screen-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Your Listings
        </h1>

        {showListingError && (
          <p className="text-red-600 text-center">
            Error fetching listings. Please try again later.
          </p>
        )}

        {userListing.length > 0 ? (
          <ul className="space-y-6">
            {userListing.map((listing) => (
              <li
                key={listing._id}
                className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition duration-300"
              >
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-24 w-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {listing.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {listing.description || "No description available"}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => navigate(`/orders/product/${listing._id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View Orders
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center mt-8">
            No listings found. Start creating one!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
