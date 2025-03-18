import { useRef, useState } from 'react'
import { ScaleLoader } from 'react-spinners';
import './App.css'

function App() {
  const END_POINT = 'https://seokbong.tplinkdns.com/api/v2/frame/create';

  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async () => {
    if(inputRef.current) {
      try {
        setLoading(true);
        const files = inputRef.current.files;

        if (files && files.length > 0) {
          const formData = new FormData();
          for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
          }

          const response = await fetch(END_POINT, {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            console.log('파일 업로드 성공!');
          } else {
            console.error('파일 업로드 실패:', response.status);
          }
        } else {
          console.warn('파일이 선택되지 않았습니다.');
        }
        
      } catch (error) {
        console.error('업로드 중 오류 발생', error);
      } finally {
        setLoading(false);
      }
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
        <input
          type="file"
          className='upload-input'
          multiple ref={inputRef}
          onChange={handleFileChange}
        />
        <button
          className="upload-button pinter"
          onClick={() => inputRef.current && inputRef.current.click()}
        >
          이미지 추가
        </button>
      </div>
    </div>
  )
}

export default App
