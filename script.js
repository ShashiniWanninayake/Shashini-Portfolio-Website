<script>
window.onload = function () {

    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    // Set canvas size
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();

    // Create stars
    const stars = [];
    const count = 180;

    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5,
            speed: Math.random() * 0.15 + 0.05
        });
    }

    // Animate
    function animate() {

        // background fade (keeps trail smooth)
        ctx.fillStyle = "#05060a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let s of stars) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);

            ctx.fillStyle = "rgba(0, 255, 204, 0.8)";
            ctx.fill();

            // slow floating movement
            s.y += s.speed * 0.3;

            // reset when out of screen
            if (s.y > canvas.height) {
                s.y = 0;
                s.x = Math.random() * canvas.width;
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    // resize fix
    window.addEventListener("resize", () => {
        resize();
    });

};
</script>
