import './App.css'
import img1 from './assets/img1.png';
import Vector from './assets/Vector.png';

function App() {


  return (
    <div className='app'>
      <div className="sidebar">
        <h3>Pocket Notes</h3>
        <button className='btn'>+</button>
      </div>
      <div className="container">
        <div className="content">
        <img src={img1} alt="logo" className='main-image' />
        <h2>Pocket Notes</h2>
        <p>Send and receive messages without keeping your phone online.<br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
        </div>
        <div className="footer">
        
          <p><img src={Vector} alt="Lock Icon" className='lock-icon' />end-to-end encrypted</p>
        </div>
      </div>
      
    </div>
  )
}

export default App
