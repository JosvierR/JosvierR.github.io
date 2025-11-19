// Parallax effect on the phone mockup
document.addEventListener("mousemove", (e) => {
    const mockup = document.getElementById("mockup");
    let x = (e.clientX / window.innerWidth - 0.5) * 10;
    let y = (e.clientY / window.innerHeight - 0.5) * 10;
    mockup.style.transform = `translate(${x}px, ${y}px)`;
});
