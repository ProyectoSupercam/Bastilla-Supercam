import { collection, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { bd } from "../../firebase-config";
import { userDTO } from "../../interfaces/interface.dto";
import { useResolvedPath } from "react-router-dom"
import React, { useEffect, useState } from "react"




export class ViewData extends React.Component {


    //@ts-ignore
    constructor(props) {
        super(props);
        this.state = {
            user:[]
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() { }
    getData = async () => {
    
        try {
            const querySnaptshot = await getDocs(collection(bd, "Usuarios"))
            const docs: userDTO[] = []
            querySnaptshot.forEach((doc) => {
                return docs.push({ ...doc.data(), Id: doc.id });
            })
            this.setUser(docs)
        } catch (error) {
            console.log(error);

        }
        //traer los datos de firestore
        useEffect(() => {
            this.getData()


        }, [this.state.user])
    }

    render() {
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
                         {this.user.map((users) => {
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
                                        <button type="button" className="btn text-white " data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                    <input type="text" id="disabledTextInput" className="form-control" readOnly value={""} ></input></div>
                                <div>
                                    <label htmlFor="disabledTextInput" className="form-label" > Apellido</label>
                                    <input type="text" id="disabledTextInput" className="form-control" readOnly value={""} ></input>
                                </div>

                                <div>
                                    <label htmlFor="disabledTextInput" className="form-label"> DNI</label>
                                    <input type="text" id="disabledTextInput" className="form-control" readOnly value={""}></input></div>

                                <div>
                                    <label htmlFor="disabledTextInput" className="form-label"> Habilitado</label>
                                    <input type="text" id="disabledTextInput" className="form-control" readOnly value={""}></input>
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


}
// function hooks() {
//     const [user, setUser] = useState<userDTO[]>([]);

//     const getData = async () => {

//         try {
//             const querySnaptshot = await getDocs(collection(bd, "Usuarios"))
//             const docs: userDTO[] = []
//             querySnaptshot.forEach((doc) => {
//                 return docs.push({ ...doc.data(), Id: doc.id });
//             })
//             setUser(docs)
//         } catch (error) {
//             console.log(error);

//         }
//         //traer los datos de firestore
//         useEffect(() => {
//             getData()


//         }, [user])
//     }
// }









