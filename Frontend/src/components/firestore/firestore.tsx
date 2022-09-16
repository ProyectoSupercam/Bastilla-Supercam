import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { bd } from "../../firebase-config";
import { userDTO } from "../../interfaces/interface.dto";
import { useEffect, useState } from "react"





export function ViewData() {

    const [user, setUser] = useState<userDTO[]>([])
    const [name, setName] = useState<string>("")
    const [apellido, setApellido] = useState<string>("")
    const [dni, setDni] = useState<string>("")
    const [habilitado, sethabilitado] = useState<string>("")

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

    const updateUser = async (users: userDTO) => {
        setUser(user.map(x => {
            if (x.Id === users.Id)
                return users;
            return x;

        }))
        const resp = doc(bd, "Usuarios");
        await updateDoc(resp, {
            name,
            apellido,
            dni,
            habilitado
        });

    }

    return (
        <div>
            <table className="table table-dark table-hover">

                <thead>
                    <tr>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>DNI</th>
                        <th>Habilitado</th>
                        <th className="text-center">Acción</th>

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
                            <tr>
                                <td key={users.Id}>
                                    {users.Apellido}
                                </td>
                                <td>
                                    {users.Nombre}
                                </td>
                                <td>
                                    {users.DNI}
                                </td>

                                <td>
                                    {users.habilitado}
                                </td>
                                <td>
                                    {generarQR()}
                                    <button type="button" className="btn text-white " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => updateUser(users)} >
                                        Ver información
                                    </button>
                                </td>
                            </tr>


                        );
                    })}

                </tbody>

            </table>

            {/* modal */}

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Información</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label htmlFor="disabledTextInput" className="form-label" > Nombre</label>
                                <input type="text" id="disabledTextInput" className="form-control" readOnly onChange={(e) => setName(e.target.value)}></input></div>
                            <div>
                                <label htmlFor="disabledTextInput" className="form-label" > Apellido</label>
                                <input type="text" id="disabledTextInput" className="form-control" readOnly value={""} onChange={(e) => setApellido(e.target.value)}></input>
                            </div>

                            <div>
                                <label htmlFor="disabledTextInput" className="form-label"> DNI</label>
                                <input type="text" id="disabledTextInput" className="form-control"   onChange={(e) => setDni(e.target.value)}></input></div>

                            <div>
                                <label htmlFor="disabledTextInput" className="form-label"> Habilitado</label>
                                <input type="text" id="disabledTextInput" className="form-control" readOnly value={""} onChange={(e) => sethabilitado(e.target.value)}></input>
                            </div>
                            <div className="divBotonModal">
                                <button type="button" className=" botonAccion btn btn-success"  >Editar información</button>
                                <button type="button" className="botonAccion btn btn-danger">Eliminar usuario</button>
                            </div>
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












