export const BRAND = {
  name: 'The Silo',
  handle: '@thesilo.pk',
  instagram: 'https://www.instagram.com/thesilo.pk/',
  facebook: 'https://www.facebook.com/TheSilo.pk/',
  phone: '+92 309 7867456',
  tel: 'tel:+923097867456',
  whatsapp: '923097867456',
  address: 'Plot C-35, E-Street, Block 4, Clifton, Karachi',
  maps: 'https://www.google.com/maps/search/?api=1&query=The+Silo+E+Street+Block+4+Clifton+Karachi',
}

export const NAV = [
  { id: 'experience', label: 'Experience' },
  { id: 'menu', label: 'Menu' },
  { id: 'rooftop', label: 'Rooftop' },
  { id: 'reserve', label: 'Reservations' },
]

// g = [from, via, to] gradient stops used as the dish "art" until real photos exist
export const MENU = {
  Japanese: [
    { name: 'Takikomi Gohan', desc: 'Japanese rice steamed in rich dashi and soy — deep, savoury, quietly addictive.', price: 'PKR 1,550', g: ['#D97706', '#DB2777', '#4a0d1c'] },
    { name: 'Tori Goma', desc: 'Crispy sesame chicken with artisanal house coleslaw.', price: 'PKR 1,695', g: ['#f59e0b', '#c2315a', '#2a0a14'] },
    { name: 'Sushi & Sashimi', desc: 'Assorted rolls, sashimi and smoked salmon with roe, plated at the counter.', price: 'Ask your server', g: ['#fb7185', '#a3234a', '#4a0d1c'] },
    { name: 'Dim Sum', desc: 'Steamed dumplings and buns, made for sharing across the table.', price: 'Ask your server', g: ['#fbbf24', '#c2410c', '#3d0c18'] },
  ],
  Continental: [
    { name: 'Chicken with Sun-Dried Tomato', desc: 'Pan-seared chicken, sun-dried tomato and basil in a tangy reduction.', price: 'PKR 2,485', g: ['#ea580c', '#be123c', '#4a0d1c'] },
    { name: 'Ossobuco', desc: 'Slow-braised, falling-off-the-bone Italian classic.', price: 'Ask your server', g: ['#b45309', '#9f1239', '#2a0a14'] },
    { name: 'Wood-fired Pizza', desc: 'Blistered crust, bright tomato, and charcuterie on the side.', price: 'Ask your server', g: ['#f97316', '#db2777', '#5c1124'] },
  ],
  Desserts: [
    { name: 'Hazelnut Crème Brûlée', desc: 'A guest favourite — glassy caramel over silky hazelnut custard.', price: 'Ask your server', g: ['#d97706', '#b0284a', '#4a0d1c'] },
    { name: 'Chocolate Fondue', desc: 'Warm chocolate, fruit and cake for the table.', price: 'Ask your server', g: ['#92400e', '#a3234a', '#2a0a14'] },
    { name: 'Chocolate Mousse', desc: 'Dark, airy and not too sweet.', price: 'Ask your server', g: ['#78350f', '#c2315a', '#4a0d1c'] },
  ],
  'Drinks & Coffee': [
    { name: 'Craft Mocktails', desc: 'Fresh, glowing and made to match the rooftop sunset.', price: 'Ask your server', g: ['#f472b6', '#a3213a', '#2a0a14'] },
    { name: 'Specialty Coffee', desc: 'Artisanal brews to close the evening.', price: 'Ask your server', g: ['#d97706', '#92400e', '#4a0d1c'] },
  ],
}

export const MOMENTS = [
  { t: 'Date Night', d: 'Low light, a corner table, a long dinner.', type: 'Table' },
  { t: 'Private Domes', d: 'Reserve a glass dome for two or a small circle.', type: 'Dome' },
  { t: 'Ramadan Iftar', d: 'Themed décor and a menu made for gathering.', type: 'Table' },
  { t: "Valentine's", d: 'Our most loved evening of the year.', type: 'Dome' },
  { t: "Mother's Day", d: 'A table worth celebrating her at.', type: 'Table' },
  { t: 'Hi-Tea & Buffet', d: 'Seasonal spreads — follow us for dates.', type: 'Table' },
]

export const SHOTS = [
  { cap: 'A Night to Remember', sub: 'The façade · watch the reel', img: '/images/silo-facade.jpg', pos: '50% 50%', url: 'https://www.instagram.com/reel/DPb9b5qCN5e/' },
  { cap: 'Rooftop & Sea View', sub: 'Clifton skyline · watch the reel', img: '/images/silo-rooftop.jpg', pos: '50% 50%', url: 'https://www.instagram.com/reel/DZXlc_7omP2/' },
  { cap: 'Sílo', sub: 'Continental & Japanese', img: '/images/silo-logo.jpg', pos: '50% 50%' },
]
