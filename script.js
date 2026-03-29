gsap.registerPlugin(ScrollTrigger);
const scroller = document.querySelector('.scroll-container');

// 1. Text Reveal Animation
gsap.utils.toArray('.reveal').forEach(text => {
    gsap.fromTo(text, 
        { y: 80, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: "power4.out",
            scrollTrigger: {
                trigger: text,
                scroller: scroller,
                start: "top 90%",
                toggleActions: "play reverse play reverse"
            }
        }
    );
});

// 2. Binary interaction for the 60s
const binaryDiv = document.getElementById('binary');
setInterval(() => {
    const bit = Math.round(Math.random());
    binaryDiv.innerText += bit + " ";
    if(binaryDiv.innerText.length > 300) binaryDiv.innerText = binaryDiv.innerText.slice(20);
}, 150);
