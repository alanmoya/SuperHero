window.onload = function() {
    //url  -->  https://www.superheroapi.com/api.php/10227829250544506/1
    // es API + Token + Id
    function addData(data) {
        if (data.response=="success") {
            var divdesc=document.querySelector("#descHeroe")
            divdesc.setAttribute("style","max-width: 540px; display: block;")
            var imgx=document.querySelector("#imgMyHero")
            imgx.setAttribute("src",data.image.url)
            

            document.querySelector("#txtTitle").innerText="Nombre: "+data.name
            document.querySelector("#txtConn").innerHTML="Conexiones: "+data['connections']['group-affiliation']
            document.querySelectorAll(".list-group-flush>li")[0].innerText="Publicado por: "+data.biography.publisher
            document.querySelectorAll(".list-group-flush>li")[1].innerText="Ocupación: "+data.work.occupation
            document.querySelectorAll(".list-group-flush>li")[2].innerText="Primera aparición: "+data['biography']['first-appearance']
            document.querySelectorAll(".list-group-flush>li")[3].innerText="Altura: "+data['appearance']['height'][0]+" - "+data['appearance']['height'][1]
            document.querySelectorAll(".list-group-flush>li")[4].innerText="Peso: "+data['appearance']['weight'][0]+" - "+data['appearance']['weight'][1]
            document.querySelectorAll(".list-group-flush>li")[5].innerText="Alianzas: "+data.biography.aliases
        
    
    
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                title: {
                    text: "Estadisticas de Poder para "+data.name
                },
                data: [{
                    type: "pie",
                    startAngle: 240,
                    yValueFormatString: "(##0\")\"",
                    indexLabel: "{label} {y}",
                    dataPoints: [
                        {y: data.powerstats.intelligence, label: "intelligence"},
                        {y: data.powerstats.strength, label: "strength"},
                        {y: data.powerstats.speed, label: "speed"},
                        {y: data.powerstats.durability, label: "durability"},
                        {y: data.powerstats.power, label: "power"},
                        {y: data.powerstats.combat, label: "combat"}
                    ]
                }]
            });
            if (data.powerstats.intelligence!="null") {   
                chart.render();
            }else{
                document.querySelector("#chartContainer").innerText="Estadisticas de "+data.name+" actualmente desconocidas"
                
            }
        }else{
            var divdesc=document.querySelector("#descHeroe")
            divdesc.setAttribute("style","max-width: 540px; display: none;")
            document.querySelector("#chartContainer").innerText="Número fuera de Rango, Elija un rango entre el 1 y el 732"
            document.querySelector("#chartContainer").setAttribute("style","text-align: center")
        }

        
        
    }
    function validarEntero(valor){
        //intento convertir a entero.
       //si era un entero no le afecta, si no lo era lo intenta convertir
       valor = parseInt(valor)
  
        //Compruebo si es un valor numérico
        if (isNaN(valor)) {
              //entonces (no es numero) devuelvo el valor cadena vacia
              return ""
        }else{
              //En caso contrario (Si era un número) devuelvo el valor
              if (valor>=1 && valor<=732) {
                return valor
              }else{
                return ""
              }
        }
  }
    //$.getJSON("https://www.superheroapi.com/api.php/10227829250544506/213", addData);
    var btnBuscar=document.querySelector("#btnBuscar")
        btnBuscar.addEventListener("click",function(){
            var numInput=document.querySelector("#exampleFormControlInput1").value
            if (validarEntero(numInput)=="") {
                alert("Número invalido, Favor ingrese un número del 1 al 732.")
            }else{
                $.getJSON("https://www.superheroapi.com/api.php/10227829250544506/"+numInput, addData);
            }



            
        })
    
}
