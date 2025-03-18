import { useRef, useState } from 'react'
import { ScaleLoader } from 'react-spinners';
import './App.css'

function App() {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const uploadButtonEvent = () => {
    if(inputRef) {
      setLoading(true);
      inputRef.current.click();
    }
  }

  return (
    <div className='main-container'>
      {loading &&
        <div className='loading'>
          <ScaleLoader color='#ffffff' />
        </div>
      }
      <div className='title'>Frame Studio</div>

      <div className='options-container'>
        <div className='size-container'>
          <div className='label'>Size</div>
          <input type="text" className='size-input' placeholder='6400' />
        </div>
      </div>

      <div className='upload-container'>
        <input type="file" className='upload-input' multiple ref={inputRef} />
        <button
          className="upload-button pinter"
          onClick={uploadButtonEvent}
        >
          이미지 추가
        </button>
      </div>
    </div>
  )
}

export default App
