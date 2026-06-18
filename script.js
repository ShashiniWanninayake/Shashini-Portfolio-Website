<script>
window.onload = function () {

    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();

    const stars = [];
    const count = 200;

    // create stars ONCE (important fix)
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 1.5,
            speed: Math.random() * 0.3 + 0.05
        });
    }

    function animate() {

        // IMPORTANT: slight fade instead of full reset (removes blinking)
        ctx.fillStyle = "rgba(5, 6, 10, 0.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let s of stars) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);

            ctx.fillStyle = "rgba(0, 255, 204, 0.7)";
            ctx.fill();

            // smooth FLOAT (not falling fast)
            s.y += s.speed;

            // wrap smoothly
            if (s.y > canvas.height) {
                s.y = 0;
                s.x = Math.random() * canvas.width;
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", resize);

};
</script>
