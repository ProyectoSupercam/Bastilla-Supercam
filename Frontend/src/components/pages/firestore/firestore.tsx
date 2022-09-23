import { collection, getDocs, doc, updateDoc, setDoc, addDoc, getDoc, deleteDoc } from "firebase/firestore";
import { bd } from "../../../firebase-config";
import { userDTO } from "../../interfaces/interface.dto";
import { useEffect, useState } from "react"





export function ViewData() {
    const [estado, setEstado] = useState(false)
    const [id, setId] = useState<string>("")
    const [user, setUser] = useState<userDTO[]>([])
    const [name, setName] = useState<string>("")
    const [apellido, setApellido] = useState<string>("")
    const [dni, setDni] = useState<string>("")
    const [habilitado, sethabilitado] = useState<string>("")



    //traemos todos los datos de firestore
    const getData = async () => {

        try {
            const querySnaptshot = await getDocs(collection(bd, "Usuarios"))
            const docs: userDTO[] = []
            querySnaptshot.forEach((doc) => {
                return docs.push({ ...doc.data(), Id: doc.id });
            })
            setUser(docs)
        } catch (error) {
            console.log(error);

        }

    }
    //traer los datos de firestore
    useEffect(() => {
        getData()


    }, [user])

    //obtenemos los datos del usuario segun su id
    //@ts-ignore
    const getByIdData = async (id) => {
        const resp = doc(bd, "Usuarios", id)
        const document = await getDoc(resp)
        //@ts-ignore
        const { Nombre, Apellido, DNI, habilitado } = document.data()
        setName(Nombre)
        setApellido(Apellido)
        setDni(DNI)
        sethabilitado(habilitado)
        setId(id)
        setEstado(true)
    }
    //submit de formulario de edición
    //@ts-ignore
    const deleteData =async (id) => {

        try {
            const Eliminar = doc(bd, "Usuarios", id)
            deleteDoc(Eliminar)
            getData()
            
        } catch (error) {
           console.log(error) 
        }
    }

    //edición de usuarios
    //@ts-ignore
    const updateData = async (e) => {
        e.preventDefault()
        const listUpdate = {
            Nombre: name,
            Apellido: apellido,
            DNI: dni,
            habilitado: habilitado
        }
        try {
            const update = doc(bd, "Usuarios", id)
            setDoc(update, listUpdate)
            console.log("tarea editada", update.id)
            getData()

        } catch (error) {
            console.log(error)

        }

        setName("")
        setApellido("")
        setDni("")
        sethabilitado("")
        setEstado(false)
    }
    //Creación de usuarios
    const createData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {

            const agregar = await addDoc(collection(bd, "Usuarios"), {
                Nombre: name,
                Apellido: apellido,
                DNI: dni,
                habilitado: habilitado

            })
            console.log("tarea añadida", agregar.id)


        } catch (error) {
            console.log(error)

        }
    }


    return (
        <div>

            {/* Tabla de Usuarios */}
            <table className="table table-dark table-hover">

                <thead>
                    <tr>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>DNI</th>
                        <th>Habilitado</th>
                        <th className="text-center">Acción </th>
                        <th><button type="button" className="btn text-white " data-bs-toggle="modal" data-bs-target="#modalData" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                            </svg>
                        </button></th>


                    </tr>
                </thead>
                <tbody className="text-center">
                    {user.map((users) => {
                        const generarQR = () => {
                            if (users.habilitado === "Si" || users.habilitado === "si" || users.habilitado === "SI") {
                                return <button className="btn text-white"> Generar QR</button>;
                            } else {
                                return <button type="button" className="btn text-white" disabled>GenerarQR</button>;
                            }
                        };



                        return (
                            <tr key={users.Id}>
                                <td >
                                    {users.Apellido}
                                </td>
                                <td >
                                    {users.Nombre}
                                </td>
                                <td>
                                    {users.DNI}
                                </td>

                                <td >
                                    {users.habilitado}
                                </td>
                                <td >
                                    {generarQR()}
                                    <button type="button" className="btn text-white " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(id) => { getByIdData(users.Id) }} >
                                        Ver información
                                    </button>

                                </td>
                            </tr>


                        );
                    })}

                </tbody>

            </table>

            {/* modal de informacion */}



            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-dark" id="exampleModalLabel ">Información</h5>
                            <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={updateData} className="form-group">
                                <div>
                                    <label htmlFor="disabledTextInput" className="form-label text-dark" > Nombre</label>
                                    <input type="text" id="disabledTextInput" className="form-control" onChange={(e) => setName(e.target.value)} value={name}></input></div>
                                <div>
                                    <label htmlFor="disabledTextInput" className="form-label text-dark" > Apellido</label>
                                    <input type="text" id="disabledTextInput" className="form-control text-dark" onChange={(e) => setApellido(e.target.value)} value={apellido} ></input>
                                </div>

                                <div>
                                    <label htmlFor="disabledTextInput" className="form-label text-dark"> DNI</label>
                                    <input type="text" id="disabledTextInput" className="form-control text-dark" onChange={(e) => setDni(e.target.value)} value={dni}></input></div>

                                <div>
                                    <label htmlFor="disabledTextInput" className="form-label text-dark" > Habilitado</label>
                                    <input type="text" id="disabledTextInput" className="form-control text-dark" onChange={(e) => sethabilitado(e.target.value)} value={habilitado}  ></input>
                                </div>
                                <div className="divBotonModal">
                                    <button type="submit" className=" botonAccion btn btn-success"  >Actualizar información</button>
                                    <button onClick={(Id)=>{deleteData(id)}} type="button" className="botonAccion btn btn-danger">Eliminar usuario</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Modal de ingreso de datos */}
            <div className="modal fade" id="modalData" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Agregar usuarios</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={createData} className="form-group">
                                <div>
                                    <label htmlFor="disabledTextInput" className="form-label" > Nombre</label>
                                    <input type="text" id="disabledTextInput" className="form-control" onChange={(e) => setName(e.target.value)}></input></div>
                                <div>
                                    <label htmlFor="disabledTextInput" className="form-label" > Apellido</label>
                                    <input type="text" id="disabledTextInput" className="form-control" onChange={(e) => setApellido(e.target.value)}></input>
                                </div>

                                <div>
                                    <label htmlFor="disabledTextInput" className="form-label"> DNI</label>
                                    <input type="text" id="disabledTextInput" className="form-control" onChange={(e) => setDni(e.target.value)}></input></div>

                                <div>
                                    <label htmlFor="disabledTextInput" className="form-label"> Habilitado</label>
                                    <input type="text" id="disabledTextInput" className="form-control" onChange={(e) => sethabilitado(e.target.value)}></input>
                                </div>
                                <div className="divBotonModal">
                                    <button type="submit" className=" botonAccion btn btn-success" >Agregar usuario</button>
                                    <button type="button" className="botonAccion btn btn-danger">Cancelar</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}












