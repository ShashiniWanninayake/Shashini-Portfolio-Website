<script>
window.onload = function () {

    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    resize();

    const stars = [];
    const count = 200;

    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.3,
          speed: Math.random() * 0.6 + 0.2
        });
    }

    function draw() {

        // FULL CLEAR (but stable)
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < stars.length; i++) {

            let s = stars[i];

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);

            ctx.fillStyle = "#00ffcc";
            ctx.fill();

            // VERY slow movement (fixes "falling fast")
            s.y += s.speed * 0.4;

            // reset
            if (s.y > h) {
                s.y = 0;
                s.x = Math.random() * w;
            }
        }

        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", resize);

};
</script>
