'use client';

import { useState, useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

/* ----------------------------------------------------------------
   DMV Blooms demo content — curated for current season (April)
   ---------------------------------------------------------------- */
interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1',
    poster:
      'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1280&q=80&auto=format&fit=crop',
    background:
      'https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=1920&q=80&auto=format&fit=crop',
    title: 'Cherry Blossoms Peak Bloom',
    date: 'April 2026',
    scrollToExpand: 'Scroll to explore the Tidal Basin',
    about: {
      overview:
        'Experience DC\'s iconic cherry blossoms at peak bloom. Over 3,000 Yoshino cherry trees surround the Tidal Basin, transforming the National Mall into clouds of pale pink. This video captures the ephemeral beauty of peak bloom — a window that lasts only days each spring.',
      conclusion:
        'The scroll-expansion effect mirrors the feeling of walking through the blossoms — starting with a glimpse, then being completely enveloped. Visit at sunrise for golden light and thin crowds.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=1280&q=80&auto=format&fit=crop',
    background:
      'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1920&q=80&auto=format&fit=crop',
    title: 'Tulip Season in the DMV',
    date: 'April 2026',
    scrollToExpand: 'Scroll to explore the fields',
    about: {
      overview:
        'Two million tulips across 30 varieties at Burnside Farms in Nokesville, Virginia. The Floral Library near the Tidal Basin plants 10,000 bulbs in 93 labeled beds. The Netherlands Carillon in Arlington offers tulip fields with sweeping monument views.',
      conclusion:
        'The image expansion creates an immersive reveal — from a window into the tulip fields to a full-viewport experience. This component works beautifully for showcasing the scale and color of spring blooms.',
    },
  },
};

const MediaContentBlock = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-[family-name:var(--font-serif)] text-3xl font-light mb-6 text-foreground">
        About This Bloom
      </h2>
      <p className="text-lg mb-8 text-foreground/70 leading-relaxed font-[family-name:var(--font-serif)] italic font-light">
        {currentMedia.about.overview}
      </p>
      <p className="text-lg mb-8 text-foreground/70 leading-relaxed font-[family-name:var(--font-serif)] italic font-light">
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

export const CherryBlossomExpansion = () => {
  const mediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContentBlock mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const TulipExpansion = () => {
  const mediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContentBlock mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

const Demo = () => {
  const [mediaType, setMediaType] = useState('video');
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setMediaType('video')}
          className={`px-4 py-2 text-xs tracking-wide uppercase transition-all duration-300 ${
            mediaType === 'video'
              ? 'bg-cream text-foreground'
              : 'bg-black/30 text-white/80 border border-white/10 hover:bg-black/50'
          }`}
        >
          Cherry Blossoms
        </button>
        <button
          onClick={() => setMediaType('image')}
          className={`px-4 py-2 text-xs tracking-wide uppercase transition-all duration-300 ${
            mediaType === 'image'
              ? 'bg-cream text-foreground'
              : 'bg-black/30 text-white/80 border border-white/10 hover:bg-black/50'
          }`}
        >
          Tulips
        </button>
      </div>

      <ScrollExpandMedia
        mediaType={mediaType as 'video' | 'image'}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContentBlock mediaType={mediaType as 'video' | 'image'} />
      </ScrollExpandMedia>
    </div>
  );
};

export default Demo;
