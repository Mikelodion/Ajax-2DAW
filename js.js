window.onload = function(){
    cargarDep();
    showUsers();
    document.getElementById("selectdep").onchange = function(){cargarPuesto()};
    document.getElementById("search").addEventListener("keyup", function(){
        showUsers();
    })
    document.getElementById("search").addEventListener("submit", function(e){
        e.preventDefault();
        showUsers();
    })
    document.getElementById("addnew-form").addEventListener("submit",function(e){
        document.getElementById("addnew-form").reset();
        e.preventDefault();
        añadirNuevo();
        showUsers();
    });
}
function cargarDep() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                document.getElementById("selectdep").innerHTML = xmlhttp.responseText;
                cargarPuesto();
            }
        };
        xmlhttp.open("GET","http://localhost/Ejercicios/Cliente/jspractice/controladores/cargarDep.php", true);
        xmlhttp.send();

}
function cargarPuesto(){
    var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    document.getElementById("selectpuesto").innerHTML = xmlhttp.responseText;
                }
            };
            xmlhttp.open("GET","http://localhost/Ejercicios/Cliente/jspractice/controladores/cargarPuesto.php?departamento="+document.getElementById("selectdep").value, true);
            xmlhttp.send();
};
function añadirNuevo(){
    var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    console.log(xmlhttp.responseText);
                    
                }
            };
            xmlhttp.open("POST","controladores/añadirNuevo.php", true);
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xmlhttp.send("email="+document.getElementById("inpemail").value+"&name="+document.getElementById("inpname").value+"&phone="+document.getElementById("inpphone").value+"&puesto="+document.getElementById("selectpuesto").value);
}
function showUsers(){
    var xmlhttp = new XMLHttpRequest();
    
    if(document.getElementById("search").value){
        
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log(xmlhttp.response);
                crearTabla(JSON.parse(xmlhttp.response));
            }
        };
        xmlhttp.open("POST","controladores/mostrarUsuarios.php", true);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(encodeURI("searchinp="+document.getElementById("search").value));
    }
    else{
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log(xmlhttp.response);
                crearTabla(JSON.parse(xmlhttp.response));
            }
        };
        xmlhttp.open("GET","http://localhost/Ejercicios/Cliente/jspractice/controladores/mostrarUsuarios.php", true);
        xmlhttp.send();
    }
}
function crearTabla(json){
    let column = "";
    Object.keys(json).forEach(key=>{
        column += `<tr><td>${json[key].nombre}</td><td>${json[key].email}</td><td>${json[key].telefono}</td><td>${json[key].departamento}</td><td>${json[key].puesto}</td></tr>`;
    });
    document.getElementById("tablausers").childNodes[3].innerHTML = column;
}