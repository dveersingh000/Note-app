import './App.css'
import img1 from './assets/img1.png';

function App() {
  

  return (
    <div className='app'>
      <div className="sidebar">
        <h3>Pocket Notes</h3>
        <button className='btn'>+</button>
      </div>
      <div className="container">
        <img src={img1} alt="logo" />
        <h2>Pocket Notes</h2>
        <p>Send and receive messages without keeping your phone online.
          <br />
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        <div className="footer">
          <p>🔒end-to-end encrypted</p>
        </div>
      </div>
    </div>
  )
}

export default App
