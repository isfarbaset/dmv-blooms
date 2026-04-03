/* ============================================================
   DMV BLOOMS — DATA & UTILITIES
   ============================================================ */

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

export type BloomStatus = 'peak' | 'blooming' | 'ending' | 'upcoming' | 'waiting';

/* ----------------------------------------------------------------
   BLOOM DATA
   ---------------------------------------------------------------- */
export interface Bloom {
  name: string;
  image: string;
  months: number[];   // 0-indexed months when blooming
  peak: number[];     // 0-indexed months when at peak
  season: string;     // human-readable season text
  description: string;
  longDescription: string;
  color: string;      // accent color hex
  locations: string[];
}

export const BLOOMS: Bloom[] = [
  {
    name: 'Cherry Blossoms',
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80&auto=format&fit=crop',
    months: [2, 3],
    peak: [2, 3],
    season: 'Late Mar – Early Apr',
    description: "DC's signature bloom. Yoshino cherries turn the Tidal Basin into clouds of pale pink. Kwanzan varieties follow two to three weeks later with deeper color.",
    longDescription: "Cherry blossoms are the crown jewel of spring in the nation's capital. Every year, over 3,000 trees — a gift from Tokyo in 1912 — transform the Tidal Basin into a dreamscape of pale pink and white. The peak typically lasts only a few days, making the National Cherry Blossom Festival a race against time and weather. Beyond the Basin, Kenwood in Bethesda offers a neighborhood blanketed in blooms, while Hains Point and Congressional Cemetery provide quieter alternatives. Kwanzan cherries extend the season by two to three weeks with deeper pink, double-petaled blooms. Early morning visits beat the crowds — sunrise at the Tidal Basin during peak bloom is one of DC's most magical experiences.",
    color: '#e8d5d5',
    locations: ['Tidal Basin', 'National Arboretum', 'Kenwood, MD', 'Hains Point', 'Congressional Cemetery'],
  },
  {
    name: 'Magnolias',
    image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=800&q=80&auto=format&fit=crop',
    months: [2, 3],
    peak: [2],
    season: 'Early – Mid Mar',
    description: 'Saucer magnolias in pink, white and purple appear a few weeks before the cherries. Enormous blooms, surprisingly fragrant.',
    longDescription: "Magnolias are among the first dramatic bloomers of the DC spring, appearing weeks before the cherry blossoms steal the spotlight. The saucer magnolias at the Enid Haupt Garden behind the Smithsonian Castle produce some of the most spectacular displays in the city — enormous pink-purple blooms against the Castle's red sandstone walls. Dumbarton Oaks in Georgetown and the Hillwood Estate in Northwest DC also feature magnificent specimens. These early bloomers are fragile — a late frost can destroy an entire season overnight, making each successful bloom feel precious.",
    color: '#e8dce8',
    locations: ['Enid Haupt Garden', 'Dumbarton Oaks', 'Rock Creek Park', 'Hillwood Estate'],
  },
  {
    name: 'Tulips',
    image: 'https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=800&q=80&auto=format&fit=crop',
    months: [3, 4],
    peak: [3],
    season: 'Early – Mid Apr',
    description: 'Every color you can imagine. The Floral Library has 10,000 bulbs in 93 beds. Burnside Farms plants two million across 30 varieties.',
    longDescription: "Tulips bring a riot of color to the DMV every April. The Floral Library near the Tidal Basin is a hidden gem — 10,000 bulbs planted in 93 labeled beds, part of Lady Bird Johnson's beautification legacy. For sheer scale, nothing beats Burnside Farms in Nokesville, Virginia, where two million tulips across 30 varieties create endless rows of color. The Netherlands Carillon near Arlington National Cemetery offers tulip fields around a 50-bell tower gifted by the Netherlands after WWII — a moving backdrop for a spring walk. Tulips thrive in the DMV's climate, and the season stretches from early to mid-April depending on the warmth.",
    color: '#f0ddd5',
    locations: ['Floral Library', 'Burnside Farms, VA', 'Netherlands Carillon', 'U.S. Capitol Grounds'],
  },
  {
    name: 'Bluebells',
    image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800&q=80&auto=format&fit=crop',
    months: [2, 3],
    peak: [3],
    season: 'Late Mar – Mid Apr',
    description: "Virginia bluebells carpet riverside forests in waves of purple-blue. Blink and you'll miss them — the season is short and enchanting.",
    longDescription: "Virginia bluebells are one of the DMV's most ephemeral spring wildflowers. For just a few weeks each April, riverside forests from Bull Run to Great Falls are carpeted in waves of purple-blue — the color shifting from pink buds to deep blue as the flowers mature. Bull Run Regional Park in Centreville and Riverbend Park in Great Falls host the most dramatic displays, where entire forest floors become seas of color along the river trail. The annual Bluebell Festival at Riverbend features guided wildflower walks, live music, and local food trucks.",
    color: '#d5dce8',
    locations: ['Bull Run Regional Park', 'Riverbend Park, VA', 'C&O Canal', 'Great Falls Park'],
  },
  {
    name: 'Azaleas',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80&auto=format&fit=crop',
    months: [3, 4],
    peak: [3, 4],
    season: 'Late Apr – Mid May',
    description: 'Mount Hamilton at the Arboretum becomes a hillside of red, pink, purple and white. Peak happens in stages over several weeks.',
    longDescription: "As cherry blossoms fade, azaleas take the stage. The National Arboretum's Mount Hamilton is blanketed with over 10,000 azalea bushes — the hillside becomes an impressionist painting of red, pink, coral, purple, and white that peaks in stages over several weeks. The Franciscan Monastery in Brookland and Brookside Gardens in Wheaton offer more intimate but equally stunning displays. Dumbarton Oaks in Georgetown weaves azaleas through its terraced Italian-style garden for a refined experience. Unlike cherry blossoms, azalea season is more forgiving — the bloom window stretches across three to four weeks.",
    color: '#e8d5dd',
    locations: ['National Arboretum', 'Franciscan Monastery', 'Brookside Gardens, MD', 'Dumbarton Oaks'],
  },
  {
    name: 'Wisteria',
    image: 'https://images.unsplash.com/photo-1399055124039-59e9346a3f9f?w=800&q=80&auto=format&fit=crop',
    months: [3, 4],
    peak: [3, 4],
    season: 'Apr – May',
    description: "Cascading purple racemes dripping from pergolas and stone walls. Dumbarton Oaks and Georgetown's R Street are the spots.",
    longDescription: "Wisteria transforms Georgetown and Upper Northwest DC into a purple-draped fairyland every spring. The cascading racemes — some stretching over a foot long — drip from pergolas, arbors, and stone walls like nature's own chandeliers. Dumbarton Oaks' wisteria-covered pergola is the most photographed spot, where generations of visitors have paused beneath curtains of lavender blooms. Walk R Street and 31st Street in Georgetown for wisteria climbing rowhouse facades. The National Cathedral's Bishop's Garden weaves wisteria through its medieval-inspired pathways. Peak is fleeting — two to three weeks in mid-spring — so time your visit carefully.",
    color: '#ddd5e8',
    locations: ['Dumbarton Oaks', 'Georgetown streets', 'Tudor Place', 'National Cathedral'],
  },
  {
    name: 'Lilacs',
    image: 'https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=800&q=80&auto=format&fit=crop',
    months: [3],
    peak: [3],
    season: 'April',
    description: "Fragrant purple and white clusters. Georgetown's lilac-covered walls are a spring tradition worth seeking out.",
    longDescription: "Lilacs bring fragrance to the DMV spring like nothing else. Their clustered blooms of purple, lavender, and white carry a perfume so distinctive that a single branch can fill a room. Georgetown's residential streets, particularly in the neighborhoods around Dumbarton Oaks, feature century-old lilac hedges that burst into color each April. The National Arboretum's collection offers dozens of cultivated varieties. These are flowers you follow with your nose — their scent travels on spring breezes and stops you in your tracks.",
    color: '#ddd5e5',
    locations: ['Georgetown', 'Dumbarton Oaks', 'National Arboretum'],
  },
  {
    name: 'Roses',
    image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80&auto=format&fit=crop',
    months: [5, 6, 7],
    peak: [5, 6],
    season: 'Jun – Aug',
    description: "Summer heat brings out the roses. The Botanic Garden's collection and the Bon Air Rose Garden in Arlington are standouts.",
    longDescription: "When summer heat settles over the capital, roses take center stage. The U.S. Botanic Garden at the foot of Capitol Hill maintains an exceptional collection in their outdoor gardens — hundreds of varieties from hybrid teas to climbing roses, all free to visit. In Arlington, the Bon Air Rose Garden is a neighborhood gem with over 100 varieties arranged in formal beds. The Franciscan Monastery in Brookland grows heirloom varieties among its Byzantine-style gardens. Summer roses in the DMV bloom in waves from June through August, with deadheading encouraging repeat performances.",
    color: '#e8d5d5',
    locations: ['U.S. Botanic Garden', 'Franciscan Monastery', 'Bon Air Rose Garden, VA', 'Brookside Gardens, MD'],
  },
  {
    name: 'Hydrangeas',
    image: 'https://images.unsplash.com/photo-1527325678964-54b9f5e8b5a8?w=800&q=80&auto=format&fit=crop',
    months: [5, 6, 7],
    peak: [5, 6],
    season: 'Jun – Jul',
    description: "Big clusters of blue, pink and white that love the DMV's humidity. Yards Park has a surprisingly good showing.",
    longDescription: "Hydrangeas are the DMV's midsummer showstoppers. Their massive mophead and lacecap clusters come in every shade of blue, pink, purple, and white — the color depending on soil pH. Georgetown's shaded gardens are particularly good for hydrangeas, where the large shrubs spill over brick walls and iron fences. The Yards Park along the Navy Yard waterfront has a surprisingly lush display, while Tudor Place in Georgetown integrates them into its historic landscape. The Franciscan Monastery grounds feature massive hydrangea borders that peak in late June and July.",
    color: '#d5dce5',
    locations: ['Yards Park', 'Georgetown', 'Franciscan Monastery', 'Tudor Place'],
  },
  {
    name: 'Lavender',
    image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&q=80&auto=format&fit=crop',
    months: [5, 6],
    peak: [5, 6],
    season: 'Jun – Jul',
    description: 'Rolling fields of fragrant purple at farms across Maryland and Virginia. Many open for pick-your-own season.',
    longDescription: "Lavender fields bring a touch of Provence to the DMV countryside. Farms across Maryland and Virginia open their gates from June through July, offering pick-your-own experiences among rolling rows of fragrant purple. Seven Oaks Lavender Farm in the Virginia piedmont and Soleado Lavender Farm in Maryland host festivals with workshops, tastings, and photo opportunities among the blooms. Springfield Manor in Frederick County combines lavender fields with winery tasting. The fragrance alone is worth the drive — lavender fields hum with bees and butterflies under the summer sun.",
    color: '#ddd5e8',
    locations: ['Seven Oaks Lavender Farm, VA', 'Soleado Lavender Farm, MD', 'Springfield Manor, MD'],
  },
  {
    name: 'Lotus & Water Lilies',
    image: 'https://images.unsplash.com/photo-1524055988636-436cfa46e59e?w=800&q=80&auto=format&fit=crop',
    months: [6, 7],
    peak: [6, 7],
    season: 'Jul – Aug',
    description: 'Kenilworth Aquatic Gardens is the only national park dedicated to water flowers. Go early morning for the best blooms.',
    longDescription: "Kenilworth Aquatic Gardens, tucked along the Anacostia River in Northeast DC, is the only national park dedicated entirely to water-loving plants — and it's one of the DMV's most magical experiences. Ancient lotus flowers unfurl enormous pink and white blooms that float above the water on summer mornings, some blossoms measuring over a foot across. Water lilies carpet the pond surfaces in whites, yellows, and pinks. The key is timing: arrive early morning, ideally before 10 AM, when the flowers are fully open. By afternoon, many close against the heat. The annual Lotus & Water Lily Festival draws thousands.",
    color: '#d5e5dc',
    locations: ['Kenilworth Aquatic Gardens'],
  },
  {
    name: 'Sunflowers',
    image: 'https://images.unsplash.com/photo-1551945326-df678ef46d73?w=800&q=80&auto=format&fit=crop',
    months: [6, 7, 8],
    peak: [6, 7],
    season: 'Mid Jul – Sep',
    description: 'Thirty-plus acres of towering gold at McKee-Beshers. Bring bug spray and a camera. The fields are free to wander.',
    longDescription: "McKee-Beshers Wildlife Management Area in Poolesville, Maryland, plants over thirty acres of sunflowers each summer — and entry is completely free. The fields of towering golden blooms against blue summer skies create one of the most photographed scenes in the DMV. Peak is typically mid-July through early August, when the flowers stand six to eight feet tall and face east in unison. Burnside Farms in Virginia also plants sunflower fields for their late-summer festival. Come early for the best light and fewer crowds. Bring bug spray — the fields are gorgeous but the mosquitoes are real.",
    color: '#e8e5d5',
    locations: ['McKee-Beshers WMA, MD', 'Burnside Farms, VA'],
  },
];

