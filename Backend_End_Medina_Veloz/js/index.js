
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}

function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

$('#mostrarTodos').click(imprimeTodo);

function imprimeTodo(){
    $(document).ready(function() {
        $.ajax({
            url:"./data-1.json",
            type:"POST",
            async:true,
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success:function(response) {
                Resultado(response)
            }
        });
    });
}

function Resultado(response){
    $('#ResultadosBusqueda').html("");
    $.each(response, function(i, data) {
        $('#ResultadosBusqueda').append(
              +"<div>"
			  +"Num: <b>"+data.Id+"</b>"
			  +"Dir: <b>"+data.Direccion+"</b>"
              +"Cd: <b>"+data.Ciudad+"</b>"
              +"Tel: <b>"+data.Telefono+"</b>"
              +"CP: <b>"+data.Codigo_Postal+"</b>"
              +"Tipo: <b>"+data.Tipo+"</b>"
              +"Precio: <b>"+data.Precio+"</b>"
			  +"Imagen: <b><img src='img/home.jpg' width='60px' height='50px'/>"
              +"</div>"
          );
      });
}

$('#submitButton').click(submitInfo);

function submitInfo(event){
    
  event.preventDefault();
  var form_data = getInfoForm();
  $.ajax({
    url: "./modelo/procesa.php",
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
    success: function(data){
      if (data != "") { 
          console.log(data)
          Resultado(data)
      }else {
        alert("No hay resultados para la consulta");
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
  })
}


function getInfoForm(){
  var form_data = new FormData();
  form_data.append('selectCiudad', $("[id='selectCiudad']").val());
  form_data.append('selectTipo', $("[id='selectTipo']").val());
  form_data.append('rangoPrecio', $("[id='rangoPrecio']").val());
  
  return form_data;
}

inicializarSlider();
CargarCiudadesYTipos();
$(document).ready(function(){$('#selectCiudad').material_select();});

$(document).ready(function(){$('#selectTipo').material_select();});
