import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    dni: '',
    first_name: '',
    last_name: '',
    job: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const { dni, last_name, first_name, job } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return dni !== '' && first_name.trim() !== '' && last_name.trim() !== '' && job.trim() !== '';
  };

  const hasSpacesFollowedByLetter = (input) => {
    // Verifico si hay espacios seguidos por al menos una letra
    return /^(?!\s)(?!.*\s{2,})(?!.*\s$)[a-zA-Z\s]+$/.test(input);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setErrorMessage("Error, complete todos los campos");
      return;
    }

    if (first_name.trim() !== first_name || last_name.trim() !== last_name) {
      setErrorMessage("Error, el nombre y apellido no debe tener espacios vacios");
      return;
    }

    if (!hasSpacesFollowedByLetter(first_name) || !hasSpacesFollowedByLetter(last_name) || !hasSpacesFollowedByLetter(job)) {
      setErrorMessage("Error, ningun campo puede tener espacio al menos que siga un caracter despues");
      return;
    }

    if (dni.length < 7 || dni.length > 8) {
      setErrorMessage("Error, el DNI debe tener entre 7 y 8 digitos");
      return;
    }

    try {
      const validationResponse = await axios.get(`http://localhost:8081/validate/dni/${dni}`);

      if (validationResponse.status === 200) {
        const saveUserResponse = await axios.post("http://localhost:8080/users", user);
        console.log("Save User Response:", saveUserResponse.data);

        navigate("/");
      } else {
        // Manejar la respuesta de validación incorrecta
        if (validationResponse.data.status === "error") {
          setErrorMessage(validationResponse.data.message);
        } else {
          setErrorMessage("Error durante la validacion");
        }
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage("Error making the request");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Nuevo Registro</h2>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="DNI" className="form-label">
                DNI
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Ingrese DNI"
                name="dni"
                value={dni}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                NOMBRE
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese Nombre"
                name="first_name"
                value={first_name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                APELLIDO
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese Apellido"
                name="last_name"
                value={last_name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="job" className="form-label">
                PROFESION
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese Profesion"
                name="job"
                value={job}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary mx-2" disabled={!isFormValid()}>Enviar</button>
            <Link className="btn btn-outline-danger mx-2" to={"/"}>Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
