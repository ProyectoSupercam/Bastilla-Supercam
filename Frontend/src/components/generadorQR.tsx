import QRCode from "qrcodejs" 
function generadorQR() {
  const contenedorQR = document.getElementById('contenedorQR');
  let formulario = document.getElementById('formulario');
  //@ts-ignore
  const QR = new QRCode(contenedorQR, formulario)
    //@ts-ignore
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();
      //@ts-ignore
      QR.makeCode(formulario.link.value);
    });

  return (
    <div className="container">
      <div >
        <form action="" id="formulario" className="formulario">
          <input type="text" id="link" placeholder="Escribe el texto o URL" />
          <button className="btn">Generar QR</button>
        </form>
      </div>
      <div id="contenedorQR" className="contenedorQR"></div>
    </div>

  )
}

export default generadorQR