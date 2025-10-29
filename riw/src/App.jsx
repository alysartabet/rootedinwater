import React from 'react'
import LoadingGate from './components/LoadingGate'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Home from './pages/Home'


{/* ==Smoke Test==
export default function App(){
  return <h1 style={{padding: 24}}>Hello RIW </h1>
}
*/}

export default function App() {
  return (
    <LoadingGate>
      <Header />
      <main className="riw-main">
        <section id="landing" className="snap-section">
          <Landing />
        </section>
        <section id="home" className="snap-section">
          <Home />
        </section>
      </main>
      <Footer />
    </LoadingGate>
  )
}
