'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ZoomImage {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  images: ZoomImage[];
}

export default function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    { src: images[0]?.src, alt: images[0]?.alt, scale: scale4, style: { width: '25vw', height: '25vh' } },
    { src: images[1]?.src, alt: images[1]?.alt, scale: scale5, style: { width: '35vw', height: '30vh', top: '-30vh', left: '5vw' } },
    { src: images[2]?.src, alt: images[2]?.alt, scale: scale6, style: { width: '20vw', height: '45vh', top: '-10vh', left: '-25vw' } },
    { src: images[3]?.src, alt: images[3]?.alt, scale: scale5, style: { width: '20vw', height: '25vh', left: '27.5vw' } },
    { src: images[4]?.src, alt: images[4]?.alt, scale: scale6, style: { width: '20vw', height: '25vh', top: '27.5vh', left: '5vw' } },
    { src: images[5]?.src, alt: images[5]?.alt, scale: scale8, style: { width: '15vw', height: '25vh', top: '27.5vh', left: '-22.5vw' } },
    { src: images[6]?.src, alt: images[6]?.alt, scale: scale9, style: { width: '10vw', height: '15vh', top: '-22.5vh', left: '25vw' } },
  ];

  return (
    <div ref={container} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {pictures.map(({ src, alt, scale, style }, index) => {
          if (!src) return null;
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            >
              <div className="relative" style={style}>
                <Image
                  src={src}
                  alt={alt || `DMV Bloom ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 35vw"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
