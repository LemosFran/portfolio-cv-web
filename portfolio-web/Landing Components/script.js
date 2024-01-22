/* Nota 5 (funciones reutilizables) */

            /****** Menu *****/
    /*Funcion que contiene document para no tener que estar llamando cada vez que se use document */

    ((d) => {
        /* Se le pone el pone solo el nombre con el dolar para luego usarla en una manera nueva en JS */
        const $btnMenu = d.querySelector(".menu-btn"),
        $menu = d.querySelector(".menu"); /* llamamos */
        
        /* Tener en cuenta los hijos de menu-btn el ocultar esta segundo, se juega con la lectura del dom */
        $btnMenu.addEventListener("click", e=>{
            /*Cuando se haga un click que el 1er hijo y el 2do se intercambein las clases -> Intercambia "none" (la x) a cada elemento con un clixk */
            $btnMenu.firstElementChild.classList.toggle("none");
            $btnMenu.lastElementChild.classList.toggle("none");
            /*E intercambiamos la clase is active */
            $menu.classList.toggle("is-active");
        });
        
        /* PROGRAMAR QUE CUANDO SE SELECCIONE CON UN CLICK ALGUN ELEMENTO DEL MENU ÉSTE SE CIERRE */
/* NO SE pone documen.add... porque ya esta escrito en la funcion, AHORA VAMOS A ESCONDER EL MENU */
        d.addEventListener("click",(e)=>{
            /*si no es un enlace que esta dentro del menu no retornes nada, sino quita las propiedades o activa */
            if(!e.target.matches(".menu a")) return false;

            /*si es un enlace que esta en el menu */
            $btnMenu.firstElementChild.classList.remove("none");
            $btnMenu.lastElementChild.classList.add("none");
            $menu.classList.remove("is-active");        
        });
    })(document);


    /* ContactForm */
    ((d)=>{
        const $form = d.querySelector(".contact-form"), $loader= d.querySelector(".contact-form-loader"),
        $response = d.querySelector(".contact-form-response");

        $form.addEventListener("submit", (e)=>{
            e.preventDefault();
            $loader.classList.remove("none");
            fetch("https://formsubmit.co/ajax/lemosf199@gmail.com", {
                method:"POST",
                body: new FormData(e.target)}).then((res)=> (res.ok ? res.json() : Promise.reject(res))).then((json)=>{
                    console.log(json);
                    location.hash="#gracias";
                    $form.reset(); /*Volvemos a poner en blanco el form*/
                }).catch((err)=>{
                    console.log(err);
                    let message = err.statusText || "Ocurrio un error, intentalo nuevamente";
                    $response.querySelector("h3").innerHTML = `Error ${err.status}: ${message}`; /* Le cambiamos el valo al html h3 */
                }).finally(()=>{
                    /*Finalmente pase lo que pase ocultamos el spinner y cerramos la ventana en 3000 ms */
                    $loader.classList.add("none");
                    setTimeout(()=>{ 
                        location.hash  = "#close";
                    }, 3000);
                }); 
        });
    })(document);