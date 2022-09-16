import { Component } from "react";

export function modalShow() {
    let state = {
        view: false,
    };


    return (
        <div>
            {state && (
                <div>
                    <div onClick={() => state}>
                        <div>
                            {/*content*/}
                            <div>
                                {/*header*/}
                                <div>
                                    <h3>MENSAJE DE: Title</h3>
                                    <button onClick={() => state}> <span> × </span>  </button>
                                </div>

                                {/*body*/}
                                <div>
                                    <p>


                                    </p>
                                    <button type="button" className=" botonAccion btn btn-success"  >Editar información</button>
                                    <button type="button" className="botonAccion btn btn-danger">Eliminar usuario</button>
                                </div>


                                {/*footer*/}
                                <div>
                                    <button type="button" onClick={() => state.view}> Cerrar </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}