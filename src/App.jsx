/* eslint-disable no-unused-vars */
import './App.css';
import ChipInfo from './components/ChipInfo';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Model from './components/Model';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <main className="w-full h-full overflow-x-hidden overflow-y-auto touch-pan-y bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <ChipInfo />
      <Footer />
    </main>
  )
}

export default App;
