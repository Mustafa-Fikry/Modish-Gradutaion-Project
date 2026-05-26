import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/*CONTEXT*/

import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

/*LAYOUT*/

import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';

/*HOME PAGES*/

import HeroSection from './Components/HomePages/HeroSection';
import Categories from './Components/HomePages/Categories';
import Products from './Components/HomePages/Products';
import Collection from './Components/HomePages/Collection';
import TopCollections from './Components/HomePages/TopCollections';
import About from './Components/HomePages/About';
import Contact from './Components/HomePages/Contact';

/*PRODUCT PAGES*/

import AllProducts from './Components/ProductPages/AllProducts';
import CategoryProducts from './Components/ProductPages/CategoryProducts';
import NewCollections from './Components/ProductPages/NewCollections';
import SlimBeauty from './Components/ProductPages/SlimBeauty';
import ComfortableDesign from './Components/ProductPages/ComfortableDesign';
import ProductDetails from './Components/ProductPages/ProductDetails';

/*AUTH*/

import Auth from './Auth/Auth';

/*CART*/

import Cart from './Components/CartProducts/Cart';
import Checkout from './Components/CartProducts/Checkout';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>

          {/*NAVBAR*/}

          <Navbar />

          {/*ROUTES*/}

          <Routes>

            {/*HOME*/}

            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <Categories />
                  <Products />
                  <Collection />
                  <TopCollections />
                  <About />
                  <Contact/>
                </>
              }
            />

            {/* PRODUCTS  */}

            <Route
              path="/all-products"
              element={<AllProducts />}
            />

            <Route
              path="/category-products"
              element={<CategoryProducts />}
            />

            <Route
              path="/collections"
              element={<NewCollections />}
            />

            <Route
              path="/slim-beauty"
              element={<SlimBeauty />}
            />

            <Route
              path="/comfortable-design"
              element={<ComfortableDesign />}
            />

            <Route
              path="/product/fs/:id"
              element={<ProductDetails />}
            />

            {/*AUTH*/}

            <Route
              path="/login"
              element={<Auth />}
            />

            {/*CART*/}

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

          </Routes>

          {/*FOOTER*/}

          <Footer />

        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;