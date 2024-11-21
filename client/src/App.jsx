import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './pages/component/Header';
import Footer from './pages/component/Footer';
import PrivetRoute from './pages/component/PrivetRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import OrderScreen from './pages/OrderScreen';
import OderList from './pages/OderList';
import ProductListing from './pages/ProductListing';
import OrderDetailsByProduct from './pages/OrderDetailsByProduct';

export default function App(){
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/listing/:listing_id" element={<Listing/>} />
        <Route element={<PrivetRoute/>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create_listing" element={<CreateListing/>} />
          <Route path="/update_listing/:listing_id" element={<UpdateListing/>} />
          <Route path="/order/:listingId" element={<OrderScreen />} />
          <Route path="/OrderListing" element={<OderList/>} />
          <Route path="/productListing" element={<ProductListing/>} />
          <Route path="/orders/product/:productId" element={<OrderDetailsByProduct/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    )
}