export interface BillingCycle {
  period: 'monthly' | 'quarterly' | 'semi-annual' | 'annual'
  price: number
  label: string
}

export interface GamePlan {
  name: string
  ram: string
  cores: string
  storage: string
  basePrice: number
  billingCycles?: BillingCycle[]
  players: string
  recommendedPlayers?: string
  bestSeller?: boolean
  icon?: string
  orderUrl: string
  features?: string[]
}

export interface GameFaq {
  question: string
  answer: string
}

export interface GameFeature {
  label: string
}

export interface GameDetail {
  slug: string
  name: string
  tagline: string
  description: string
  coverImage: string
  bannerImage?: string
  steamUrl?: string
  officialUrl?: string
  steamPrice?: string
  features: GameFeature[]
  plans: GamePlan[]
  faqs: GameFaq[]
  platforms: string[]
  isNew?: boolean
  isUpdate?: boolean
  comingSoon?: boolean
  basePrice: string
  multiplayerDescription: string
  storeUrl?: string
}

/* ─── Hardware Specs (shown on all plans) ─── */
export const hardwareSpecs = {
  cpu: "AMD Ryzen 7 9800X3D",
  cpuDetails: "8 cores / 16 threads",
  storage: "Dual NVMe SSD",
  location: "Canada (BHS8, OVH)",
  ddosProtection: "OVH Game Shield 50+ Tbps",
}

/* ─── Universal features shared by all games ─── */
const universalFeatures: GameFeature[] = [
  { label: "99.99%+ Uptime" },
  { label: "Soporte 24/7" },
  { label: "Garantia de 2 Dias" },
  { label: "Hardware Dedicado" },
  { label: "Bases de Datos Ilimitadas" },
  { label: "Backups Automaticos" },
]

/* ─── Universal FAQs appended to every game ─── */
function makeBaseFaqs(gameName: string): GameFaq[] {
  return [
    {
      question: `Por que ForzaHost es el mejor hosting de ${gameName}?`,
      answer: `Ofrecemos el hosting de servidores de ${gameName} mas confiable a los mejores precios. Respaldados por soporte 24/7, proteccion DDoS, hardware de ultima generacion y una garantia de reembolso de 48 horas.`,
    },
    {
      question: `Nunca he creado un servidor de ${gameName}, es dificil?`,
      answer: `Para nada. Con ForzaHost es muy facil empezar. Despues de comprar un servidor, obtienes acceso a un panel de control intuitivo con guias detalladas paso a paso para configurar tu servidor de ${gameName}.`,
    },
    {
      question: `Como compro un servidor de ${gameName}?`,
      answer: `Simplemente selecciona el plan que mejor se adapte a tus necesidades, elige una ubicacion y completa el pago. Tu servidor estara listo en minutos con configuracion instantanea.`,
    },
    {
      question: `Puedo actualizar mi servidor de ${gameName} mas adelante?`,
      answer: `Si, puedes actualizar o degradar tu plan en cualquier momento desde tu panel de control. Los cambios se aplican de forma instantanea sin perdida de datos.`,
    },
    {
      question: `Cual es su politica de reembolso para ${gameName}?`,
      answer: `Ofrecemos una garantia de reembolso de 48 horas. Si no estas satisfecho con nuestro servicio, puedes solicitar un reembolso completo dentro de las primeras 48 horas.`,
    },
  ]
}

/* ─── All Games Data ─── */

