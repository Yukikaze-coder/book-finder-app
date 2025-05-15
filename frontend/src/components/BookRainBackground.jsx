import { useEffect, useRef } from 'react';

export default function BookRainBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const iconPaths = [
      '/book-icon1.png',
      '/book-icon2.png',
      '/book-icon3.png',
      '/book-icon4.png',
      '/book-icon5.png',
    ];

    const images = iconPaths.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const books = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < 50; i++) {
      const imageIndex = Math.floor(Math.random() * images.length);
      books.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 2,
        size: 24 + Math.random() * 16,
        rotation: Math.random() * 360,
        image: images[imageIndex],
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      books.forEach((book) => {
        book.y += book.speed;
        book.rotation += 0.01;
        if (book.y > canvas.height) {
          book.y = -book.size;
          book.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(book.x, book.y);
        ctx.rotate(book.rotation);
        ctx.drawImage(book.image, -book.size / 2, -book.size / 2, book.size, book.size);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    // Wait for all images to load
    let loaded = 0;
    images.forEach((img) => {
      img.onload = () => {
        loaded++;
        if (loaded === images.length) animate();
      };
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}