/* ----------------------------------------------------------------
   LOCATION DATA
   ---------------------------------------------------------------- */
export interface Location {
  name: string;
  lat: number;
  lng: number;
  flowers: string[];
  description: string;
  region: 'DC' | 'MD' | 'VA';
  color: string;
  image: string;
}

export const LOCATIONS: Location[] = [
  { name: 'Tidal Basin', lat: 38.8822, lng: -77.0365, flowers: ['Cherry Blossoms', 'Tulips'], description: '3,000+ cherry trees along the water. Sunrise visits are magical and crowd-free.', region: 'DC', color: '#e8d5d5', image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=640&q=80&auto=format&fit=crop' },
  { name: 'National Arboretum', lat: 38.9126, lng: -76.9658, flowers: ['Azaleas', 'Cherry Blossoms', 'Magnolias'], description: '446 free acres. The azalea hillside is worth the drive to NE.', region: 'DC', color: '#e8d5dd', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=640&q=80&auto=format&fit=crop' },
  { name: 'Enid Haupt Garden', lat: 38.8883, lng: -77.0259, flowers: ['Magnolias', 'Tulips'], description: 'Behind the Smithsonian Castle. The saucer magnolias here are some of the best in the city.', region: 'DC', color: '#e8dce8', image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=640&q=80&auto=format&fit=crop' },
  { name: 'Dumbarton Oaks', lat: 38.9148, lng: -77.0632, flowers: ['Wisteria', 'Magnolias', 'Azaleas', 'Lilacs'], description: "Georgetown's wisteria pergola is iconic. $15 tickets. Book early in spring.", region: 'DC', color: '#ddd5e8', image: 'https://images.unsplash.com/photo-1399055124039-59e9346a3f9f?w=640&q=80&auto=format&fit=crop' },
  { name: 'Kenwood', lat: 38.9685, lng: -77.1092, flowers: ['Cherry Blossoms'], description: 'A residential neighborhood in Bethesda with cherry-lined streets. Feels like a secret.', region: 'MD', color: '#e8d5d5', image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=640&q=80&auto=format&fit=crop' },
  { name: 'Brookside Gardens', lat: 39.0562, lng: -77.0484, flowers: ['Azaleas', 'Tulips', 'Roses'], description: '50-acre public garden in Wheaton. Free admission, beautiful in every season.', region: 'MD', color: '#d5e5dc', image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=640&q=80&auto=format&fit=crop' },
  { name: 'Burnside Farms', lat: 38.6965, lng: -77.5555, flowers: ['Tulips', 'Sunflowers'], description: 'Two million tulips. The Festival of Spring is a must. Tickets required.', region: 'VA', color: '#f0ddd5', image: 'https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=640&q=80&auto=format&fit=crop' },
  { name: 'Bull Run Regional Park', lat: 38.8029, lng: -77.4658, flowers: ['Bluebells'], description: 'Bluebell-carpeted forests along the river in Centreville. Magical and free.', region: 'VA', color: '#d5dce8', image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=640&q=80&auto=format&fit=crop' },
  { name: 'Riverbend Park', lat: 39.0210, lng: -77.2478, flowers: ['Bluebells'], description: 'Annual Bluebell Festival with wildflower walks, live music, and food trucks.', region: 'VA', color: '#d5dce8', image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=640&q=80&auto=format&fit=crop' },
  { name: 'Franciscan Monastery', lat: 38.9333, lng: -76.9928, flowers: ['Azaleas', 'Roses', 'Tulips'], description: "DC's best-kept garden secret. Free tours on Saturdays, April through September.", region: 'DC', color: '#e8d5dd', image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=640&q=80&auto=format&fit=crop' },
  { name: 'Kenilworth Aquatic Gardens', lat: 38.9130, lng: -76.9408, flowers: ['Lotus & Water Lilies'], description: 'The only national park for aquatic flowers. Early morning in summer is the move.', region: 'DC', color: '#d5e5dc', image: 'https://images.unsplash.com/photo-1524055988636-436cfa46e59e?w=640&q=80&auto=format&fit=crop' },
  { name: 'McKee-Beshers WMA', lat: 39.0925, lng: -77.3088, flowers: ['Sunflowers'], description: '30+ acres of sunflowers in Poolesville. Free. Bring bug spray.', region: 'MD', color: '#e8e5d5', image: 'https://images.unsplash.com/photo-1551945326-df678ef46d73?w=640&q=80&auto=format&fit=crop' },
  { name: 'Netherlands Carillon', lat: 38.8916, lng: -77.0663, flowers: ['Tulips'], description: 'Tulip fields around a bell tower gifted by the Netherlands after WWII.', region: 'VA', color: '#f0ddd5', image: 'https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=640&q=80&auto=format&fit=crop' },
  { name: 'Georgetown Streets', lat: 38.9109, lng: -77.0595, flowers: ['Wisteria', 'Lilacs', 'Hydrangeas'], description: 'R Street and 31st Street. Wisteria walls and lilac-draped rowhouses.', region: 'DC', color: '#ddd5e8', image: 'https://images.unsplash.com/photo-1399055124039-59e9346a3f9f?w=640&q=80&auto=format&fit=crop' },
  { name: 'National Cathedral', lat: 38.9306, lng: -77.0708, flowers: ['Wisteria', 'Cherry Blossoms'], description: "The Bishop's Garden is a hidden medieval-style retreat with old-growth forest.", region: 'DC', color: '#ddd5e8', image: 'https://images.unsplash.com/photo-1399055124039-59e9346a3f9f?w=640&q=80&auto=format&fit=crop' },
  { name: 'U.S. Botanic Garden', lat: 38.8882, lng: -77.0128, flowers: ['Roses'], description: 'Living plant museum at the foot of Capitol Hill. Free admission, year-round.', region: 'DC', color: '#e8d5d5', image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=640&q=80&auto=format&fit=crop' },
  { name: 'Hains Point', lat: 38.8630, lng: -77.0227, flowers: ['Cherry Blossoms'], description: "East Potomac Park's quiet tip. Fewer crowds, beautiful waterfront trees.", region: 'DC', color: '#e8d5d5', image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=640&q=80&auto=format&fit=crop' },
  { name: 'Floral Library', lat: 38.8847, lng: -77.0317, flowers: ['Tulips'], description: "10,000 tulip bulbs in 93 beds. Part of Lady Bird Johnson's beautification project.", region: 'DC', color: '#f0ddd5', image: 'https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=640&q=80&auto=format&fit=crop' },
  { name: 'Congressional Cemetery', lat: 38.8794, lng: -76.9793, flowers: ['Cherry Blossoms'], description: 'Historic and peaceful. Beautiful cherry trees, fewer crowds, dogs welcome.', region: 'DC', color: '#e8d5d5', image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=640&q=80&auto=format&fit=crop' },
  { name: 'Lady Bird Johnson Park', lat: 38.8790, lng: -77.0490, flowers: ['Cherry Blossoms'], description: 'Thousands of daffodils in early spring plus weeping cherries. Lincoln Memorial views.', region: 'VA', color: '#e8e5d5', image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=640&q=80&auto=format&fit=crop' },
];

/* ----------------------------------------------------------------
   STATUS UTILITIES
   ---------------------------------------------------------------- */
export function getBloomStatus(bloom: Bloom): BloomStatus {
  const now = new Date();
  const cm = now.getMonth();
  const cd = now.getDate();

  // Cherry blossoms have special peak logic
  if (bloom.name === 'Cherry Blossoms') {
    if (cm === 2 && cd >= 20) return 'peak';
    if (cm === 3 && cd <= 10) return 'peak';
    if (cm === 3) return 'ending';
    if (cm === 2) return 'blooming';
  }

  if (bloom.peak.includes(cm)) return 'peak';
  if (bloom.months.includes(cm)) return 'blooming';
  if (bloom.months.includes((cm + 1) % 12) || bloom.months.includes((cm + 2) % 12)) return 'upcoming';
  return 'waiting';
}

export function getStatusLabel(status: BloomStatus): string {
  const labels: Record<BloomStatus, string> = {
    peak: 'Peak Bloom',
    blooming: 'Blooming',
    ending: 'Fading',
    upcoming: 'Coming Soon',
    waiting: 'Dormant',
  };
  return labels[status];
}

export function getStatusColor(status: BloomStatus): string {
  const colors: Record<BloomStatus, string> = {
    peak: 'bg-sage text-white',
    blooming: 'bg-gold/80 text-white',
    ending: 'bg-rose/80 text-white',
    upcoming: 'bg-foreground/40 text-white',
    waiting: 'bg-foreground/25 text-white',
  };
  return colors[status];
}

export function getLocationStatus(location: Location): BloomStatus {
  const order: BloomStatus[] = ['peak', 'blooming', 'ending', 'upcoming', 'waiting'];
  let best: BloomStatus = 'waiting';

  location.flowers.forEach((flowerName) => {
    const bloom = BLOOMS.find((b) => b.name === flowerName);
    if (bloom) {
      const s = getBloomStatus(bloom);
      if (order.indexOf(s) < order.indexOf(best)) best = s;
    }
  });

  return best;
}
