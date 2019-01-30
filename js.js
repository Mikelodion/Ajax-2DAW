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
        let inpvalue = [];
        e.preventDefault();
        const formchilds = [...document.getElementById("addnew-form").childNodes];
        const forminp = formchilds.filter(c => c.nodeName === "DIV");
        forminp.forEach(e => {
            let asd = [...e.childNodes];            
            let valuetopush= asd.filter(c => c.nodeName === "INPUT" || c.nodeName === "SELECT").map(c => c.value);
            inpvalue.push(valuetopush[0]); 
        });
        console.log(inpvalue);
        if(validarformulario(inpvalue)){
            añadirNuevo();
            document.getElementById("addnew-form").reset();
        }
        
        showUsers();
    });
    document.getElementById("addnew-form").addEventListener("keyup",function(e){
        let inpvalue = [];
        const formchilds = [...document.getElementById("addnew-form").childNodes];
        const forminp = formchilds.filter(c => c.nodeName === "DIV");
        forminp.forEach(e => {
            let asd = [...e.childNodes];            
            let valuetopush= asd.filter(c => c.nodeName === "INPUT" || c.nodeName === "SELECT").map(c => c.value);
            inpvalue.push(valuetopush[0]); 
        });
        console.log(inpvalue);
        validarformulario(inpvalue);
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
                    showUsers();
                }
            };
            xmlhttp.open("POST","controladores/añadirNuevo.php", true);
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xmlhttp.send("email="+document.getElementById("email").value+"&name="+document.getElementById("nom").value+"&phone="+document.getElementById("phone").value+"&puesto="+document.getElementById("selectpuesto").value);
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
const validarformulario = childs =>{
    
    let noerror = true;

    if(childs[0].match(/^[\w\.-]+@[\w\.-]+\.\w{2,4}$/i)){
        document.getElementById("email").style.color = "green";
    }else{
        document.getElementById("email").style.color = "red";
        noerror = false;
    };

    if(childs[1].match(/[a-z]{3,}(\s*[a-z]{3,})*/i)){
        document.getElementById("nom").style.color = "green";
    }else{
        document.getElementById("nom").style.color = "red";
        noerror = false;
    }

    if(childs[2].match(/^[0-9\S]{9,9}$/)){
        document.getElementById("phone").style.color= "green";
    }
    else{
        document.getElementById("phone").style.color = "red";
        noerror = false;
    }

    return noerror;
};