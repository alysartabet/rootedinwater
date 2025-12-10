import { Routes, Route } from "react-router-dom"

import LoadingGate from "./components/LoadingGate"
import BackgroundVideo from "./components/BackgroundVideo"
import Header from "./components/Header"
import MorphingLogo from "./components/MorphingLogo"
import Footer from "./components/Footer"

import Landing from "./pages/Landing"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Maps from "./pages/Maps"
import Data from "./pages/Data"
import Blog from "./pages/Blog"

import SignIn from "./pages/SignIn"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import Terms from "./pages/Terms"

//Main Public Site
function SiteLayout({ children }) {
  return (
    <>
      <BackgroundVideo scrollTargetSelector=".riw-main" />
      <Header />

      <main className="riw-main">
        <MorphingLogo scrollTargetSelector=".riw-main" />
        {children}
      </main>

      <Footer />
    </>
  )
}

//Auth Pages
function AuthLayout({ children }) {
  return (
    <div className="auth-root">
      <div className="auth-shell">
        {children}
      </div>
    </div>
  )
}


export default function App() {
  return (
    <LoadingGate>
      <Routes>
        {/* ==== MAIN SITE ROUTES ==== */}
        <Route
          path="/"
          element={
            <SiteLayout>
              <section id="landing" className="snap-section">
                <Landing />
              </section>
              <section id="home" className="snap-section">
                <Home />
              </section>
            </SiteLayout>
          }
        />

        <Route
          path="/search"
          element={
            <SiteLayout>
              <Search />
            </SiteLayout>
          }
        />

        <Route
          path="/maps"
          element={
            <SiteLayout>
              <Maps />
            </SiteLayout>
          }
        />

        <Route
          path="/data"
          element={
            <SiteLayout>
              <Data />
            </SiteLayout>
          }
        />

        <Route
          path="/blog"
          element={
            <SiteLayout>
              <Blog />
            </SiteLayout>
          }
        />

        <Route path="/blog/:slug" element={<Blog />} />

        {/* ==== AUTH GATE ROUTES ==== */}
        <Route
          path="/account/sign-in"
          element={
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          }
        />

        <Route
          path="/account/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        <Route
          path="/account/forgot-password"
          element={
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          }
        />

        <Route
          path="/account/terms"
          element={
            <AuthLayout>
              <Terms />
            </AuthLayout>
          }
        />
      </Routes>
    </LoadingGate>
  )
}
/*
export default function App() {
  return (
    <LoadingGate>
      <BackgroundVideo scrollTargetSelector=".riw-main" />
      
      <Header />
      <main className="riw-main">
        <MorphingLogo scrollTargetSelector=".riw-main" />

        <Routes>
          *HOME: Landing and Home Sections Together
          <Route 
            path="/" 
            element={
              <>
                  <section id="landing" className="snap-section">
                    <Landing />
                  </section>

                  <section id="home" className="snap-section">
                    <Home />
                  </section>
              </>
            }
          />

          SEARCH
          <Route path="/search" element={<Search />} />
          
          {/*MAPS
          <Route path="/maps" element={<Maps />} />

          {/*DATA
          <Route path="/data" element={<Data />} />

          {/*BLOG
          <Route path="/blog" element={<Blog />} />
        </Routes>

        

        {/*
         <section id="search" className="snap-section">
          <Search />
        </section>
        
        

        <section id="maps" className="snap-section">
          <Maps />
        </section>

         placeholders 
        <section id="data" className="snap-section" aria-label="Data (coming soon)">
          <div className="container"><h2>Data (coming soon)</h2></div>
        </section>
        <section id="blog" className="snap-section" aria-label="Blog (coming soon)">
          <div className="container"><h2>Blog (coming soon)</h2></div>
        </section>
        

      </main>
      <Footer />
    </LoadingGate>
  )
}
*/