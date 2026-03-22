export interface GamePlan {
  name: string
  ram: string
  cores: string
  storage: string
  basePrice: number
  players: string
  recommendedPlayers?: string
  bestSeller?: boolean
  icon?: string
  orderUrl: string
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
    coverImage: "/images/games/minecraft.jpg",
    steamUrl: undefined,
    officialUrl: "https://www.minecraft.net",
    steamPrice: "$29.99",
    basePrice: "$5.99/mo",
    platforms: ["pc", "java"],
    isUpdate: true,
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/",
    multiplayerDescription: "Minecraft Java es la experiencia multijugador definitiva. Crea servidores con plugins, mods, minijuegos y mas. Forma comunidades, construye mundos epicos y juega con amigos de todo el mundo.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Plugins (Spigot/Paper)" },
      { label: "Soporte de Mods (Forge/Fabric)" },
      { label: "Instalador de Modpacks" },
      { label: "Subdominios Gratis" },
      { label: "MySQL Ilimitado" },
      { label: "FTP Completo" },
    ],
    plans: [
      { 
        name: "Stone", 
        ram: "2GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "20GB NVMe", 
        basePrice: 5.99, 
        players: "Ilimitados",
        recommendedPlayers: "10-20 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/stone"
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
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/iron"
      },
      { 
        name: "Diamond", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "80GB NVMe", 
        basePrice: 15.99, 
        players: "Ilimitados",
        recommendedPlayers: "80-100 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/diamond"
      },
      { 
        name: "Netherite", 
        ram: "16GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "160GB NVMe", 
        basePrice: 27.99, 
        players: "Ilimitados",
        recommendedPlayers: "150-200 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/netherite"
      },
      { 
        name: "Community", 
        ram: "32GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "300GB NVMe", 
        basePrice: 89.99, 
        players: "Ilimitados",
        recommendedPlayers: "200+ jugadores / redes",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/community"
      },
    ],
    faqs: [
      ...makeBaseFaqs("Minecraft Java"),
      {
        question: "Puedo instalar mods y plugins en mi servidor?",
        answer: "Si! Soportamos Spigot, Paper, Forge, Fabric y todos los frameworks populares. Nuestro panel facilita la instalacion con un solo click.",
      },
      {
        question: "Puedo migrar mi servidor existente?",
        answer: "Absolutamente. Nuestro equipo de soporte puede ayudarte a migrar tu mundo, plugins y configuraciones sin perdida de datos.",
      },
    ],
  },
  // ─── Minecraft Bedrock ───
  {
    slug: "minecraft-bedrock",
    name: "Minecraft Bedrock",
    tagline: "Minecraft Bedrock Server Hosting",
    description: "Minecraft Bedrock Edition permite jugar en multiples plataformas incluyendo PC, consolas y dispositivos moviles. Crea servidores crossplay para que todos tus amigos puedan jugar juntos sin importar su dispositivo.",
    coverImage: "/images/games/minecraft-bedrock.jpg",
    officialUrl: "https://www.minecraft.net",
    steamPrice: "$29.99",
    basePrice: "$5.99/mo",
    platforms: ["pc", "console", "mobile"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/",
    multiplayerDescription: "Minecraft Bedrock es perfecto para comunidades crossplay. Juega con amigos en Xbox, PlayStation, Switch, moviles y PC, todos en el mismo servidor.",
    features: [
      ...universalFeatures,
      { label: "Crossplay Multi-Plataforma" },
      { label: "Soporte de Addons" },
      { label: "Soporte de Behavior Packs" },
      { label: "Subdominios Gratis" },
    ],
    plans: [
      { 
        name: "Stone Bedrock", 
        ram: "2GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "10GB NVMe", 
        basePrice: 5.99, 
        players: "Ilimitados",
        recommendedPlayers: "10-20 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/stone-bedrock"
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
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/iron-bedrock"
      },
      { 
        name: "Diamond Bedrock", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "40GB NVMe", 
        basePrice: 15.99, 
        players: "Ilimitados",
        recommendedPlayers: "80-100 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/diamond-bedrock"
      },
      { 
        name: "Netherite Bedrock", 
        ram: "16GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "80GB NVMe", 
        basePrice: 27.99, 
        players: "Ilimitados",
        recommendedPlayers: "150-200 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/netherite-bedrock"
      },
    ],
    faqs: makeBaseFaqs("Minecraft Bedrock"),
  },
  // ─── DayZ ───
  {
    slug: "dayz",
    name: "DayZ",
    tagline: "DayZ Server Hosting",
    description: "DayZ es un juego de supervivencia multijugador en un mundo abierto post-apocaliptico. Explora Chernarus, encuentra armas, comida y suministros mientras evitas zombis y otros jugadores en un entorno hostil donde cada encuentro puede ser tu ultimo.",
    coverImage: "/images/games/dayz.png",
    steamUrl: "https://store.steampowered.com/app/221100/DayZ/",
    steamPrice: "$44.99",
    basePrice: "$24.99/mo",
    platforms: ["steam"],
    isUpdate: true,
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/dayz-hosting/",
    multiplayerDescription: "DayZ es una experiencia de supervivencia brutal, pero mucho mejor en grupo. Forma alianzas, construye bases y explora el vasto mundo de Chernarus con tus amigos. Un servidor propio te da control total sobre la experiencia.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Workshop de Steam" },
      { label: "Configuracion XML Avanzada" },
      { label: "Mapas Personalizados (Livonia, Namalsk)" },
      { label: "Traders y Economy Mods" },
      { label: "Expansion Mod Ready" },
    ],
    plans: [
      { 
        name: "Fortress", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "30GB NVMe", 
        basePrice: 24.99, 
        players: "Ilimitados",
        recommendedPlayers: "Hasta 40 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/dayz-hosting/fortress"
      },
      { 
        name: "Survivor", 
        ram: "12GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "40GB NVMe", 
        basePrice: 32.99, 
        players: "Ilimitados",
        recommendedPlayers: "Hasta 60 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/dayz-hosting/survivor"
      },
      { 
        name: "Elite", 
        ram: "16GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "60GB NVMe", 
        basePrice: 40.99, 
        players: "Ilimitados",
        recommendedPlayers: "Hasta 80 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/dayz-hosting/elite"
      },
    ],
    faqs: [
      ...makeBaseFaqs("DayZ"),
      {
        question: "Puedo instalar mods en mi servidor de DayZ?",
        answer: "Si! Soportamos todos los mods del Workshop de Steam incluyendo Expansion, Traders, mapas personalizados como Namalsk y Livonia, y miles de mods mas. Nuestro panel facilita la instalacion con un solo click.",
      },
      {
        question: "Que mapas puedo usar en mi servidor?",
        answer: "Soportamos todos los mapas oficiales (Chernarus, Livonia) y mapas de la comunidad como Namalsk, Deer Isle, Esseker, Takistan y muchos mas.",
      },
    ],
  },
  // ─── Rust ───
  {
    slug: "rust",
    name: "Rust",
    tagline: "Rust Server Hosting",
    description: "Rust es un juego de supervivencia hardcore donde todo, y todos, quieren eliminarte. Comienzas con nada mas que una roca y tu ingenio, y depende de ti recolectar recursos, construir equipo, edificar una base y sobrevivir. Otros jugadores pueden ser aliados o amenazas.",
    coverImage: "/images/games/rust.jpg",
    steamUrl: "https://store.steampowered.com/app/252490/Rust/",
    steamPrice: "$39.99",
    basePrice: "$21.99/mo",
    platforms: ["steam"],
    isUpdate: true,
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/rust-hosting/",
    multiplayerDescription: "Rust es brutal, pero mucho mas divertido en grupo. Forma equipo con amigos para construir una base, defenderla de raiders, hacer loot runs y sobrevivir el caos. Ejecutar tu servidor en ForzaHost lo convierte en una experiencia increible.",
    features: [
      ...universalFeatures,
      { label: "Soporte Carbon" },
      { label: "Soporte uMod" },
      { label: "Servidores Dedicados" },
    ],
    plans: [
      { 
        name: "Survivor", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "40GB NVMe", 
        basePrice: 21.99, 
        players: "25 Jugadores",
        recommendedPlayers: "Hasta 25 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/rust-hosting/survivor"
      },
      { 
        name: "Raider", 
        ram: "12GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "50GB NVMe", 
        basePrice: 31.99, 
        players: "50 Jugadores",
        recommendedPlayers: "Hasta 50 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/rust-hosting/raider"
      },
      { 
        name: "Warlord", 
        ram: "16GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "70GB NVMe", 
        basePrice: 40.99, 
        players: "100 Jugadores",
        recommendedPlayers: "Hasta 100 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/rust-hosting/warlord"
      },
    ],
    faqs: makeBaseFaqs("Rust"),
  },
  // ─── CS2 ───
  {
    slug: "cs2",
    name: "CS2",
    tagline: "CS2 Server Hosting",
    description: "Counter-Strike 2 es el shooter tactico mas popular del mundo. Compite en partidas 5v5, crea servidores personalizados con modos de juego unicos y entrena con tu equipo en tu propio servidor dedicado.",
    coverImage: "/images/games/cs2.jpg",
    steamUrl: "https://store.steampowered.com/app/730/CounterStrike_2/",
    steamPrice: "Gratis",
    basePrice: "$10.99/mo",
    platforms: ["steam"],
    isNew: true,
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/cs2-hosting/",
    multiplayerDescription: "CS2 es el shooter competitivo por excelencia. Crea tu propio servidor para practicas de equipo, torneos personalizados o modos de juego casuales con amigos.",
    features: [
      ...universalFeatures,
      { label: "Plugins Metamod" },
      { label: "Configuracion de Mapas" },
      { label: "RCON Completo" },
      { label: "Workshop de Steam" },
    ],
    plans: [
      { 
        name: "Dust", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "35GB NVMe", 
        basePrice: 10.99, 
        players: "32 Jugadores",
        recommendedPlayers: "Hasta 32 jugadores (5v5)",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cs2-hosting/dust"
      },
      { 
        name: "Mirage", 
        ram: "6GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "40GB NVMe", 
        basePrice: 15.99, 
        players: "64 Jugadores",
        recommendedPlayers: "Hasta 64 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cs2-hosting/mirage"
      },
      { 
        name: "Inferno", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "50GB NVMe", 
        basePrice: 18.99, 
        players: "128 Jugadores",
        recommendedPlayers: "Hasta 128 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cs2-hosting/inferno"
      },
    ],
    faqs: makeBaseFaqs("CS2"),
  },
  // ─── Garry's Mod ───
  {
    slug: "garrys-mod",
    name: "Garry's Mod",
    tagline: "Garry's Mod Server Hosting",
    description: "Garry's Mod es un sandbox de fisica sin objetivos predefinidos. Usa herramientas para experimentar con la fisica, crear escenas, o juega modos como Trouble in Terrorist Town, Prop Hunt, DarkRP y muchos mas con la comunidad.",
    coverImage: "/images/games/garrysmod.jpg",
    steamUrl: "https://store.steampowered.com/app/4000/Garrys_Mod/",
    steamPrice: "$9.99",
    basePrice: "$10.99/mo",
    platforms: ["steam"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/garrys-mod-hosting/",
    multiplayerDescription: "Garry's Mod es sinonimo de diversion multijugador. Desde DarkRP hasta Prop Hunt, TTT y mas, las posibilidades son infinitas. Crea tu comunidad con un servidor personalizado y divertanse sin limites.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Addons" },
      { label: "Workshop de Steam" },
      { label: "Modos de Juego Ilimitados" },
    ],
    plans: [
      { 
        name: "Sandbox", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "20GB NVMe", 
        basePrice: 10.99, 
        players: "32 Jugadores",
        recommendedPlayers: "Hasta 32 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/garrys-mod-hosting/sandbox"
      },
      { 
        name: "DarkRP", 
        ram: "6GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "30GB NVMe", 
        basePrice: 15.99, 
        players: "64 Jugadores",
        recommendedPlayers: "Hasta 64 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/garrys-mod-hosting/darkrp"
      },
      { 
        name: "SWRP", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "40GB NVMe", 
        basePrice: 22.99, 
        players: "128 Jugadores",
        recommendedPlayers: "Hasta 128 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/garrys-mod-hosting/swrp"
      },
    ],
    faqs: makeBaseFaqs("Garry's Mod"),
  },
  // ─── Project Zomboid ───
  {
    slug: "project-zomboid",
    name: "Project Zomboid",
    tagline: "Project Zomboid Server Hosting",
    description: "Project Zomboid es un RPG de supervivencia zombie isometrico. Es la simulacion de supervivencia definitiva: saquea, construye, cultiva, pesca y lucha por tu vida en un mundo donde los zombies recuerdan todo y la muerte es permanente.",
    coverImage: "/images/games/projectzomboid.jpg",
    steamUrl: "https://store.steampowered.com/app/108600/Project_Zomboid/",
    steamPrice: "$14.99",
    basePrice: "$11.99/mo",
    platforms: ["steam"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/",
    multiplayerDescription: "Project Zomboid en multijugador es una experiencia de supervivencia unica. Construyan refugios, compartan recursos y sobrevivan juntos en un mundo donde cada zombie es una amenaza. Crea tu propia comunidad de supervivientes.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Workshop de Steam" },
      { label: "Sandbox Personalizable" },
    ],
    plans: [
      { 
        name: "Starter", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "40GB NVMe", 
        basePrice: 11.99, 
        players: "15 Jugadores",
        recommendedPlayers: "Hasta 15 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/starter"
      },
      { 
        name: "Survival", 
        ram: "6GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "50GB NVMe", 
        basePrice: 17.99, 
        players: "25 Jugadores",
        recommendedPlayers: "Hasta 25 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/survival"
      },
      { 
        name: "Apocalypse", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "60GB NVMe", 
        basePrice: 23.99, 
        players: "35 Jugadores",
        recommendedPlayers: "Hasta 35 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/apocalypse"
      },
      { 
        name: "Hardcore", 
        ram: "12GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "70GB NVMe", 
        basePrice: 29.99, 
        players: "50 Jugadores",
        recommendedPlayers: "Hasta 50 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/hardcore"
      },
    ],
    faqs: makeBaseFaqs("Project Zomboid"),
  },
  // ─── 7 Days to Die ───
  {
    slug: "7-days-to-die",
    name: "7 Days to Die",
    tagline: "7 Days to Die Server Hosting",
    description: "7 Days to Die combina supervivencia, crafting, looting, mineria, exploracion, manejo de terreno y defensa de torre en un impresionante mundo voxel post-apocaliptico. Sobrevive a las hordas de zombies que atacan cada septima noche.",
    coverImage: "/images/games/7daystodie.jpg",
    steamUrl: "https://store.steampowered.com/app/251570/7_Days_to_Die/",
    steamPrice: "$44.99",
    basePrice: "$11.99/mo",
    platforms: ["steam"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/7-days-to-die-hosting/",
    multiplayerDescription: "7 Days to Die es mucho mejor en cooperativo. Construyan fortalezas juntos, preparen defensas para la horda del septimo dia y exploren el mundo en busca de suministros. Tu servidor garantiza una experiencia intensa y continua.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Anti-Cheat Integrado" },
      { label: "Configuracion XML" },
    ],
    plans: [
      { 
        name: "Survivor", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "30GB NVMe", 
        basePrice: 11.99, 
        players: "5 Jugadores",
        recommendedPlayers: "Hasta 5 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/7-days-to-die-hosting/survivor"
      },
      { 
        name: "Builder", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "50GB NVMe", 
        basePrice: 23.99, 
        players: "11 Jugadores",
        recommendedPlayers: "Hasta 11 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/7-days-to-die-hosting/builder"
      },
      { 
        name: "Horde", 
        ram: "10GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "70GB NVMe", 
        basePrice: 29.99, 
        players: "16 Jugadores",
        recommendedPlayers: "Hasta 16 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/7-days-to-die-hosting/horde"
      },
    ],
    faqs: makeBaseFaqs("7 Days to Die"),
  },
  // ─── SAMP ───
  {
    slug: "samp",
    name: "SA-MP",
    tagline: "SA-MP Server Hosting",
    description: "San Andreas Multiplayer (SA-MP) es una modificacion para GTA San Andreas que permite jugar en linea con cientos de jugadores. Crea servidores de roleplay, deathmatch, racing y mas.",
    coverImage: "/images/games/samp.jpg",
    officialUrl: "https://www.sa-mp.com/",
    steamPrice: undefined,
    basePrice: "$7.99/mo",
    platforms: ["pc"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/samp-hosting/",
    multiplayerDescription: "SA-MP es la comunidad de roleplay mas grande de GTA. Crea servidores con cientos de jugadores, economia personalizada, facciones y mas. Tu servidor dedicado garantiza una experiencia sin lag.",
    features: [
      ...universalFeatures,
      { label: "Plugins Personalizados" },
      { label: "Gamemodes Ilimitados" },
      { label: "Panel de Administracion" },
    ],
    plans: [
      { 
        name: "Starter", 
        ram: "2GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "10GB NVMe", 
        basePrice: 7.99, 
        players: "100 Jugadores",
        recommendedPlayers: "Hasta 100 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/samp-hosting/starter"
      },
      { 
        name: "RP", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "20GB NVMe", 
        basePrice: 11.99, 
        players: "500 Jugadores",
        recommendedPlayers: "Hasta 500 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/samp-hosting/rp"
      },
      { 
        name: "Pro", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "30GB NVMe", 
        basePrice: 17.99, 
        players: "1000 Jugadores",
        recommendedPlayers: "Hasta 1000 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/samp-hosting/pro"
      },
    ],
    faqs: makeBaseFaqs("SA-MP"),
  },
  // ─── MTA ───
  {
    slug: "mta",
    name: "MTA",
    tagline: "MTA Server Hosting",
    description: "Multi Theft Auto (MTA) es una modificacion para GTA San Andreas que permite crear servidores multijugador con scripting completo en Lua. Crea gamemodes unicos, servidores de roleplay y mas.",
    coverImage: "/images/games/mta.jpg",
    officialUrl: "https://mtasa.com/",
    steamPrice: undefined,
    basePrice: "$7.99/mo",
    platforms: ["pc"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/mta-hosting/",
    multiplayerDescription: "MTA ofrece la mayor flexibilidad para servidores de GTA. Con scripting Lua completo, puedes crear cualquier tipo de servidor imaginable. Tu servidor dedicado asegura rendimiento optimo.",
    features: [
      ...universalFeatures,
      { label: "Scripting Lua Completo" },
      { label: "Resources Ilimitados" },
      { label: "Panel de Administracion" },
    ],
    plans: [
      { 
        name: "Starter", 
        ram: "2GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "10GB NVMe", 
        basePrice: 7.99, 
        players: "100 Jugadores",
        recommendedPlayers: "Hasta 100 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/mta-hosting/starter"
      },
      { 
        name: "RP", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "20GB NVMe", 
        basePrice: 11.99, 
        players: "500 Jugadores",
        recommendedPlayers: "Hasta 500 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/mta-hosting/rp"
      },
      { 
        name: "Pro", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "30GB NVMe", 
        basePrice: 17.99, 
        players: "1000 Jugadores",
        recommendedPlayers: "Hasta 1000 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/mta-hosting/pro"
      },
    ],
    faqs: makeBaseFaqs("MTA"),
  },
  // ─── Unturned ───
  {
    slug: "unturned",
    name: "Unturned",
    tagline: "Unturned Server Hosting",
    description: "Unturned es un juego de supervivencia zombie gratuito donde tus alianzas son tu salvacion. Unete con amigos para luchar contra hordas de no-muertos, construye comunidades y navega un mundo post-apocaliptico donde cada decision puede significar la vida o la muerte.",
    coverImage: "/images/games/unturned.jpg",
    steamUrl: "https://store.steampowered.com/app/304930/Unturned/",
    steamPrice: "Gratis",
    basePrice: "$5.99/mo",
    platforms: ["steam"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/unturned-hosting/",
    multiplayerDescription: "Ya sea que empieces un servidor con unos pocos amigos o busques construir la comunidad mas grande de Unturned, tenemos las soluciones mas rapidas a los precios mas bajos.",
    features: [
      ...universalFeatures,
      { label: "Soporte OpenMod" },
      { label: "Soporte RocketMod" },
      { label: "Soporte uScript" },
    ],
    plans: [
      { 
        name: "Survivor", 
        ram: "2GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "15GB NVMe", 
        basePrice: 5.99, 
        players: "8 Jugadores",
        recommendedPlayers: "Hasta 8 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/unturned-hosting/survivor"
      },
      { 
        name: "Warrior", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "25GB NVMe", 
        basePrice: 11.99, 
        players: "13 Jugadores",
        recommendedPlayers: "Hasta 13 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/unturned-hosting/warrior"
      },
      { 
        name: "Elite", 
        ram: "6GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "35GB NVMe", 
        basePrice: 17.99, 
        players: "24 Jugadores",
        recommendedPlayers: "Hasta 24 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/unturned-hosting/elite"
      },
    ],
    faqs: makeBaseFaqs("Unturned"),
  },
  // ─── Arma 3 ───
  {
    slug: "arma-3",
    name: "Arma 3",
    tagline: "Arma 3 Server Hosting",
    description: "Arma 3 es el simulador militar mas completo disponible. Con un mapa masivo, vehiculos realistas y combate tactico, es perfecto para comunidades milsim y misiones cooperativas.",
    coverImage: "/images/games/arma3.jpg",
    steamUrl: "https://store.steampowered.com/app/107410/Arma_3/",
    steamPrice: "$29.99",
    basePrice: "$12.99/mo",
    platforms: ["steam"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-3-hosting/",
    multiplayerDescription: "Arma 3 es el estandar para simulacion militar. Crea operaciones militares realistas, entrena con tu unidad y ejecuta misiones complejas en tu servidor dedicado.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Workshop de Steam" },
      { label: "Headless Clients" },
      { label: "Misiones Personalizadas" },
    ],
    plans: [
      { 
        name: "Recruit", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "40GB NVMe", 
        basePrice: 12.99, 
        players: "10 Jugadores",
        recommendedPlayers: "Hasta 10 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-3-hosting/recruit"
      },
      { 
        name: "Sergeant", 
        ram: "6GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "60GB NVMe", 
        basePrice: 18.99, 
        players: "32 Jugadores",
        recommendedPlayers: "Hasta 32 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-3-hosting/sergeant"
      },
      { 
        name: "Commander", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "80GB NVMe", 
        basePrice: 24.99, 
        players: "48 Jugadores",
        recommendedPlayers: "Hasta 48 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-3-hosting/commander"
      },
    ],
    faqs: makeBaseFaqs("Arma 3"),
  },
  // ─── Arma Reforger ───
  {
    slug: "arma-reforger",
    name: "Arma Reforger",
    tagline: "Arma Reforger Server Hosting",
    description: "Arma Reforger es la nueva generacion de simulacion militar de Bohemia Interactive. Con un motor completamente nuevo y soporte crossplay entre PC, Xbox y PlayStation, lleva la simulacion militar a un nuevo nivel.",
    coverImage: "/images/games/armareforger.jpg",
    steamUrl: "https://store.steampowered.com/app/1874880/Arma_Reforger/",
    steamPrice: "$29.99",
    basePrice: "$19.99/mo",
    platforms: ["steam", "console"],
    isNew: true,
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-reforger-hosting/",
    multiplayerDescription: "Arma Reforger trae la simulacion militar a la nueva generacion con crossplay entre PC, Xbox y PlayStation. Tu servidor dedicado permite operaciones masivas con hasta 64 jugadores.",
    features: [
      ...universalFeatures,
      { label: "Crossplay PC/Xbox/PS5" },
      { label: "Soporte de Mods" },
      { label: "Workshop de Steam" },
      { label: "Escenarios Personalizados" },
    ],
    plans: [
      { 
        name: "Recon", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "50GB NVMe", 
        basePrice: 19.99, 
        players: "30 Jugadores",
        recommendedPlayers: "Hasta 30 jugadores (PC/Xbox/PS5)",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-reforger-hosting/recon"
      },
      { 
        name: "Assault", 
        ram: "12GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "70GB NVMe", 
        basePrice: 29.99, 
        players: "50 Jugadores",
        recommendedPlayers: "Hasta 50 jugadores (PC/Xbox/PS5)",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-reforger-hosting/assault"
      },
      { 
        name: "Warfare", 
        ram: "16GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "90GB NVMe", 
        basePrice: 44.99, 
        players: "64 Jugadores",
        recommendedPlayers: "Hasta 64 jugadores (PC/Xbox/PS5)",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-reforger-hosting/warfare"
      },
    ],
    faqs: makeBaseFaqs("Arma Reforger"),
  },
  // ─── Assetto Corsa ───
  {
    slug: "assetto-corsa",
    name: "Assetto Corsa",
    tagline: "Assetto Corsa Server Hosting",
    description: "Assetto Corsa es el simulador de carreras mas realista disponible. Con fisica precisa, graficos impresionantes y soporte de mods extensivo, es perfecto para carreras competitivas y eventos de comunidad.",
    coverImage: "/images/games/assettocorsa.jpg",
    steamUrl: "https://store.steampowered.com/app/244210/Assetto_Corsa/",
    steamPrice: "$19.99",
    basePrice: "$9.99/mo",
    platforms: ["steam"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/assetto-corsa-hosting/",
    multiplayerDescription: "Assetto Corsa es el estandar para simulacion de carreras. Organiza ligas, torneos y sesiones de practica con tu comunidad en tu servidor dedicado.",
    features: [
      ...universalFeatures,
      { label: "Soporte Content Manager" },
      { label: "Mods de Coches y Pistas" },
      { label: "Configuracion Avanzada" },
    ],
    plans: [
      { 
        name: "Amateur", 
        ram: "2GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "15GB NVMe", 
        basePrice: 9.99, 
        players: "16 Jugadores",
        recommendedPlayers: "Hasta 16 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/assetto-corsa-hosting/amateur"
      },
      { 
        name: "Pro", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "30GB NVMe", 
        basePrice: 15.99, 
        players: "32 Jugadores",
        recommendedPlayers: "Hasta 32 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/assetto-corsa-hosting/pro"
      },
      { 
        name: "Elite", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "50GB NVMe", 
        basePrice: 24.99, 
        players: "64 Jugadores",
        recommendedPlayers: "Hasta 64 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/assetto-corsa-hosting/elite"
      },
    ],
    faqs: makeBaseFaqs("Assetto Corsa"),
  },
  // ─── RAGE-MP ───
  {
    slug: "ragemp",
    name: "RAGE-MP",
    tagline: "RAGE-MP Server Hosting",
    description: "RAGE Multiplayer (RAGE-MP) es la plataforma de multijugador mas avanzada para GTA V. Crea servidores de roleplay con graficos de ultima generacion, vehiculos personalizados y sistemas complejos.",
    coverImage: "/images/games/ragemp.jpg",
    officialUrl: "https://rage.mp/",
    steamPrice: undefined,
    basePrice: "$9.99/mo",
    platforms: ["pc"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/",
    multiplayerDescription: "RAGE-MP es la plataforma premium para servidores de GTA V. Con soporte para C# y JavaScript, puedes crear experiencias de roleplay increiblemente detalladas.",
    features: [
      ...universalFeatures,
      { label: "Scripting C#/JavaScript" },
      { label: "Recursos Ilimitados" },
      { label: "Voice Chat Integrado" },
      { label: "Anti-Cheat Avanzado" },
    ],
    plans: [
      { 
        name: "Starter", 
        ram: "2GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "15GB NVMe", 
        basePrice: 9.99, 
        players: "30 Jugadores",
        recommendedPlayers: "Hasta 30 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/starter"
      },
      { 
        name: "Community", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "30GB NVMe", 
        basePrice: 16.99, 
        players: "60 Jugadores",
        recommendedPlayers: "Hasta 60 jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/community"
      },
      { 
        name: "Server", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "50GB NVMe", 
        basePrice: 28.99, 
        players: "100 Jugadores",
        recommendedPlayers: "Hasta 100 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/server"
      },
      { 
        name: "Metropolis", 
        ram: "12GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "70GB NVMe", 
        basePrice: 42.99, 
        players: "150 Jugadores",
        recommendedPlayers: "Hasta 150 jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/metropolis"
      },
    ],
    faqs: makeBaseFaqs("RAGE-MP"),
  },
  // ─── Valheim ───
  {
    slug: "valheim",
    name: "Valheim",
    tagline: "Valheim Server Hosting",
    description: "Valheim es un juego de supervivencia y exploracion inspirado en la cultura vikinga. Explora un enorme mundo generado proceduralmente, construye bases majestuosas, navega los mares y lucha contra jefes miticos en esta aventura de hasta 10 jugadores.",
    coverImage: "/images/games/valheim.jpg",
    steamUrl: "https://store.steampowered.com/app/892970/Valheim/",
    steamPrice: "$19.99",
    basePrice: "$4.80/mo",
    platforms: ["steam"],
    multiplayerDescription: "Valheim brilla como experiencia cooperativa. Reune a tus guerreros vikingos, construyan un pueblo, exploren biomas peligrosos y enfrenten jefes epicos juntos. Tu servidor dedicado garantiza una experiencia sin lag.",
    features: [
      ...universalFeatures,
      { label: "Soporte Valheim Plus" },
      { label: "BepInEx Modding" },
      { label: "Backups del Mundo" },
    ],
    plans: [
      { name: "Greyling", ram: "4GB", cores: "AMD Ryzen 7 9800X3D", storage: "30GB SSD", basePrice: 4.80, players: "4 Jugadores", icon: "/images/plans/valheim-leather.png", orderUrl: "#" },
      { name: "Viking", ram: "6GB", cores: "AMD Ryzen 7 9800X3D", storage: "50GB SSD", basePrice: 7.20, players: "6 Jugadores", bestSeller: true, icon: "/images/plans/valheim-cyan.png", orderUrl: "#" },
      { name: "Odin", ram: "8GB", cores: "AMD Ryzen 7 9800X3D", storage: "80GB NVMe", basePrice: 10.00, players: "10 Jugadores", icon: "/images/plans/valheim-blue.png", orderUrl: "#" },
    ],
    faqs: makeBaseFaqs("Valheim"),
  },
  // ─── Palworld ───
  {
    slug: "palworld",
    name: "Palworld",
    tagline: "Palworld Server Hosting",
    description: "Palworld es un juego de supervivencia en mundo abierto donde capturas y crias criaturas misteriosas llamadas Pals. Usalos para combatir, construir, cultivar y trabajar en fabricas. Explora un vasto mundo con amigos en esta aventura unica.",
    coverImage: "/images/games/palworld.jpg",
    steamUrl: "https://store.steampowered.com/app/1623730/Palworld/",
    steamPrice: "$29.99",
    basePrice: "$6.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "Palworld es increiblemente divertido en multijugador. Captura Pals, construye bases, comercia con amigos y explora juntos un mundo lleno de criaturas. Tu servidor dedicado asegura una experiencia fluida para todos.",
    features: [
      ...universalFeatures,
      { label: "Configuracion Avanzada" },
      { label: "Actualizaciones Automaticas" },
      { label: "Administracion Remota" },
    ],
    plans: [
      { name: "Novato", ram: "8GB", cores: "AMD Ryzen 7 9800X3D", storage: "50GB SSD", basePrice: 6.00, players: "8 Jugadores", orderUrl: "#" },
      { name: "Explorador", ram: "16GB", cores: "AMD Ryzen 7 9800X3D", storage: "80GB NVMe", basePrice: 12.00, players: "16 Jugadores", bestSeller: true, orderUrl: "#" },
      { name: "Maestro", ram: "32GB", cores: "AMD Ryzen 7 9800X3D", storage: "120GB NVMe", basePrice: 20.00, players: "32 Jugadores", orderUrl: "#" },
    ],
    faqs: makeBaseFaqs("Palworld"),
  },
  // ─── Ark: Survival Evolved ───
  {
    slug: "ark-survival-evolved",
    name: "Ark: Survival Evolved",
    tagline: "Ark Server Hosting",
    description: "ARK: Survival Evolved te sumerge en un mundo prehistorico lleno de dinosaurios. Doma criaturas, construye bases, forma tribus y sobrevive en un entorno hostil. Con cientos de dinosaurios y criaturas, cada sesion es una aventura unica.",
    coverImage: "/images/games/ark.jpg",
    steamUrl: "https://store.steampowered.com/app/346110/ARK_Survival_Evolved/",
    steamPrice: "$29.99",
    basePrice: "$8.00/mo",
    platforms: ["steam", "pc"],
    multiplayerDescription: "ARK es una experiencia multijugador masiva. Forma tribus, doma dinosaurios, construye imperios y defiende tu territorio contra otras tribus. Un servidor dedicado te da control total sobre tasas de experiencia, doma y mas.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Cluster de Servidores" },
      { label: "Configuracion de Tasas" },
    ],
    plans: [
      { name: "Tatch", ram: "8GB", cores: "AMD Ryzen 7 9800X3D", storage: "80GB SSD", basePrice: 8.00, players: "20 Jugadores", orderUrl: "#" },
      { name: "Metal", ram: "16GB", cores: "AMD Ryzen 7 9800X3D", storage: "120GB NVMe", basePrice: 14.00, players: "40 Jugadores", bestSeller: true, orderUrl: "#" },
      { name: "Tek", ram: "24GB", cores: "AMD Ryzen 7 9800X3D", storage: "200GB NVMe", basePrice: 22.00, players: "70 Jugadores", orderUrl: "#" },
    ],
    faqs: makeBaseFaqs("ARK: Survival Evolved"),
  },
  // ─── Terraria ───
  {
    slug: "terraria",
    name: "Terraria",
    tagline: "Terraria Server Hosting",
    description: "Terraria es un juego de accion y aventura sandbox en 2D. Excava, lucha, explora y construye en un mundo generado proceduralmente con cientos de jefes, armas y objetos. Con su estilo retro y enorme contenido, las posibilidades son infinitas.",
    coverImage: "/images/games/terraria.jpg",
    steamUrl: "https://store.steampowered.com/app/105600/Terraria/",
    steamPrice: "$9.99",
    basePrice: "$2.50/mo",
    platforms: ["steam"],
    isUpdate: true,
    multiplayerDescription: "Terraria es una experiencia increible con amigos. Exploren juntos, derroten jefes, construyan ciudades y compartan aventuras en un mundo lleno de contenido. Tu servidor garantiza una conexion estable para todos.",
    features: [
      ...universalFeatures,
      { label: "Soporte tModLoader" },
      { label: "Workshop de Steam" },
      { label: "Mundos Multiples" },
    ],
    plans: [
      { name: "Cobre", ram: "2GB", cores: "AMD Ryzen 7 9800X3D", storage: "30GB SSD", basePrice: 2.50, players: "8 Jugadores", orderUrl: "#" },
      { name: "Plata", ram: "3GB", cores: "AMD Ryzen 7 9800X3D", storage: "50GB SSD", basePrice: 3.50, players: "16 Jugadores", bestSeller: true, orderUrl: "#" },
      { name: "Oro", ram: "4GB", cores: "AMD Ryzen 7 9800X3D", storage: "50GB SSD", basePrice: 5.00, players: "32 Jugadores", orderUrl: "#" },
    ],
    faqs: makeBaseFaqs("Terraria"),
  },
  // ─── Satisfactory ───
  {
    slug: "satisfactory",
    name: "Satisfactory",
    tagline: "Satisfactory Server Hosting",
    description: "Satisfactory es un juego de construccion de fabricas en primera persona con un toque de exploracion y combate. Construye fabricas masivas, automatiza la produccion, explora un planeta alienigena y optimiza tus lineas de produccion.",
    coverImage: "/images/games/satisfactory.jpg",
    steamUrl: "https://store.steampowered.com/app/526870/Satisfactory/",
    steamPrice: "$35.99",
    basePrice: "$8.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "Satisfactory es aun mejor en cooperativo. Planifiquen fabricas juntos, dividan tareas y construyan la mega-fabrica mas eficiente del planeta. Un servidor dedicado asegura que su progreso se mantenga 24/7.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Saves Persistentes" },
      { label: "Actualizaciones Automaticas" },
    ],
    plans: [
      { name: "Basico", ram: "6GB", cores: "AMD Ryzen 7 9800X3D", storage: "50GB SSD", basePrice: 8.00, players: "4 Jugadores", orderUrl: "#" },
      { name: "Automatizado", ram: "10GB", cores: "AMD Ryzen 7 9800X3D", storage: "80GB NVMe", basePrice: 12.00, players: "6 Jugadores", bestSeller: true, orderUrl: "#" },
      { name: "Megafabrica", ram: "16GB", cores: "AMD Ryzen 7 9800X3D", storage: "120GB NVMe", basePrice: 18.00, players: "8 Jugadores", orderUrl: "#" },
    ],
    faqs: makeBaseFaqs("Satisfactory"),
  },
  // ─── The Forest ───
  {
    slug: "the-forest",
    name: "The Forest",
    tagline: "The Forest Server Hosting",
    description: "The Forest es un juego de supervivencia en un bosque misterioso tras sobrevivir un accidente aereo. Construye refugios, crea armas, explora cuevas oscuras y lucha contra canibales mutantes mientras buscas a tu hijo desaparecido.",
    coverImage: "/images/games/theforest.jpg",
    steamUrl: "https://store.steampowered.com/app/242760/The_Forest/",
    steamPrice: "$19.99",
    basePrice: "$8.80/mo",
    platforms: ["steam"],
    multiplayerDescription: "The Forest en cooperativo es una experiencia de terror y supervivencia unica. Construyan juntos, exploren las profundidades y enfrenten los horrores del bosque como equipo.",
    features: [
      ...universalFeatures,
      { label: "Saves Persistentes" },
      { label: "Configuracion Avanzada" },
    ],
    plans: [
      { name: "Shelter", ram: "4GB", cores: "AMD Ryzen 7 9800X3D", storage: "30GB SSD", basePrice: 8.80, players: "4 Jugadores", orderUrl: "#" },
      { name: "Camp", ram: "6GB", cores: "AMD Ryzen 7 9800X3D", storage: "50GB SSD", basePrice: 12.00, players: "6 Jugadores", bestSeller: true, orderUrl: "#" },
      { name: "Village", ram: "8GB", cores: "AMD Ryzen 7 9800X3D", storage: "80GB NVMe", basePrice: 16.00, players: "8 Jugadores", orderUrl: "#" },
    ],
    faqs: makeBaseFaqs("The Forest"),
  },
  // ─── Sons of the Forest ───
  {
    slug: "sons-of-the-forest",
    name: "Sons of the Forest",
    tagline: "Sons of the Forest Server Hosting",
    description: "Sons of the Forest es la secuela del aclamado The Forest. Enviado para encontrar a un multimillonario desaparecido en una isla remota, te encontraras en un infierno infestado de canibales. Construye, sobrevive y descubre los secretos de la isla.",
    coverImage: "/images/games/sonsoftheforest.jpg",
    steamUrl: "https://store.steampowered.com/app/1326470/Sons_Of_The_Forest/",
    steamPrice: "$29.99",
    basePrice: "$8.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "Sons of the Forest lleva la supervivencia cooperativa al siguiente nivel. Construyan bases elaboradas, cacen mutantes y descubran los misterios de la isla juntos.",
    features: [
      ...universalFeatures,
      { label: "Saves Persistentes" },
      { label: "Actualizaciones Automaticas" },
    ],
    plans: [
      { name: "Survivor", ram: "8GB", cores: "AMD Ryzen 7 9800X3D", storage: "50GB SSD", basePrice: 8.00, players: "4 Jugadores", orderUrl: "#" },
      { name: "Explorer", ram: "12GB", cores: "AMD Ryzen 7 9800X3D", storage: "80GB NVMe", basePrice: 14.00, players: "6 Jugadores", bestSeller: true, orderUrl: "#" },
      { name: "Conqueror", ram: "16GB", cores: "AMD Ryzen 7 9800X3D", storage: "100GB NVMe", basePrice: 20.00, players: "8 Jugadores", orderUrl: "#" },
    ],
    faqs: makeBaseFaqs("Sons of the Forest"),
  },
]

/* ─── Helpers ─── */

export const gameData: Record<string, GameDetail> = Object.fromEntries(
  gameDataArray.map((g) => [g.slug, g])
)

export const allGamesArray = gameDataArray

export function getGameBySlug(slug: string): GameDetail | undefined {
  return gameData[slug]
}

export function getAllGameSlugs(): string[] {
  return gameDataArray.map((g) => g.slug)
}
