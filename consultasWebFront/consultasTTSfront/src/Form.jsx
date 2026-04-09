import './Form.css'
import { useState } from 'react'

function Form({ setAudioData }) {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [consultas, setConsultas] = useState(1);

    const handleAdd = (event) => {
        event.preventDefault();
        setLoading(true);
        setConsultas(consultas + 1);
        const title = "Consulta" + " " + consultas;

        fetch("http://127.0.0.1:8000/api/tasks/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ title, description }),
        }).then(response => response.json())
          .then(data => {
                if(data.audio_url) {
                    setAudioData(data);
                }
            })
           .catch ((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });;
};


return (
    <>
        <section className='formulario'>
            <div className='formQuery'>
                <form onSubmit={handleAdd}>
                    <label>Ingresa el texto que quieras sintetizar</label>
                    <textarea
                        required
                        type="text"
                        onChange={(event) => {
                            setDescription(event.target.value)
                            console.log(description)
                        }}
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>{loading ? "Cargando..." : "Generar Audio"}</button>
                </form>
            </div>
        </section>
    </>
)
}

export default Form
