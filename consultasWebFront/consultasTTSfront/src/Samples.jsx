import './Samples.css'

function Samples({ audioData }) {
    console.log("Renderizando Samples", audioData);
    const handlePlay = () => {
        const audio = new Audio(audioData.audio_url + '?t=' + new Date().getTime());
        audio.play();

    };

    if (!audioData) return <p style={{ marginTop: '10px' }}>No hay audio generado aún</p>;

    const handleDownload = async () => {
        const response = await fetch(audioData.audio_url + '?t=' + new Date().getTime());
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `Consulta_${audioData.task.id}_${Date.now()}.wav`;
        link.click();
        window.URL.revokeObjectURL(link.href);
    };

    return (
        <>
            <section className='samples'>
                <div>
                    <p>Historial de audios: </p>
                    <h4>{audioData.task.title}</h4>
                    <button onClick={handlePlay}>▶️ Play Audio</button>
                    <button className='descargaboton' onClick={handleDownload}>⬇️ Descargar Audio</button>
                    {/* <a
                        href={audioData.audio_url + '?t=' + new Date().getTime()} // forzar descarga del audio más reciente
                        onClick={handleDownload}
                    >
                        ⬇️ Descargar Audio
                    </a> */}
                </div>
            </section>
        </>
    )
}

export default Samples