const gameDataArray: GameDetail[] = [
  // ─── Minecraft Java ───
  {
    slug: "minecraft",
    name: "Minecraft Java",
    tagline: "Minecraft Java Server Hosting",
    description: "Minecraft es el juego de supervivencia y construccion mas popular del mundo. Crea mundos infinitos, construye estructuras increibles y explora con amigos en servidores personalizados con mods, plugins y configuraciones ilimitadas.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/minecraft%20%282%29-2Iy2Z13i3PrymdVW1UBIlwI8olvQce.avif",
    steamUrl: undefined,
    officialUrl: "https://www.minecraft.net",
    features: universalFeatures,
    plans: [
      {
        name: "Stone",
        ram: "2GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "20GB NVMe",
        basePrice: 5.99,
        players: "Ilimitados",
        recommendedPlayers: "10-20 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/stone",
      },
      {
        name: "Iron",
        ram: "4GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "40GB NVMe",
        basePrice: 8.99,
        players: "Ilimitados",
        recommendedPlayers: "30-50 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/iron",
      },
      {
        name: "Diamond",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "80GB NVMe",
        basePrice: 15.99,
        players: "Ilimitados",
        recommendedPlayers: "80-100 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/diamond",
      },
      {
        name: "Netherite",
        ram: "16GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "160GB NVMe",
        basePrice: 27.99,
        players: "Ilimitados",
        recommendedPlayers: "150-200 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/netherite",
      },
      {
        name: "Community",
        ram: "32GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "300GB NVMe",
        basePrice: 89.99,
        players: "Ilimitados",
        recommendedPlayers: "200+ jugadores / networks",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/community",
      },
    ],
    faqs: makeBaseFaqs("Minecraft Java"),
    platforms: ["pc", "java"],
    basePrice: "$5.99/mo",
    multiplayerDescription: "Crea servidores survival, minijuegos, factions, skyblock y mas con soporte completo para plugins y mods.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/",
  },

  // ─── Minecraft Bedrock ───
  {
    slug: "minecraft-bedrock",
    name: "Minecraft Bedrock",
    tagline: "Minecraft Bedrock Server Hosting",
    description: "Minecraft Bedrock Edition permite juego cruzado entre PC, consolas y moviles. Crea servidores accesibles para todos tus amigos sin importar la plataforma.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mcbedrock-F2HBKLQRj9EDXIf3IbRlQdPBH1jFVB.avif",
    steamUrl: undefined,
    officialUrl: "https://www.minecraft.net",
    features: universalFeatures,
    plans: [
      {
        name: "Stone Bedrock",
        ram: "2GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "10GB NVMe",
        basePrice: 5.99,
        players: "Ilimitados",
        recommendedPlayers: "10-20 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/stone-bedrock",
      },
      {
        name: "Iron Bedrock",
        ram: "4GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "20GB NVMe",
        basePrice: 8.99,
        players: "Ilimitados",
        recommendedPlayers: "30-50 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/iron-bedrock",
      },
      {
        name: "Diamond Bedrock",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "40GB NVMe",
        basePrice: 15.99,
        players: "Ilimitados",
        recommendedPlayers: "80-100 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/diamond-bedrock",
      },
      {
        name: "Netherite Bedrock",
        ram: "16GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "80GB NVMe",
        basePrice: 27.99,
        players: "Ilimitados",
        recommendedPlayers: "150-200 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/netherite-bedrock",
      },
    ],
    faqs: makeBaseFaqs("Minecraft Bedrock"),
    platforms: ["pc", "console", "mobile"],
    basePrice: "$5.99/mo",
    multiplayerDescription: "Juego cruzado entre PC, Xbox, PlayStation, Nintendo Switch y dispositivos moviles.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/",
  },

  // ─── DayZ ───
  {
    slug: "dayz",
    name: "DayZ",
    tagline: "DayZ Server Hosting",
    description: "DayZ es un juego de supervivencia post-apocaliptico donde debes encontrar comida, agua, armas y sobrevivir contra zombies y otros jugadores en un mundo abierto masivo.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dayz-NRtLGk10BHLn4H0FAp8QVb97FtD7W0.avif",
    steamUrl: "https://store.steampowered.com/app/221100/DayZ/",
    features: universalFeatures,
    plans: [
      {
        name: "Fortress",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "30GB NVMe",
        basePrice: 24.99,
        players: "40 jugadores",
        recommendedPlayers: "Hasta 40 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/dayz-hosting/fortress",
      },
      {
        name: "Survivor",
        ram: "12GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "40GB NVMe",
        basePrice: 32.99,
        players: "60 jugadores",
        recommendedPlayers: "Hasta 60 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/dayz-hosting/survivor",
      },
      {
        name: "Elite",
        ram: "16GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "60GB NVMe",
        basePrice: 40.99,
        players: "80 jugadores",
        recommendedPlayers: "Hasta 80 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/dayz-hosting/elite",
      },
    ],
    faqs: makeBaseFaqs("DayZ"),
    platforms: ["steam"],
    isUpdate: true,
    basePrice: "$24.99/mo",
    multiplayerDescription: "Sobrevive en servidores con hasta 80 jugadores, mods personalizados y mapas expandidos.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/dayz-hosting/",
  },

  // ─── Rust ───
  {
    slug: "rust",
    name: "Rust",
    tagline: "Rust Server Hosting",
    description: "Rust es un brutal juego de supervivencia multijugador. Recolecta recursos, construye bases, forma alianzas o traiciona a otros jugadores en un mundo hostil.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rust-8yFMzRQihRukVNsDNzg7odsdETm3b7.avif",
    steamUrl: "https://store.steampowered.com/app/252490/Rust/",
    features: universalFeatures,
    plans: [
      {
        name: "Survivor",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "40GB NVMe",
        basePrice: 21.99,
        players: "25 jugadores",
        recommendedPlayers: "Hasta 25 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/rust-hosting/survivor",
      },
      {
        name: "Raider",
        ram: "12GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "50GB NVMe",
        basePrice: 31.99,
        players: "50 jugadores",
        recommendedPlayers: "Hasta 50 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/rust-hosting/raider",
      },
      {
        name: "Warlord",
        ram: "16GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "70GB NVMe",
        basePrice: 40.99,
        players: "100 jugadores",
        recommendedPlayers: "Hasta 100 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/rust-hosting/warlord",
      },
    ],
    faqs: makeBaseFaqs("Rust"),
    platforms: ["steam"],
    isUpdate: true,
    basePrice: "$21.99/mo",
    multiplayerDescription: "Construye, defiende y conquista en servidores con hasta 100 jugadores y plugins personalizados.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/rust-hosting/",
  },

  // ─── CS2 ───
  {
    slug: "cs2",
    name: "Counter Strike 2",
    tagline: "Counter-Strike 2 Server Hosting",
    description: "Counter-Strike 2 es el shooter tactico mas competitivo del mundo. Crea servidores personalizados para practicar, competir o jugar con amigos.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cs2-QEwsNTGWQEx1blPPo972908cP1NAGW.jpg",
    steamUrl: "https://store.steampowered.com/app/730/CounterStrike_2/",
    features: universalFeatures,
    plans: [
      {
        name: "Dust",
        ram: "4GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "35GB NVMe",
        basePrice: 10.99,
        players: "32 jugadores",
        recommendedPlayers: "Hasta 32 jugadores (5v5)",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cs2-hosting/dust",
      },
      {
        name: "Mirage",
        ram: "6GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "40GB NVMe",
        basePrice: 15.99,
        players: "64 jugadores",
        recommendedPlayers: "Hasta 64 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cs2-hosting/mirage",
      },
      {
        name: "Inferno",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "50GB NVMe",
        basePrice: 18.99,
        players: "128 jugadores",
        recommendedPlayers: "Hasta 128 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cs2-hosting/inferno",
      },
    ],
    faqs: makeBaseFaqs("CS2"),
    platforms: ["steam"],
    isNew: true,
    basePrice: "$10.99/mo",
    multiplayerDescription: "Crea servidores competitivos, de practica o casuales con configuracion completa de mods y plugins.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/cs2-hosting/",
  },

  // ─── Garry's Mod ───
  {
    slug: "garrys-mod",
    name: "Garry's Mod",
    tagline: "Garry's Mod Server Hosting",
    description: "Garry's Mod es el sandbox definitivo donde puedes crear cualquier cosa. Desde DarkRP hasta servidores de prop hunt, las posibilidades son infinitas.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/garrysmod-KW92I5yYCBHogtKl97UooHiEl9cRCm.avif",
    steamUrl: "https://store.steampowered.com/app/4000/Garrys_Mod/",
    features: universalFeatures,
    plans: [
      {
        name: "Sandbox",
        ram: "4GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "20GB NVMe",
        basePrice: 10.99,
        players: "32 jugadores",
        recommendedPlayers: "Hasta 32 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/garrys-mod-hosting/sandbox",
      },
      {
        name: "DarkRP",
        ram: "6GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "30GB NVMe",
        basePrice: 15.99,
        players: "64 jugadores",
        recommendedPlayers: "Hasta 64 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/garrys-mod-hosting/darkrp",
      },
      {
        name: "SWRP",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "40GB NVMe",
        basePrice: 22.99,
        players: "128 jugadores",
        recommendedPlayers: "Hasta 128 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/garrys-mod-hosting/swrp",
      },
    ],
    faqs: makeBaseFaqs("Garry's Mod"),
    platforms: ["steam"],
    basePrice: "$10.99/mo",
    multiplayerDescription: "DarkRP, TTT, Prop Hunt, SWRP y cualquier gamemode que puedas imaginar con Workshop de Steam.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/garrys-mod-hosting/",
  },

  // ─── Project Zomboid ───
  {
    slug: "project-zomboid",
    name: "Project Zomboid",
    tagline: "Project Zomboid Server Hosting",
    description: "Project Zomboid es el simulador de apocalipsis zombie definitivo. Sobrevive, construye bases, cultiva y lucha contra hordas de zombies en un mundo persistente.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zomboid-G8xFvNNKMRRK6VsNoCpvPgKxB4I2kD.avif",
    steamUrl: "https://store.steampowered.com/app/108600/Project_Zomboid/",
    features: universalFeatures,
    plans: [
      {
        name: "Starter",
        ram: "4GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "40GB NVMe",
        basePrice: 11.99,
        players: "15 jugadores",
        recommendedPlayers: "Hasta 15 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/starter",
      },
      {
        name: "Survival",
        ram: "6GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "50GB NVMe",
        basePrice: 17.99,
        players: "25 jugadores",
        recommendedPlayers: "Hasta 25 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/survival",
      },
      {
        name: "Apocalypse",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "60GB NVMe",
        basePrice: 23.99,
        players: "35 jugadores",
        recommendedPlayers: "Hasta 35 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/apocalypse",
      },
      {
        name: "Hardcore",
        ram: "12GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "70GB NVMe",
        basePrice: 29.99,
        players: "50 jugadores",
        recommendedPlayers: "Hasta 50 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/hardcore",
      },
    ],
    faqs: makeBaseFaqs("Project Zomboid"),
    platforms: ["steam"],
    basePrice: "$11.99/mo",
    multiplayerDescription: "Sobrevive con hasta 50 jugadores en servidores con mods, vehiculos y bases compartidas.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/",
  },

  // ─── 7 Days to Die ───
  {
    slug: "7-days-to-die",
    name: "7 Days to Die",
    tagline: "7 Days to Die Server Hosting",
    description: "7 Days to Die combina supervivencia, crafting, RPG y tower defense en un mundo post-apocaliptico infestado de zombies.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7daystodie-Rt8ETtz9EpWewH3TcXPHmmd4P2nxgL.avif",
    steamUrl: "https://store.steampowered.com/app/251570/7_Days_to_Die/",
    features: universalFeatures,
    plans: [
      {
        name: "Survivor",
        ram: "4GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "30GB NVMe",
        basePrice: 11.99,
        players: "5 jugadores",
        recommendedPlayers: "Hasta 5 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/7-days-to-die-hosting/survivor",
      },
      {
        name: "Builder",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "50GB NVMe",
        basePrice: 23.99,
        players: "11 jugadores",
        recommendedPlayers: "Hasta 11 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/7-days-to-die-hosting/builder",
      },
      {
        name: "Horde",
        ram: "10GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "70GB NVMe",
        basePrice: 29.99,
        players: "16 jugadores",
        recommendedPlayers: "Hasta 16 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/7-days-to-die-hosting/horde",
      },
    ],
    faqs: makeBaseFaqs("7 Days to Die"),
    platforms: ["steam"],
    basePrice: "$11.99/mo",
    multiplayerDescription: "Construye bases, prepara defensas y sobrevive las hordas con hasta 16 amigos.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/7-days-to-die-hosting/",
  },

  // ─── SA-MP ───
  {
    slug: "samp",
    name: "SA-MP",
    tagline: "San Andreas Multiplayer Server Hosting",
    description: "SA-MP (San Andreas Multiplayer) transforma GTA San Andreas en una experiencia multijugador masiva con servidores de roleplay, carreras, deathmatch y mas.",
    coverImage: "/images/games/samp-cover.jpg",
    steamUrl: undefined,
    officialUrl: "https://www.sa-mp.mp/",
    features: universalFeatures,
    plans: [
      {
        name: "Starter",
        ram: "2GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "10GB NVMe",
        basePrice: 7.99,
        players: "100 jugadores",
        recommendedPlayers: "Hasta 100 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/samp-hosting/starter",
      },
      {
        name: "RP",
        ram: "4GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "20GB NVMe",
        basePrice: 11.99,
        players: "500 jugadores",
        recommendedPlayers: "Hasta 500 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/samp-hosting/rp",
      },
      {
        name: "Pro",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "30GB NVMe",
        basePrice: 17.99,
        players: "1000 jugadores",
        recommendedPlayers: "Hasta 1000 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/samp-hosting/pro",
      },
    ],
    faqs: makeBaseFaqs("SA-MP"),
    platforms: ["pc"],
    basePrice: "$7.99/mo",
    multiplayerDescription: "Roleplay, freeroam, carreras, cops and robbers con hasta 1000 jugadores simultaneos.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/samp-hosting/",
  },

  // ─── MTA ───
  {
    slug: "mta",
    name: "MTA",
    tagline: "Multi Theft Auto Server Hosting",
    description: "MTA (Multi Theft Auto) es una modificacion de codigo abierto para GTA San Andreas que permite multijugador masivo con scripts Lua personalizados.",
    coverImage: "/images/games/mta-cover.jpg",
    steamUrl: undefined,
    officialUrl: "https://multitheftauto.com/",
    features: universalFeatures,
    plans: [
      {
        name: "Starter",
        ram: "2GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "10GB NVMe",
        basePrice: 7.99,
        players: "100 jugadores",
        recommendedPlayers: "Hasta 100 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/mta-hosting/starter",
      },
      {
        name: "RP",
        ram: "4GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "20GB NVMe",
        basePrice: 11.99,
        players: "500 jugadores",
        recommendedPlayers: "Hasta 500 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/mta-hosting/rp",
      },
      {
        name: "Pro",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "30GB NVMe",
        basePrice: 17.99,
        players: "1000 jugadores",
        recommendedPlayers: "Hasta 1000 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/mta-hosting/pro",
      },
    ],
    faqs: makeBaseFaqs("MTA"),
    platforms: ["pc"],
    basePrice: "$7.99/mo",
    multiplayerDescription: "Servidores roleplay, freeroam y gamemodes personalizados con scripting Lua avanzado.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/mta-hosting/",
  },

  // ─── Unturned ───
  {
    slug: "unturned",
    name: "Unturned",
    tagline: "Unturned Server Hosting",
    description: "Unturned es un juego de supervivencia tipo roguelike con multijugador. Recorrer el mundo, lucha zombies, busca recursos y construye refugios.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unturned-sWlSuIfgS0vIriUY2XUkDnbv9TPadj.avif",
    steamUrl: "https://store.steampowered.com/app/304930/Unturned/",
    features: universalFeatures,
    plans: [
      {
        name: "Survivor",
        ram: "2GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "15GB NVMe",
        basePrice: 5.99,
        players: "8 jugadores",
        recommendedPlayers: "Hasta 8 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/unturned-hosting/survivor",
      },
      {
        name: "Warrior",
        ram: "4GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "25GB NVMe",
        basePrice: 11.99,
        players: "13 jugadores",
        recommendedPlayers: "Hasta 13 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/unturned-hosting/warrior",
      },
      {
        name: "Elite",
        ram: "6GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "35GB NVMe",
        basePrice: 17.99,
        players: "24 jugadores",
        recommendedPlayers: "Hasta 24 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/unturned-hosting/elite",
      },
    ],
    faqs: makeBaseFaqs("Unturned"),
    platforms: ["steam"],
    basePrice: "$5.99/mo",
    multiplayerDescription: "Sobrevive a los zombies, construye bases y explora mapas con hasta 24 jugadores.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/unturned-hosting/",
  },

  // ─── Arma 3 ───
  {
    slug: "arma-3",
    name: "Arma 3",
    tagline: "Arma 3 Server Hosting",
    description: "Arma 3 es el simulador militar mas completo disponible. Crea misiones personalizadas, batallas epicas y escenarios tacticos con el editor de misiones mas avanzado.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arma3-zEQQXZkpfV8DzST9lbu61Oe0ohlahZ.webp",
    steamUrl: "https://store.steampowered.com/app/107410/Arma_3/",
    features: universalFeatures,
    plans: [
      {
        name: "Recruit",
        ram: "4GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "40GB NVMe",
        basePrice: 12.99,
        players: "10 jugadores",
        recommendedPlayers: "Hasta 10 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-3-hosting/recruit",
      },
      {
        name: "Sergeant",
        ram: "6GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "60GB NVMe",
        basePrice: 18.99,
        players: "32 jugadores",
        recommendedPlayers: "Hasta 32 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-3-hosting/sergeant",
      },
      {
        name: "Commander",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "80GB NVMe",
        basePrice: 24.99,
        players: "48 jugadores",
        recommendedPlayers: "Hasta 48 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-3-hosting/commander",
      },
    ],
    faqs: makeBaseFaqs("Arma 3"),
    platforms: ["steam"],
    basePrice: "$12.99/mo",
    multiplayerDescription: "Operaciones militares, King of the Hill, Exile, Altis Life y mas con soporte completo de mods.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-3-hosting/",
  },

  // ─── Arma Reforger ───
  {
    slug: "arma-reforger",
    name: "Arma Reforger",
    tagline: "Arma Reforger Server Hosting",
    description: "Arma Reforger es un juego militar táctico que combines acción realista con construcción de misiones personalizada.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arma-reforger-wihQSrkYqK81jsNWxxu6LVv8dcoNJc.avif",
    steamUrl: "https://store.steampowered.com/app/1874880/Arma_Reforger/",
    features: universalFeatures,
    plans: [
      {
        name: "Recon",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "50GB NVMe",
        basePrice: 19.99,
        players: "30 jugadores",
        recommendedPlayers: "Hasta 30 jugadores (PC/Xbox/PS5)",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-reforger-hosting/recon",
      },
      {
        name: "Assault",
        ram: "12GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "70GB NVMe",
        basePrice: 29.99,
        players: "50 jugadores",
        recommendedPlayers: "Hasta 50 jugadores (PC/Xbox/PS5)",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-reforger-hosting/assault",
      },
      {
        name: "Warfare",
        ram: "16GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "90GB NVMe",
        basePrice: 44.99,
        players: "64 jugadores",
        recommendedPlayers: "Hasta 64 jugadores (PC/Xbox/PS5)",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-reforger-hosting/warfare",
      },
    ],
    faqs: makeBaseFaqs("Arma Reforger"),
    platforms: ["steam", "console"],
    isNew: true,
    basePrice: "$19.99/mo",
    multiplayerDescription: "Combate militar tactico con juego cruzado entre PC, Xbox Series X|S y PlayStation 5.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-reforger-hosting/",
  },

  // ─── Assetto Corsa ───
  {
    slug: "assetto-corsa",
    name: "Assetto Corsa",
    tagline: "Assetto Corsa Server Hosting",
    description: "Assetto Corsa es el simulador de carreras mas realista. Compite con amigos en pistas reales con fisica de conduccion autentica y soporte masivo de mods.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assetocorsa-cjTTcmKptX5p2CjSjXvNxNFZh3f7U3.jpg",
    steamUrl: "https://store.steampowered.com/app/244210/Assetto_Corsa/",
    features: universalFeatures,
    plans: [
      {
        name: "Amateur",
        ram: "2GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "15GB NVMe",
        basePrice: 9.99,
        players: "16 jugadores",
        recommendedPlayers: "Hasta 16 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/assetto-corsa-hosting/amateur",
      },
      {
        name: "Pro",
        ram: "4GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "30GB NVMe",
        basePrice: 15.99,
        players: "32 jugadores",
        recommendedPlayers: "Hasta 32 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/assetto-corsa-hosting/pro",
      },
      {
        name: "Elite",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "50GB NVMe",
        basePrice: 24.99,
        players: "64 jugadores",
        recommendedPlayers: "Hasta 64 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/assetto-corsa-hosting/elite",
      },
    ],
    faqs: makeBaseFaqs("Assetto Corsa"),
    platforms: ["steam"],
    basePrice: "$9.99/mo",
    multiplayerDescription: "Carreras competitivas con hasta 64 jugadores, pistas personalizadas y autos moddados.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/assetto-corsa-hosting/",
  },

  // ─── RAGE-MP ───
  {
    slug: "ragemp",
    name: "RAGE-MP",
    tagline: "RAGE-MP Server Hosting",
    description: "RAGE-MP es la plataforma de modificacion multijugador para GTA V. Crea servidores de roleplay, carreras y experiencias unicas en Los Santos.",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ragemp-YpnaScCpxoq3czsOMz6LOKU25FCBxn.jpg",
    steamUrl: undefined,
    officialUrl: "https://rage.mp/",
    features: universalFeatures,
    plans: [
      {
        name: "Starter",
        ram: "2GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "15GB NVMe",
        basePrice: 9.99,
        players: "30 jugadores",
        recommendedPlayers: "Hasta 30 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/starter",
      },
      {
        name: "Community",
        ram: "4GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "30GB NVMe",
        basePrice: 16.99,
        players: "60 jugadores",
        recommendedPlayers: "Hasta 60 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/community",
      },
      {
        name: "Server",
        ram: "8GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "50GB NVMe",
        basePrice: 28.99,
        players: "100 jugadores",
        recommendedPlayers: "Hasta 100 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/server",
      },
      {
        name: "Metropolis",
        ram: "12GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "70GB NVMe",
        basePrice: 42.99,
        players: "150 jugadores",
        recommendedPlayers: "Hasta 150 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/metropolis",
      },
    ],
    faqs: makeBaseFaqs("RAGE-MP"),
    platforms: ["pc"],
    basePrice: "$9.99/mo",
    multiplayerDescription: "GTA V roleplay, freeroam, carreras y experiencias personalizadas con hasta 150 jugadores.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/",
  },

  // ─── Counter-Strike 1.6 ───
  {
    slug: "cs16",
    name: "Counter-Strike 1.6",
    tagline: "Counter-Strike 1.6 Server Hosting",
    description: "El legendario shooter tactico que definio una generacion. Counter-Strike 1.6 sigue siendo uno de los juegos mas jugados del mundo con una comunidad activa de millones de jugadores. Disfruta de servidores rapidos con proteccion DDoS y soporte completo para mods.",
    coverImage: "/images/games/cs16-cover.jpg",
    steamUrl: "https://store.steampowered.com/app/10/CounterStrike/",
    features: universalFeatures,
    plans: [
      {
        name: "Classic",
        ram: "512MB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "10GB NVMe",
        basePrice: 3.99,
        billingCycles: [
          { period: 'monthly', price: 3.99, label: 'Mensual' },
          { period: 'quarterly', price: 10.77, label: 'Trimestral' },
          { period: 'semi-annual', price: 20.34, label: 'Semestral' },
          { period: 'annual', price: 38.30, label: 'Anual' },
        ],
        players: "32 Slots",
        recommendedPlayers: "Hasta 32 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cs16-hosting/classic",
        features: [
          "Arranque instantaneo",
          "512MB RAM • 10GB NVMe",
          "Panel de control completo",
          "Subdomain Manager — IP personalizada con Cloudflare",
          "Proteccion DDoS 50+ Tbps",
          "Soporte 24/7",
        ],
      },
      {
        name: "Pro",
        ram: "1GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "10GB NVMe",
        basePrice: 5.99,
        billingCycles: [
          { period: 'monthly', price: 5.99, label: 'Mensual' },
          { period: 'quarterly', price: 16.17, label: 'Trimestral' },
          { period: 'semi-annual', price: 30.54, label: 'Semestral' },
          { period: 'annual', price: 57.50, label: 'Anual' },
        ],
        players: "32 Slots",
        recommendedPlayers: "Hasta 32 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/store/cs16-hosting/pro",
        features: [
          "Arranque instantaneo",
          "1GB RAM • 10GB NVMe",
          "Panel de control completo",
          "Subdomain Manager — IP personalizada con Cloudflare",
          "Proteccion DDoS 50+ Tbps",
          "Soporte 24/7",
        ],
      },
      {
        name: "Elite",
        ram: "2GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "15GB NVMe",
        basePrice: 8.99,
        billingCycles: [
          { period: 'monthly', price: 8.99, label: 'Mensual' },
          { period: 'quarterly', price: 24.27, label: 'Trimestral' },
          { period: 'semi-annual', price: 45.84, label: 'Semestral' },
          { period: 'annual', price: 86.30, label: 'Anual' },
        ],
        players: "32 Slots",
        recommendedPlayers: "Hasta 32 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cs16-hosting/elite",
        features: [
          "Arranque instantaneo",
          "2GB RAM • 15GB NVMe",
          "Panel de control completo",
          "Subdomain Manager — IP personalizada con Cloudflare",
          "Proteccion DDoS 50+ Tbps",
          "Soporte 24/7",
        ],
      },
    ],
    faqs: [
      {
        question: "Puedo instalar mods como AMX Mod X?",
        answer: "Si, todos nuestros servidores de CS 1.6 vienen con soporte completo para AMX Mod X, Metamod y otros plugins populares. Puedes instalarlos facilmente desde el panel de control.",
      },
      {
        question: "Que modos de juego puedo crear?",
        answer: "Puedes configurar cualquier modo de juego incluyendo Deathmatch, Gun Game, Zombie Mod, Surf, KZ, JailBreak, War3FT y muchos mas.",
      },
      ...makeBaseFaqs("Counter-Strike 1.6"),
    ],
    platforms: ["steam", "pc"],
    isNew: true,
    basePrice: "$3.99/mo",
    multiplayerDescription: "Servidores clasicos de CS 1.6 con soporte para AMX Mod X, modos personalizados y hasta 32 jugadores.",
    storeUrl: "https://billing.forzahost.com/store/cs16-hosting/",
  },

  // ─── Counter-Strike: Source ───
  {
    slug: "cssource",
    name: "Counter-Strike: Source",
    tagline: "Counter-Strike: Source Server Hosting",
    description: "La evolucion del clasico con el motor Source de Valve. Counter-Strike: Source combina la jugabilidad iconica con graficos mejorados y fisica realista.",
    coverImage: "/images/games/cssource-cover.jpg",
    steamUrl: "https://store.steampowered.com/app/240/CounterStrike_Source/",
    features: universalFeatures,
    plans: [
      {
        name: "Starter",
        ram: "2GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "15GB NVMe",
        basePrice: 6.99,
        players: "12 Slots",
        recommendedPlayers: "Hasta 12 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cssource-hosting/starter",
      },
      {
        name: "Pro",
        ram: "4GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "25GB NVMe",
        basePrice: 11.99,
        players: "24 Slots",
        recommendedPlayers: "Hasta 24 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cssource-hosting/pro",
      },
      {
        name: "Elite",
        ram: "6GB",
        cores: "AMD Ryzen 7 9800X3D",
        storage: "35GB NVMe",
        basePrice: 17.99,
        players: "32 Slots",
        recommendedPlayers: "Hasta 32 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cssource-hosting/elite",
      },
    ],
    faqs: [
      {
        question: "Que plugins puedo usar en CS:Source?",
        answer: "Soportamos SourceMod, MetaMod:Source y todos los plugins populares. Puedes configurar modos como Zombie Escape, Surf, Minigames, Deathmatch y mas.",
      },
      {
        question: "Es compatible con mapas personalizados?",
        answer: "Si, puedes subir y usar mapas personalizados del Workshop de Steam o de otras fuentes. El servidor los descargara automaticamente a los jugadores.",
      },
      ...makeBaseFaqs("Counter-Strike: Source"),
    ],
    platforms: ["steam"],
    isNew: true,
    basePrice: "$6.99/mo",
    multiplayerDescription: "Servidores de CS:Source con SourceMod, modos personalizados, Workshop de Steam y hasta 32 jugadores.",
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/cssource-hosting/",
  },
]

/* ─── Helper functions ─── */
export function getAllGames(): GameDetail[] {
  return gameDataArray
}

export function getAllGameSlugs(): string[] {
  return gameDataArray.map((game) => game.slug)
}

export function getGameBySlug(slug: string): GameDetail | undefined {
  return gameDataArray.find((game) => game.slug === slug)
}

export function getPopularGames(): GameDetail[] {
  return gameDataArray.filter((game) => game.isNew || game.isUpdate).slice(0, 4)
}
