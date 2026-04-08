import './Form.css'
import { useState } from 'react'

function Form() {
    const [description, setDescription] = useState("");

    const handleAdd = (event) => {
        event.preventDefault();
        const title = "Consulta"
        fetch("http://127.0.0.1:8000/api/tasks/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ title, description }),
        }).then(() => {
        });
    };

    return (
        <>
            <section>
                <div className='formQuery'>
                    <form onSubmit={handleAdd}>
                        <label>Ingresa el texto que quieras sintetizar</label>
                        <input
                            required
                            type="text"
                            onChange={(event) => {
                                setDescription(event.target.value)
                                console.log(description)
                            }}
                        />
                        <button type="submit">Generar Audio</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Form
