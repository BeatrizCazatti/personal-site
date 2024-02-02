$('.owl-carousel').owlCarousel({
    loop:true,

    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2.5
        },
        1000:{
            items:4.5
        }
    }
})

VanillaTilt.init(document.querySelector(".resume-about"), {
    max: 15,
    speed: 500,
});

function flipLabelUp(n){
    var label = document.getElementsByClassName('label-glass')[n]
    
    label.classList.remove('label-flip-close')
    label.classList.add('label-flip-open')    
}

function flipLabelClose(n){
    var label = document.getElementsByClassName('label-glass')[n]

    label.classList.remove('label-flip-open')
    label.classList.add('label-flip-close')
}
