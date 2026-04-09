import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Form from './Form.jsx'
import Samples from './Samples.jsx'

function Main() {
  const [audioData, setAudioData] = useState(null);

  return (
    <div className='layout'>
      <section className='titulo'>
        <h1>RETOMadrID Sintetizador de Texto A Voz por IA</h1>
      </section>

      <div className='sidebar'>
        {/* Pasamos audioData para que Samples pueda crear el botón */}
        <Samples audioData={audioData} />
      </div>

      <div className='content'>
        <App />
        {/* Pasamos setAudioData para que Form pueda actualizar el estado */}
        <Form setAudioData={setAudioData} />
      </div>
    </div>
  );
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
    {/* <div className='layout'>
      <section className='titulo'>
        <h1>RETOMadrID Sintetizador de Texto A Voz por IA</h1>
      </section>
      <div className='sidebar'>
        <Samples />
      </div>
      <div className='content'>
        <App />
        <Form />
      </div>
    </div> */}

  </StrictMode>,
)
