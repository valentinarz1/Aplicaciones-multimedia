const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");
btnMenu.addEventListener("click", function(){
    menu.classList.toggle("mostrar");
});

const subMenuBtn = document.querySelectorAll(".submenu-btn");
for(let i=0; i<subMenuBtn.length; i++) {
    SubMenuBtn [i].addEventListener("click", function(){
        if(window.innerWidth > 768){
            const subMenu = this.nextElementSibling;
            const height = subMenu.scrollHeight;
            if(desple.classList.contains("desplegar")){
                desple.classList.remove("desplegar");
                desple.removeAttribute("style")
            } else {
                desple.classList.add("desplegar");
                desple.style.height = height + "px";
            }
        }
    });
}