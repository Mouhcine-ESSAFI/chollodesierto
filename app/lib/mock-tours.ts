export type TourRoute = {
  id: string;
  title: string;
  badge: string;
  badgeStyle: 'default' | 'popular';
  stops: [string, string, string];
  description: string;
  price: number;
  days: number;
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
};

export type CampTier = {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  badgeStyle: 'included' | 'upgrade';
  price: string;
  imageUrl: string;
  imageAlt: string;
  features: string[];
  bestFor: string;
};

export const TOUR_ROUTES: TourRoute[] = [
  {
    id: 'reverse-crossing',
    title: 'The Reverse Crossing',
    badge: 'Coming From the North?',
    badgeStyle: 'default',
    stops: ['Fez', 'Merzouga', 'Marrakech'],
    description: 'Start in the imperial city, end in the red one.',
    price: 155,
    days: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&q=80',
    imageAlt: 'The golden gates of Fez medina, starting point for the Reverse Crossing route',
    featured: false,
  },
  {
    id: 'classic-loop',
    title: 'The Classic Loop',
    badge: '⭐ Most Popular',
    badgeStyle: 'popular',
    stops: ['Marrakech', 'Merzouga', 'Marrakech'],
    description: 'The complete circle. Perfect if Marrakech is your home base.',
    price: 85,
    days: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1530939027401-cca9fd4a8c56?w=800&q=80',
    imageAlt: 'Marrakech Djemaa el-Fna square at dusk, starting point of the Classic Loop',
    featured: true,
  },
  {
    id: 'grand-crossing',
    title: 'The Grand Crossing',
    badge: 'Best for Travelers Heading North',
    badgeStyle: 'default',
    stops: ['Marrakech', 'Merzouga', 'Fez'],
    description: 'One way. Two imperial cities. An endless desert in between.',
    price: 115,
    days: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    imageAlt: 'Erg Chebbi dunes at golden hour, destination of the Grand Crossing route',
    featured: false,
  },
];

export const CAMP_TIERS: CampTier[] = [
  {
    id: 'shared',
    name: 'Shared Camp',
    tagline: '✨ Traditional. Social. Real.',
    badge: 'Included in Price',
    badgeStyle: 'included',
    price: 'Included',
    imageUrl:
      'https://images.unsplash.com/photo-1687789568716-6862f3e8b18a?w=800&q=80',
    imageAlt: 'Traditional Berber shared camp tent with warm lighting at night',
    features: [
      'Berber tent (shared with up to 4)',
      'Real beds, warm blankets',
      'Shared bathrooms',
      'Communal dinner around the fire',
    ],
    bestFor: '🎒 Best for: Solo travelers, backpackers, anyone who came for the vibes.',
  },
  {
    id: 'comfort',
    name: 'Comfort Camp',
    tagline: '✨ Private. Quiet. Easy.',
    badge: '+€15 Per Person',
    badgeStyle: 'upgrade',
    price: '+€15',
    imageUrl:
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    imageAlt: 'Private comfort tent with larger beds and personal bathroom in the Sahara',
    features: [
      'Private tent for your group',
      'Larger beds, better insulation',
      'Private bathroom inside the tent',
      'Same fire. Same dinner. Same stars.',
    ],
    bestFor: '👪 Best for: Couples, families, light upgraders.',
  },
  {
    id: 'superior',
    name: 'Superior Camp',
    tagline: '✨ Luxury, in the middle of nowhere.',
    badge: '+€45 Per Person',
    badgeStyle: 'upgrade',
    price: '+€45',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    imageAlt: 'Luxury superior suite tent in the Sahara with premium bedding and hot shower',
    features: [
      'Luxury private suite tent',
      'Premium bedding, real heating',
      'Private bathroom with hot shower',
      'Welcome drink, premium dinner',
    ],
    bestFor: '💍 Best for: Honeymoons, milestone trips, treat-yourself.',
  },
];

export const REVIEWS = [
  {
    id: '1',
    quote: 'Skeptical at first — how can it be this cheap? Turns out they just don\'t overcharge. Simple as that.',
    name: 'Emma',
    date: 'January 2025',
  },
  {
    id: '2',
    quote: 'Our guide Youssef grew up in the desert. His stories made the whole trip. You can\'t fake that.',
    name: 'Marcus K.',
    date: 'February 2025',
  },
  {
    id: '3',
    quote: 'The sunrise over Erg Chebbi changed something in me. I\'m not exaggerating. Book this trip.',
    name: 'Johan R.',
    date: 'October 2024',
  },
];

export const FAQS = [
  {
    q: 'Wait… is it really cold at night?',
    a: 'Yes — even in summer. Desert nights drop fast after sunset. Bring layers. We\'re not kidding.',
    defaultOpen: true,
  },
  {
    q: 'What if I\'ve never ridden a camel?',
    a: 'Perfect — most people haven\'t. Your guide walks alongside you the first few minutes. It\'s a short trek, not a rodeo.',
    defaultOpen: false,
  },
  {
    q: 'Can I do this with kids?',
    a: 'Absolutely. Families are some of our favorite groups. Kids love the camel ride, the fire, and the stars. We recommend the Comfort Camp tier for families.',
    defaultOpen: false,
  },
  {
    q: 'Will there be Wi-Fi? Be honest.',
    a: 'Honestly? No reliable Wi-Fi at camp. Limited mobile signal. This is actually the best part — one night completely offline under the Milky Way.',
    defaultOpen: false,
  },
  {
    q: 'I\'m a solo traveler. Will I feel out of place?',
    a: 'Solo travelers are our most common guests. By Day 2, you\'ll have friends from five different countries. The small group size makes this natural.',
    defaultOpen: false,
  },
  {
    q: 'What\'s your cancellation policy?',
    a: 'Free cancellation up to 48 hours before departure. You only pay 20% to reserve — the rest is due on the day. No complicated refund forms.',
    defaultOpen: false,
  },
  {
    q: 'Can you pick me up from my riad or the airport?',
    a: 'Yes — hotel/riad pickup in Marrakech included. Airport pickup available too, just mention it at booking. No extra fees.',
    defaultOpen: false,
  },
];
