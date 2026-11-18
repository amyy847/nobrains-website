/* ==========================================================================
   NOBRAINS — portfolio data
   Every project card and case-study page is built from this list.
   Replace the placeholder entries with real projects. Any field left out
   falls back to the placeholder text defined in DEFAULTS below.

   To use real images, add an `images` object to a project, for example:
     images: { hero: "assets/work/naier/hero.jpg", cover: "assets/work/naier/cover.jpg",
               full: "assets/work/naier/full.jpg",
               gallery: ["assets/work/naier/1.jpg", "assets/work/naier/2.jpg", ...] }
   Missing images are drawn as branded placeholder panels.
   ========================================================================== */

window.NB_CATEGORIES = {
  branding: "Branding & Identity",
  print: "Print & Outdoor",
  social: "Social & Content",
  production: "Production"
};

window.NB_DEFAULTS = {
  client: "Client name",
  industry: "Industry",
  year: "To be added",
  country: "To be added",
  tagline: "A one-line idea that sums up the project goes here.",
  intro: "A short introduction to the client and the brief: who they are, who they need to reach and what they asked us to help with. Two or three sentences is plenty. Replace this with the real story of the partnership.",
  challenges: [
    { t: "Challenge one", d: "One line on something that stood in the way." },
    { t: "Challenge two", d: "One line on a second obstacle or constraint." },
    { t: "Challenge three", d: "One line on what made this brief tricky." }
  ],
  contribution: [
    { t: "What we did", d: "One line on the first thing we brought to the table." },
    { t: "How we did it", d: "One line on the approach or the craft involved." },
    { t: "What it unlocked", d: "One line on what the client can now do." }
  ],
  sections: [
    { label: "The thinking", title: "The idea", text: "Describe the strategic idea behind the work: the insight, the angle and why it fits this brand.", gallery: 3 },
    { label: "The making", title: "Bringing it to life", text: "Describe what was made: the identity, the content, the print pieces. Show the craft.", gallery: 2 },
    { label: "In the world", title: "Where people meet it", text: "Show the work in use: on the shelf, on the billboard, in the feed.", gallery: 1 }
  ],
  outcome: "Only real, measured results go here. Leave this out until there are numbers or a client quote to share.",
  link: ""
};

const VV = "assets/work/vv-design-house/";
const HWK = "assets/work/halak-w-kerdan/";
const RDK = "assets/work/rdk/";
const AV = "assets/work/autovia/";

