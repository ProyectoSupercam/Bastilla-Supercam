


export function Sidebars() {
    return (
        <><nav className="navbar navbar-expand-lg fixed-top">

            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>&times;</a>
                <a href="/"><i className="bi bi-list"></i> iniciar Sesión</a>

            </div>

            <div id="main">
                <span className="openNav text-white"  onClick={() => openNav()}>&#9776; </span>
            </div>
            <div className="container">
                {/* <a className="navbar-brand" href="/index"><img src="img/Programacion 2.png" alt="Node.js icon" className="logo22"></a> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            </div>
        </nav></>)
}


function openNav() {
    //@ts-ignore
    document.getElementById("mySidenav").style.width = "250px";
    //@ts-ignore
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    //@ts-ignore
    document.getElementById("mySidenav").style.width = "0";
    //@ts-ignore
    document.getElementById("main").style.marginLeft = "0";
}
