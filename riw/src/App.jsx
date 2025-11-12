import React from 'react'
import LoadingGate from './components/LoadingGate'
import BackgroundVideo from './components/BackgroundVideo'
import Header from './components/Header'
import MorphingLogo from './components/MorphingLogo'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Search from './pages/Search'
import Maps from './pages/Maps'


{/* ==Smoke Test==
export default function App(){
  return <h1 style={{padding: 24}}>Hello RIW </h1>
}
*/}

export default function App() {
  return (
    <LoadingGate>
      <BackgroundVideo scrollTargetSelector=".riw-main" />
      
      <Header />
      <main className="riw-main">
        <MorphingLogo scrollTargetSelector=".riw-main" />
        <section id="landing" className="snap-section">
          <Landing />
        </section>

        <section id="home" className="snap-section">
          <Home />
        </section>

         <section id="search" className="snap-section">
          <Search />
        </section>

        <section id="maps" className="snap-section">
          <Maps />
        </section>

        {/* placeholders */}
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