window.NB_PROJECTS = [
  {
    id: "vv-design-house",
    name: "VV Design House",
    client: "Vanessa Victor, VV Design House",
    industry: "Architecture & interior design",
    category: "social",
    services: ["Website", "Reels & posts", "Social media management"],
    year: "2026",
    country: "Egypt & Mauritius",
    theme: ["#f3eee6", "#1f1d1a"],
    shape: "pill",
    tagline: "Timeless spaces, given a home online.",
    intro: "VV Design House is the architecture and interior design studio of Vanessa Victor, working between Cairo and Mauritius on homes, hotels and luxury Nile cruises. The work already had presence. It needed a place to live online and a steady voice on social, so we built the website and make the reels and posts that keep it moving.",
    challenges: [
      { t: "Detail that photographs quietly", d: "Texture, light and material lose their depth in a standard portfolio template." },
      { t: "Two countries, one studio", d: "Projects in Cairo, on the Nile and in Mauritius had to read as one body of work." },
      { t: "Still spaces, moving feed", d: "Interiors had to hold attention in a feed built for motion." }
    ],
    contribution: [
      { t: "An editorial website", d: "Project pages built like chapters, around large photography and the studio’s own ink sketch." },
      { t: "Reels and carousels", d: "Short videos and detail posts that bring each space to life." },
      { t: "One consistent voice", d: "The same calm palette and type across the site, the grid and the highlights." }
    ],
    images: {
      cover: VV + "soleil.webp",
      hero: VV + "lumiere.webp",
      full: VV + "le-fayan-suites.webp"
    },
    sections: [
      {
        type: "website", bg: "cream",
        label: "Website", title: "A portfolio that lets the work breathe",
        text: "Large photography, quiet serif type and a soft cream palette, so each project reads like a chapter rather than a thumbnail. Every hotel, Nile cruise and home has its own page, with sliders and layouts that change from project to project.",
        url: "vv-design-house.vercel.app",
        screens: [
          { src: VV + "web-home.jpg", alt: "VV Design House website, home page" },
          { src: VV + "web-portfolio.jpg", alt: "VV Design House website, portfolio page" },
          { src: VV + "web-project.jpg", alt: "VV Design House website, Soleil project page" }
        ],
        mobile: { src: VV + "web-mobile.jpg", alt: "VV Design House website on a phone" },
        palette: [
          { name: "Cream", hex: "#f3eee6" },
          { name: "Linen", hex: "#ebe4d8" },
          { name: "Stone", hex: "#8d877d" },
          { name: "Ink", hex: "#1f1d1a" }
        ],
        fonts: [
          { name: "Cormorant Garamond", role: "Headlines", family: "'Cormorant Garamond', serif", style: "italic" },
          { name: "Jost", role: "Text & labels", family: "'Jost', sans-serif" }
        ]
      },
      {
        type: "instagram",
        label: "Social media", title: "Spaces in motion",
        text: "Reels that walk through each space, carousels that show the detail up close, and highlights that file every project away for later. One soft, editorial look across the whole grid.",
        handle: "vanessavictor.designhouse",
        avatar: "VV",
        bio: "Architect | Interior Designer · Hospitality | Residential | Commercial",
        posts: [
          { kind: "p", code: "Dfc8fR7kaGr", img: VV + "ig/01-p-Dfc8fR7kaGr.jpg" },
          { kind: "reel", code: "DfVaVELRq3R", img: VV + "ig/02-reel-DfVaVELRq3R.jpg" },
          { kind: "reel", code: "De19WeIMFKw", img: VV + "ig/03-reel-De19WeIMFKw.jpg" },
          { kind: "reel", code: "DezqbY-Rr3l", img: VV + "ig/04-reel-DezqbY-Rr3l.jpg" },
          { kind: "reel", code: "DepRpkyRlKR", img: VV + "ig/05-reel-DepRpkyRlKR.jpg" },
          { kind: "reel", code: "Demg4TXu8IH", img: VV + "ig/06-reel-Demg4TXu8IH.jpg" },
          { kind: "reel", code: "DeaDgKFxAQj", img: VV + "ig/07-reel-DeaDgKFxAQj.jpg" },
          { kind: "reel", code: "DePYYYfukBn", img: VV + "ig/08-reel-DePYYYfukBn.jpg" },
          { kind: "reel", code: "DdhTq9nRvgY", img: VV + "ig/09-reel-DdhTq9nRvgY.jpg" },
          { kind: "reel", code: "Dbn6Bo6tLm4", img: VV + "ig/10-reel-Dbn6Bo6tLm4.jpg" },
          { kind: "reel", code: "Ddt8vvfOO4H", img: VV + "ig/11-reel-Ddt8vvfOO4H.jpg" },
          { kind: "p", code: "Db09kabDXSW", img: VV + "ig/12-p-Db09kabDXSW.jpg" }
        ]
      },
      {
        type: "images",
        label: "The spaces", title: "Built around the photography",
        text: "Hotels, Nile cruises and private homes between Cairo and Mauritius. The website and the feed both start from the studio’s photography, so every decision serves the spaces themselves.",
        images: [
          { src: VV + "hacienda-white.webp", alt: "Hacienda White, a sculpted stone staircase" },
          { src: VV + "fa-ng.webp", alt: "FA•NG, a villa with a pool in New Giza" },
          { src: VV + "osiria-dahbeya.webp", alt: "Osiria Dahabeya, the dining lounge" }
        ]
      }
    ],
    outcome: "The website and the Instagram are both live. Have a look around.",
    links: [
      { label: "Visit the website", url: "https://vv-design-house.vercel.app/" },
      { label: "See the Instagram", url: "https://www.instagram.com/vanessavictor.designhouse/" }
    ]
  },
  {
    id: "halak-w-kerdan",
    name: "Halak w Kerdan",
    client: "Naglaa Salem, Halak w Kerdan",
    industry: "Handcrafted jewellery",
    category: "branding",
    services: ["Logo design", "Reels & posts", "Social media management"],
    year: "2026",
    country: "Egypt",
    theme: ["#9bcbb0", "#c10216"],
    shape: "ring",
    tagline: "One-of-a-kind jewellery, with a name you remember.",
    intro: "Halak w Kerdan means “earrings and kerdan”, the traditional Egyptian collar necklace. It is Naglaa Salem’s handcrafted jewellery label: statement pieces in gold, pearl and stone, each one made once, sold at Bazarna in District 5, at City Stars and at pop-ups across Cairo. We gave the name a sign to live under and keep the feed as bold as the pieces.",
    challenges: [
      { t: "Nothing is made twice", d: "Every piece is one of a kind, so the brand has to carry the story, not a product line." },
      { t: "Two languages, one name", d: "The name had to read naturally in Arabic and in English, on a shop sign and in a profile picture." },
      { t: "Many places at once", d: "Two shops, exhibitions and pop-ups all needed the same, instantly recognisable look." }
    ],
    contribution: [
      { t: "A logo with a sense of place", d: "Red Arabic calligraphy on a mint field, framed in gold, with beads hanging below like the jewellery itself." },
      { t: "Reels and posts", d: "Pieces worn and turned in the light, plus a poster for every exhibition and pop-up." },
      { t: "One look everywhere", d: "The same red, mint and gold from the shop sign to the feed." }
    ],
    images: {
      cover: HWK + "cover.jpg",
      hero: HWK + "hero.jpg"
    },
    sections: [
      {
        type: "brand", bg: "cream",
        label: "Identity", title: "An old Cairo shop sign, made for now",
        text: "Hand-lettered Arabic calligraphy in pomegranate red, the English name set in serif capitals, and an ornate gold frame around a mint field. The beads hanging below the sign echo the pieces themselves, so the logo already feels like jewellery.",
        image: { src: HWK + "logo-detail.jpg", alt: "Halak w Kerdan logo, detail of the calligraphy and gold frame" },
        palette: [
          { name: "Mint", hex: "#9bcbb0" },
          { name: "Pomegranate", hex: "#c10216" },
          { name: "Gold", hex: "#c19036" },
          { name: "Leaf", hex: "#0b4d2c" }
        ],
        fonts: [
          { name: "Arabic calligraphy", role: "Hand-lettered wordmark", family: "'Aref Ruqaa', serif", sample: "حلق", lang: "ar", color: "#c10216" },
          { name: "Serif capitals", role: "English name line", family: "'Cormorant Garamond', serif", weight: 700, sample: "Aa", color: "#c10216" }
        ]
      },
      {
        type: "instagram",
        label: "Social media", title: "Gold, up close",
        text: "Reels that show each piece being worn and caught in the light, carousels for new collections, and posters that bring people to every exhibition and pop-up.",
        handle: "halakwkerdan",
        avatarImg: HWK + "avatar.jpg",
        bio: "Handcrafted. One of a kind jewellery, with a story · District 5, Bazarna · City Stars",
        posts: [
          { kind: "reel", code: "Degtqm6I7mI", img: HWK + "ig/01-reel-Degtqm6I7mI.jpg" },
          { kind: "p", code: "DfPjP_XiC9U", img: HWK + "ig/02-p-DfPjP_XiC9U.jpg" },
          { kind: "reel", code: "Debls9eIJE0", img: HWK + "ig/03-reel-Debls9eIJE0.jpg" },
          { kind: "p", code: "De_9Lm-CDPV", img: HWK + "ig/04-p-De_9Lm-CDPV.jpg" },
          { kind: "reel", code: "De1-oZEI0xe", img: HWK + "ig/05-reel-De1-oZEI0xe.jpg" },
          { kind: "reel", code: "DepbPqQIROS", img: HWK + "ig/06-reel-DepbPqQIROS.jpg" },
          { kind: "p", code: "DeZF1GfiPbl", img: HWK + "ig/08-p-DeZF1GfiPbl.jpg" },
          { kind: "p", code: "DNOXKs2oQDw", img: HWK + "ig/10-p-DNOXKs2oQDw.jpg" }
        ]
      },
      {
        type: "images",
        label: "The pieces", title: "Made to be noticed",
        text: "Statement gold, pearl and stone, each piece made by hand and never repeated. The photography keeps the focus on the craft and on the person wearing it.",
        images: [
          { src: HWK + "ig/06-reel-DepbPqQIROS.jpg", alt: "Layered gold and pearl necklaces, worn" },
          { src: HWK + "ig/05-reel-De1-oZEI0xe.jpg", alt: "Gold statement necklaces on display" }
        ]
      }
    ],
    outcome: "The new look is live on Instagram, from the profile picture to every post. Have a look around.",
    links: [
      { label: "See the Instagram", url: "https://www.instagram.com/halakwkerdan/" }
    ]
  },
  {
    id: "rdk-developments",
    name: "RD.K Developments",
    client: "RD.K Developments",
    industry: "Real estate development",
    category: "branding",
    services: ["Brand identity", "Website", "Social media management"],
    year: "2026",
    country: "Egypt",
    theme: ["#0a3b25", "#d8c2a4"],
    shape: "ring",
    tagline: "An expression of excellence, from the name up.",
    intro: "RD.K Developments builds commercial destinations, residential communities and waterfront projects, starting with Autovia on Cairo’s Ring Road. A new developer needs to look established from its first day, so we built the identity, the website and the Instagram together, as one calm, confident voice.",
    challenges: [
      { t: "New name, serious money", d: "Investors and tenants had to trust a developer that was only just launching." },
      { t: "A portfolio still being built", d: "One project live, more on the way, and land waiting for its plans." },
      { t: "Bilingual, by necessity", d: "Plot names and locations had to work in English and Arabic." }
    ],
    contribution: [
      { t: "An identity built to last", d: "A clean wordmark, deep green and sand gold, and one confident line: An Expression of Excellence." },
      { t: "A website that sells space", d: "Developments, land plots, news and enquiry forms, so every visit can become a lead." },
      { t: "A feed with presence", d: "Brand films and posts that make the company feel bigger than its first launch." }
    ],
    images: {
      cover: RDK + "cover.jpg",
      video: "assets/video/rdk-hover.mp4",
      hero: RDK + "hero.jpg"
    },
    sections: [
      {
        type: "website", bg: "cream",
        label: "Website", title: "A developer’s address online",
        text: "Deep green, sand gold and quiet, wide type. The site introduces RD.K, gives Autovia its own launch page with the master plan and tenant brands, maps the land portfolio and turns every page into an enquiry.",
        url: "rdk-website.vercel.app",
        screens: [
          { src: RDK + "web-home.jpg", alt: "RD.K Developments website, home page" },
          { src: RDK + "web-autovia.jpg", alt: "RD.K Developments website, Autovia page" },
          { src: RDK + "web-about.jpg", alt: "RD.K Developments website, about page" }
        ],
        mobile: { src: RDK + "web-mobile.jpg", alt: "RD.K Developments website on a phone" },
        palette: [
          { name: "Green", hex: "#0a3b25" },
          { name: "Moss", hex: "#2a6151" },
          { name: "Sand gold", hex: "#d8c2a4" },
          { name: "Cream", hex: "#fcf7f0" }
        ],
        fonts: [
          { name: "Montserrat", role: "Headlines & text", family: "'Montserrat', sans-serif", weight: 500 }
        ]
      },
      {
        type: "instagram",
        label: "Social media", title: "An expression of excellence",
        text: "Brand films and stills that set the tone: architecture, master plans and the people behind them, in the same green and gold as the website.",
        handle: "rd.kdevelopments",
        avatarImg: RDK + "avatar.jpg",
        bio: "An Expression of Excellence. · rdkeg.com",
        posts: [
          { kind: "reel", code: "DfF1qAPsQpe", img: RDK + "ig/01-reel-DfF1qAPsQpe.jpg" },
          { kind: "p", code: "DeuWacoMUDI", img: RDK + "ig/06-p-DeuWacoMUDI.jpg" },
          { kind: "reel", code: "DerunlwMM4R", img: RDK + "ig/07-reel-DerunlwMM4R.jpg" },
          { kind: "p", code: "DepjBaEs77u", img: RDK + "ig/08-p-DepjBaEs77u.jpg" }
        ]
      },
      {
        type: "images",
        label: "In the world", title: "The brand, at full size",
        text: "From the head office reception to the flags at Autovia’s opening night, the identity holds up wherever people meet it.",
        images: [
          { src: RDK + "reception.jpg", alt: "RD.K reception desk with the logo on the wall" },
          { src: RDK + "flag.jpg", alt: "RD.K flag outside a showroom at night" }
        ]
      }
    ],
    outcome: "The website and the Instagram are both live. Have a look around.",
    links: [
      { label: "Visit the website", url: "https://rdk-website.vercel.app/" },
      { label: "See the Instagram", url: "https://www.instagram.com/rd.kdevelopments/" }
    ]
  },
  {
    id: "autovia",
    name: "Autovia",
    client: "RD.K Developments",
    industry: "Automotive & commercial destination",
    category: "branding",
    services: ["Logo & guidelines", "Launch campaign", "Content & event coverage"],
    year: "2026",
    country: "Egypt",
    theme: ["#262522", "#ea5f29"],
    shape: "play",
    tagline: "Built to be seen, from the Ring Road.",
    intro: "Autovia is RD.K’s first launch: 13,000 m² of car showrooms, service centres, retail and offices on Cairo’s Ring Road, with brands from GAC to Opel and Peugeot under one roof. We designed the logo, wrote the brand guidelines and ran the launch, from the first teaser to the grand opening night.",
    challenges: [
      { t: "Seen at 100 km/h", d: "The name had to read in a glance from a moving car." },
      { t: "Many brands, one place", d: "Each tenant keeps its own identity, so Autovia had to frame them without competing." },
      { t: "A launch with no address yet", d: "People had to care about the destination before the showrooms opened." }
    ],
    contribution: [
      { t: "A logo that moves", d: "Forward-leaning letters and an orange speed mark, endorsed “by RD.K”." },
      { t: "Brand guidelines", d: "Palette, type, clear space and signage, so every façade and post stays on brand." },
      { t: "Launch and opening", d: "The “All roads lead here” teasers, then full coverage of the GAC grand opening." }
    ],
    images: {
      cover: AV + "cover.jpg",
      hero: AV + "hero.jpg",
      full: AV + "full.jpg"
    },
    sections: [
      {
        type: "brand", bg: "cream",
        label: "Identity", title: "Speed you can read from the road",
        text: "Performance Orange and platinum on carbon black. The forward-leaning letterforms and the orange speed mark say motion and progress, and the “by RD.K” endorsement brings the developer’s credibility with it.",
        image: { src: AV + "brand-variants.jpg", alt: "Autovia logo variants on orange, graphite, cream and platinum" },
        palette: [
          { name: "Performance Orange", hex: "#ea5f29" },
          { name: "Carbon Black", hex: "#262522" },
          { name: "Graphite Grey", hex: "#454545" },
          { name: "Platinum", hex: "#ccc5b9" },
          { name: "Off-white", hex: "#fffef3" }
        ],
        fonts: [
          { name: "Poppins", role: "Headlines & text", family: "'Poppins', sans-serif", weight: 600 }
        ]
      },
      {
        type: "instagram",
        label: "Launch campaign", title: "All roads lead here",
        text: "A teaser campaign on RD.K’s Instagram that built up to the launch: black screens, motion-blurred cars and one line, before the first tenants lit up their signs.",
        handle: "rd.kdevelopments",
        avatarImg: RDK + "avatar.jpg",
        bio: "Autovia launch posts, on RD.K’s account",
        posts: [
          { kind: "reel", code: "DfAe3QKMNDU", img: AV + "ig/03-reel-DfAe3QKMNDU.jpg" },
          { kind: "reel", code: "De_jj5esuB6", img: AV + "ig/05-reel-De_jj5esuB6.jpg" },
          { kind: "p", code: "DfAIPkhjHwg", img: AV + "ig/04-p-DfAIPkhjHwg.jpg" },
          { kind: "reel", code: "DfU9uBMMyus", img: AV + "ig/02-reel-DfU9uBMMyus.jpg" }
        ]
      },
      {
        type: "images",
        label: "The destination", title: "Every building, a landmark",
        text: "Glass-fronted showrooms with their own frontage, each tenant’s brand on its façade and Autovia’s name tying the whole strip together.",
        images: [
          { src: AV + "gac-showroom.jpg", alt: "The GAC and Jameel Motors showroom at Autovia" },
          { src: AV + "facade.jpg", alt: "Detail of an Autovia showroom façade" }
        ]
      },
      {
        type: "images",
        label: "Grand opening", title: "A new standard finds its address",
        text: "On 27 October, Jameel Motors opened its GAC showroom at Autovia: speeches, a ribbon cutting, a signing ceremony and the first deliveries, all captured for the feed and the news page.",
        images: [
          { src: AV + "opening-ribbon.jpg", alt: "Ribbon cutting at the GAC showroom opening" },
          { src: AV + "opening-banner.jpg", alt: "“A new standard finds its address” banner at the opening" },
          { src: AV + "opening-stage.jpg", alt: "GAC stage lit in red at the opening night" }
        ]
      }
    ],
    outcome: "Autovia is open on the Ring Road, with GAC, Opel and Peugeot showrooms on the strip and Autovia 2 already announced.",
    links: [
      { label: "See Autovia’s page", url: "https://rdk-website.vercel.app/developments/autovia" },
      { label: "Read about the opening", url: "https://rdk-website.vercel.app/news/gac-jameel-motors-grand-opening-autovia" }
    ]
  },
  { id: "05", name: "Project 05", category: "print",    services: ["Company profile", "Brochure", "Billboard design"], theme: ["#f6ecde", "#93161c"], shape: "ring" },
  { id: "06", name: "Project 06", category: "production", services: ["Production", "Project management"], theme: ["#f2d9cd", "#93161c"], shape: "star" }
];
