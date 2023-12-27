import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
  let navigate = useNavigate()

  const {dni} = useParams();

  const [user, setUser] = useState({
    dni: '',
    first_name: '',
    last_name: '',
    job: ''
  });

  const { last_name, first_name, job } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect (() =>{
    loadUser();


  }, []);


  const onSubmit =async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/users/${dni}`, user)
    navigate("/");

  };

  const loadUser = async ()=> {
    const result=await axios.get(`http://localhost:8080/users/${dni}`)
    setUser(result.data)
  };


  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar datos</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                NOMBRE
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese su Nombre"
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
                placeholder="Ingrese su Apellido"
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
                placeholder="Ingrese su Profesion"
                name="job"
                value={job}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary mx-2">Enviar</button>
            <Link className="btn btn-outline-danger mx-2"to={"/"}>Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
