import { useRef, useState } from 'react'
import { ScaleLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import './App.css'

function App() {
  const END_POINT = 'https://seokbong.tplinkdns.com/api/v2/frame/create';

  const inputRef = useRef(null);

  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async () => {
    if (inputRef.current) {
      try {
        setLoading(true);

        if (!size) {
          showWarnAlert('🤔 사이즈를 입력해주세요. 🧐');
          return;
        }

        const files = inputRef.current.files;

        if (files && files.length > 0) {
          const formData = new FormData();

          formData.append('size', size);
          for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
          }

          const response = await fetch(END_POINT, {
            method: 'POST',
            body: formData,
            responseType: 'blob'
          });

          if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'images.zip');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            showSuccessAlert('🎉 파일 업로드 성공! 🥳');
          } else {
            showErrorAlert('🥲 파일 업로드에 실패했어요. 다시 시도해 주세요! 😥');
            console.error('파일 업로드 실패:', response.status);
          }
        } else {
          showWarnAlert('🤔 파일을 선택해주세요! 🧐');
          console.warn('파일이 선택되지 않았습니다.');
        }

      } catch (error) {
        showErrorAlert('🚨 업로드 중 오류가 발생했어요! 😭');
        console.error('업로드 중 오류 발생', error);
      } finally {
        setLoading(false);
        clearFile();
      }
    }
  }

  const clearFile = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  }

  const showSuccessAlert = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true
    });
  }

  const showWarnAlert = (message) => {
    toast.warn(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
    });
  }

  const showErrorAlert = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
    });
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
          <input
            type="text"
            className='size-input'
            placeholder='6400'
            value={size}
            onChange={handleSizeChange}
          />
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
      <ToastContainer />
    </div>
  )
}

export default App
