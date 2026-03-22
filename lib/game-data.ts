export interface GamePlan {
  name: string
  ram: string
  cores: string
  storage: string
  basePrice: number
  players: string
  bestSeller?: boolean
  icon?: string
  orderUrl?: string
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

/* ─── Hardware Specs (AMD Ryzen 7 9800X3D) ─── */
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
  /* ─── Minecraft Java ─── */
  {
    slug: "minecraft",
    name: "Minecraft Java",
    tagline: "Minecraft Java Server Hosting",
    description: "Minecraft Java Edition es la version original del juego que ha cautivado a millones de jugadores en todo el mundo. Construye, explora, sobrevive y crea mundos infinitos con tus amigos en el sandbox mas popular del mundo.",
    coverImage: "/images/games/minecraft.jpg",
    steamUrl: "https://minecraft.net",
    steamPrice: "$29.99",
    basePrice: "$5.99/mo",
    platforms: ["pc", "java"],
    isUpdate: true,
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/",
    multiplayerDescription: "Minecraft Java es mejor con amigos. Crea tu propio servidor, instala mods y plugins, y construye comunidades increibles. Un servidor dedicado te da control total sobre la experiencia.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Soporte de Plugins" },
      { label: "Instalador de Modpacks" },
      { label: "Versiones Ilimitadas" },
      { label: "Panel Pterodactyl" },
      { label: "Acceso FTP/SFTP" },
    ],
    plans: [
      { 
        name: "Stone", 
        ram: "2GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "20GB NVMe", 
        basePrice: 5.99, 
        players: "10-20 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/stone",
      },
      { 
        name: "Iron", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "40GB NVMe", 
        basePrice: 8.99, 
        players: "30-50 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/iron",
      },
      { 
        name: "Diamond", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "80GB NVMe", 
        basePrice: 15.99, 
        players: "80-100 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/diamond",
      },
      { 
        name: "Netherite", 
        ram: "16GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "160GB NVMe", 
        basePrice: 27.99, 
        players: "150-200 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/netherite",
      },
      { 
        name: "Community", 
        ram: "32GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "300GB NVMe", 
        basePrice: 89.99, 
        players: "200+ Jugadores / Networks",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/community",
      },
    ],
    faqs: [
      ...makeBaseFaqs("Minecraft Java"),
      {
        question: "Puedo instalar mods y plugins en mi servidor?",
        answer: "Si! Soportamos todos los tipos de servidores incluyendo Vanilla, Spigot, Paper, Forge, Fabric, Bukkit y mas. Nuestro panel facilita la instalacion de mods y plugins con un solo clic.",
      },
      {
        question: "Que versiones de Minecraft soportan?",
        answer: "Soportamos todas las versiones de Minecraft Java Edition, desde las mas antiguas hasta la ultima version, incluyendo snapshots y versiones beta.",
      },
    ],
  },
  /* ─── Minecraft Bedrock ─── */
  {
    slug: "minecraft-bedrock",
    name: "Minecraft Bedrock",
    tagline: "Minecraft Bedrock Server Hosting",
    description: "Minecraft Bedrock Edition permite juego cruzado entre PC, consolas y dispositivos moviles. Crea servidores accesibles para todos tus amigos sin importar que plataforma usen.",
    coverImage: "/images/games/minecraft-bedrock.jpg",
    steamUrl: "https://minecraft.net",
    steamPrice: "$29.99",
    basePrice: "$5.99/mo",
    platforms: ["pc", "console", "mobile"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/",
    multiplayerDescription: "Minecraft Bedrock conecta a jugadores de todas las plataformas. Crea un servidor donde tus amigos de Xbox, PlayStation, Switch, movil y PC puedan jugar juntos.",
    features: [
      ...universalFeatures,
      { label: "Cross-Play Completo" },
      { label: "Soporte PocketMine" },
      { label: "Soporte Nukkit" },
      { label: "Panel Pterodactyl" },
    ],
    plans: [
      { 
        name: "Stone Bedrock", 
        ram: "2GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "10GB NVMe", 
        basePrice: 5.99, 
        players: "10-20 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/stone-bedrock",
      },
      { 
        name: "Iron Bedrock", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "20GB NVMe", 
        basePrice: 8.99, 
        players: "30-50 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/iron-bedrock",
      },
      { 
        name: "Diamond Bedrock", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "40GB NVMe", 
        basePrice: 15.99, 
        players: "80-100 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/diamond-bedrock",
      },
      { 
        name: "Netherite Bedrock", 
        ram: "16GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "80GB NVMe", 
        basePrice: 27.99, 
        players: "150-200 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/netherite-bedrock",
      },
    ],
    faqs: makeBaseFaqs("Minecraft Bedrock"),
  },
  /* ─── DayZ ─── */
  {
    slug: "dayz",
    name: "DayZ",
    tagline: "DayZ Server Hosting",
    description: "DayZ es un juego de supervivencia multijugador en un mundo abierto post-apocaliptico. Explora Chernarus, encuentra armas, comida y suministros mientras evitas zombis y otros jugadores en un entorno hostil donde cada encuentro puede ser tu ultimo.",
    coverImage: "/images/games/dayz.jpg",
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
        players: "40 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/dayz-hosting/fortress",
      },
      { 
        name: "Survivor", 
        ram: "12GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "40GB NVMe", 
        basePrice: 32.99, 
        players: "60 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/dayz-hosting/survivor",
      },
      { 
        name: "Elite", 
        ram: "16GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "60GB NVMe", 
        basePrice: 40.99, 
        players: "80 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/dayz-hosting/elite",
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
  /* ─── Rust ─── */
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
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/rust-hosting/survivor",
      },
      { 
        name: "Raider", 
        ram: "12GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "50GB NVMe", 
        basePrice: 31.99, 
        players: "50 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/rust-hosting/raider",
      },
      { 
        name: "Warlord", 
        ram: "16GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "70GB NVMe", 
        basePrice: 40.99, 
        players: "100 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/rust-hosting/warlord",
      },
    ],
    faqs: makeBaseFaqs("Rust"),
  },
  /* ─── CS2 ─── */
  {
    slug: "cs2",
    name: "CS2",
    tagline: "CS2 Server Hosting",
    description: "Counter-Strike 2 es la evolucion del shooter tactico mas icnonico. Con graficos renovados en Source 2 y gameplay mejorado, CS2 ofrece la experiencia competitiva definitiva para jugadores de todo el mundo.",
    coverImage: "/images/games/cs2.jpg",
    steamUrl: "https://store.steampowered.com/app/730/CounterStrike_2/",
    steamPrice: "Gratis",
    basePrice: "$10.99/mo",
    platforms: ["steam"],
    isNew: true,
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/cs2-hosting/",
    multiplayerDescription: "CS2 es 100% multijugador competitivo. Crea tu servidor personalizado para practicas, torneos o partidas casuales con tus amigos. Configura mapas, modos y reglas a tu gusto.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Plugins" },
      { label: "Mapas Personalizados" },
      { label: "Configuracion Competitiva" },
      { label: "Anti-Cheat Compatible" },
    ],
    plans: [
      { 
        name: "Dust", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "35GB NVMe", 
        basePrice: 10.99, 
        players: "32 Jugadores (5v5)",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cs2-hosting/dust",
      },
      { 
        name: "Mirage", 
        ram: "6GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "40GB NVMe", 
        basePrice: 15.99, 
        players: "64 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cs2-hosting/mirage",
      },
      { 
        name: "Inferno", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "50GB NVMe", 
        basePrice: 18.99, 
        players: "128 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/cs2-hosting/inferno",
      },
    ],
    faqs: makeBaseFaqs("CS2"),
  },
  /* ─── Garry's Mod ─── */
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
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/garrys-mod-hosting/sandbox",
      },
      { 
        name: "DarkRP", 
        ram: "6GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "30GB NVMe", 
        basePrice: 15.99, 
        players: "64 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/garrys-mod-hosting/darkrp",
      },
      { 
        name: "SWRP", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "40GB NVMe", 
        basePrice: 22.99, 
        players: "128 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/garrys-mod-hosting/swrp",
      },
    ],
    faqs: makeBaseFaqs("Garry's Mod"),
  },
  /* ─── Project Zomboid ─── */
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
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/starter",
      },
      { 
        name: "Survival", 
        ram: "6GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "50GB NVMe", 
        basePrice: 17.99, 
        players: "25 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/survival",
      },
      { 
        name: "Apocalypse", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "60GB NVMe", 
        basePrice: 23.99, 
        players: "35 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/apocalypse",
      },
      { 
        name: "Hardcore", 
        ram: "12GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "70GB NVMe", 
        basePrice: 29.99, 
        players: "50 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/project-zomboid-hosting/hardcore",
      },
    ],
    faqs: makeBaseFaqs("Project Zomboid"),
  },
  /* ─── 7 Days to Die ─── */
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
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/7-days-to-die-hosting/survivor",
      },
      { 
        name: "Builder", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "50GB NVMe", 
        basePrice: 23.99, 
        players: "11 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/7-days-to-die-hosting/builder",
      },
      { 
        name: "Horde", 
        ram: "10GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "70GB NVMe", 
        basePrice: 29.99, 
        players: "16 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/7-days-to-die-hosting/horde",
      },
    ],
    faqs: makeBaseFaqs("7 Days to Die"),
  },
  /* ─── SAMP ─── */
  {
    slug: "samp",
    name: "SAMP",
    tagline: "SA-MP Server Hosting",
    description: "San Andreas Multiplayer (SA-MP) es una modificacion gratuita de GTA San Andreas que permite multijugador masivo. Crea servidores de roleplay, freeroam, racing y mucho mas con scripts personalizados.",
    coverImage: "/images/games/samp.jpg",
    officialUrl: "https://sa-mp.mp/",
    steamPrice: "Gratis",
    basePrice: "$7.99/mo",
    platforms: ["pc"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/samp-hosting/",
    multiplayerDescription: "SA-MP te permite crear servidores completamente personalizados de GTA San Andreas. Desde roleplay hasta drift, racing y mas, las posibilidades son infinitas con scripting Pawn.",
    features: [
      ...universalFeatures,
      { label: "Scripting Pawn" },
      { label: "Plugins Ilimitados" },
      { label: "Alta Capacidad de Jugadores" },
    ],
    plans: [
      { 
        name: "Starter", 
        ram: "2GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "10GB NVMe", 
        basePrice: 7.99, 
        players: "100 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/samp-hosting/starter",
      },
      { 
        name: "RP", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "20GB NVMe", 
        basePrice: 11.99, 
        players: "500 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/samp-hosting/rp",
      },
      { 
        name: "Pro", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "30GB NVMe", 
        basePrice: 17.99, 
        players: "1000 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/samp-hosting/pro",
      },
    ],
    faqs: makeBaseFaqs("SA-MP"),
  },
  /* ─── MTA ─── */
  {
    slug: "mta",
    name: "MTA",
    tagline: "MTA Server Hosting",
    description: "Multi Theft Auto (MTA) es una modificacion de codigo abierto de GTA San Andreas que agrega funcionalidad multijugador. Con scripting Lua avanzado, las posibilidades de personalizacion son infinitas.",
    coverImage: "/images/games/mta.jpg",
    officialUrl: "https://multitheftauto.com/",
    steamPrice: "Gratis",
    basePrice: "$7.99/mo",
    platforms: ["pc"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/mta-hosting/",
    multiplayerDescription: "MTA ofrece la plataforma mas estable y flexible para servidores de GTA San Andreas. Con scripting Lua, puedes crear cualquier modo de juego que imagines.",
    features: [
      ...universalFeatures,
      { label: "Scripting Lua" },
      { label: "Recursos Ilimitados" },
      { label: "Alta Capacidad de Jugadores" },
    ],
    plans: [
      { 
        name: "Starter", 
        ram: "2GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "10GB NVMe", 
        basePrice: 7.99, 
        players: "100 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/mta-hosting/starter",
      },
      { 
        name: "RP", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "20GB NVMe", 
        basePrice: 11.99, 
        players: "500 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/mta-hosting/rp",
      },
      { 
        name: "Pro", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "30GB NVMe", 
        basePrice: 17.99, 
        players: "1000 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/mta-hosting/pro",
      },
    ],
    faqs: makeBaseFaqs("MTA"),
  },
  /* ─── Unturned ─── */
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
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/unturned-hosting/survivor",
      },
      { 
        name: "Warrior", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "25GB NVMe", 
        basePrice: 11.99, 
        players: "13 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/unturned-hosting/warrior",
      },
      { 
        name: "Elite", 
        ram: "6GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "35GB NVMe", 
        basePrice: 17.99, 
        players: "24 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/unturned-hosting/elite",
      },
    ],
    faqs: makeBaseFaqs("Unturned"),
  },
  /* ─── Arma 3 ─── */
  {
    slug: "arma-3",
    name: "Arma 3",
    tagline: "Arma 3 Server Hosting",
    description: "Arma 3 es un sandbox militar tactico que ofrece la experiencia de combate mas realista. Con un enorme mapa, vehiculos detallados y fisica avanzada, es la plataforma perfecta para simulaciones militares y modos de juego personalizados.",
    coverImage: "/images/games/arma3.jpg",
    steamUrl: "https://store.steampowered.com/app/107410/Arma_3/",
    steamPrice: "$29.99",
    basePrice: "$12.99/mo",
    platforms: ["steam"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-3-hosting/",
    multiplayerDescription: "Arma 3 es la plataforma definitiva para misiones cooperativas, PvP tactico y modos como Exile, Altis Life, y King of the Hill. Crea experiencias militares inmersivas con tu comunidad.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Workshop de Steam" },
      { label: "Misiones Personalizadas" },
      { label: "Configuracion Avanzada" },
    ],
    plans: [
      { 
        name: "Recruit", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "40GB NVMe", 
        basePrice: 12.99, 
        players: "10 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-3-hosting/recruit",
      },
      { 
        name: "Sergeant", 
        ram: "6GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "60GB NVMe", 
        basePrice: 18.99, 
        players: "32 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-3-hosting/sergeant",
      },
      { 
        name: "Commander", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "80GB NVMe", 
        basePrice: 24.99, 
        players: "48 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-3-hosting/commander",
      },
    ],
    faqs: makeBaseFaqs("Arma 3"),
  },
  /* ─── Arma Reforger ─── */
  {
    slug: "arma-reforger",
    name: "Arma Reforger",
    tagline: "Arma Reforger Server Hosting",
    description: "Arma Reforger es la plataforma de la siguiente generacion de Bohemia Interactive, construida en el motor Enfusion. Ofrece combate autentico de la Guerra Fria con cross-play entre PC, Xbox y PlayStation.",
    coverImage: "/images/games/armareforger.jpg",
    steamUrl: "https://store.steampowered.com/app/1874880/Arma_Reforger/",
    steamPrice: "$29.99",
    basePrice: "$19.99/mo",
    platforms: ["steam", "console"],
    isNew: true,
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-reforger-hosting/",
    multiplayerDescription: "Arma Reforger ofrece batallas a gran escala con cross-play. Crea servidores que unan a jugadores de PC, Xbox y PlayStation en combates tacticos intensos.",
    features: [
      ...universalFeatures,
      { label: "Cross-Play PC/Xbox/PS5" },
      { label: "Motor Enfusion" },
      { label: "Mods de Workshop" },
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
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-reforger-hosting/recon",
      },
      { 
        name: "Assault", 
        ram: "12GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "70GB NVMe", 
        basePrice: 29.99, 
        players: "50 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-reforger-hosting/assault",
      },
      { 
        name: "Warfare", 
        ram: "16GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "90GB NVMe", 
        basePrice: 44.99, 
        players: "64 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/arma-reforger-hosting/warfare",
      },
    ],
    faqs: makeBaseFaqs("Arma Reforger"),
  },
  /* ─── Assetto Corsa ─── */
  {
    slug: "assetto-corsa",
    name: "Assetto Corsa",
    tagline: "Assetto Corsa Server Hosting",
    description: "Assetto Corsa es un simulador de carreras con fisica realista y una comunidad activa de modding. Con cientos de autos y circuitos disponibles, es la plataforma perfecta para carreras online competitivas.",
    coverImage: "/images/games/assettocorsa.jpg",
    steamUrl: "https://store.steampowered.com/app/244210/Assetto_Corsa/",
    steamPrice: "$19.99",
    basePrice: "$9.99/mo",
    platforms: ["steam"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/assetto-corsa-hosting/",
    multiplayerDescription: "Assetto Corsa online te permite crear servidores de carreras personalizados. Organiza ligas, eventos y carreras casuales con la comunidad de sim racing mas apasionada.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Autos y Circuitos Custom" },
      { label: "Configuracion de Eventos" },
      { label: "Sistema de Penalizaciones" },
    ],
    plans: [
      { 
        name: "Amateur", 
        ram: "2GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "15GB NVMe", 
        basePrice: 9.99, 
        players: "16 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/assetto-corsa-hosting/amateur",
      },
      { 
        name: "Pro", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "30GB NVMe", 
        basePrice: 15.99, 
        players: "32 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/assetto-corsa-hosting/pro",
      },
      { 
        name: "Elite", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "50GB NVMe", 
        basePrice: 24.99, 
        players: "64 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/assetto-corsa-hosting/elite",
      },
    ],
    faqs: makeBaseFaqs("Assetto Corsa"),
  },
  /* ─── RAGE-MP ─── */
  {
    slug: "ragemp",
    name: "RAGE-MP",
    tagline: "RAGE-MP Server Hosting",
    description: "RAGE-MP es una plataforma de multijugador para GTA V que permite crear servidores personalizados con scripting en C# y JavaScript. Ideal para roleplay, racing y experiencias unicas de GTA V online.",
    coverImage: "/images/games/ragemp.jpg",
    officialUrl: "https://rage.mp/",
    steamPrice: "Gratis",
    basePrice: "$9.99/mo",
    platforms: ["steam"],
    storeUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/",
    multiplayerDescription: "RAGE-MP te permite crear servidores de GTA V completamente personalizados. Desde roleplay hasta racing y mas, las posibilidades son infinitas con scripting avanzado en C# y JavaScript.",
    features: [
      ...universalFeatures,
      { label: "Scripting C#/JS" },
      { label: "Alta Capacidad" },
      { label: "Base de Datos MySQL" },
      { label: "Recursos Ilimitados" },
    ],
    plans: [
      { 
        name: "Starter", 
        ram: "2GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "15GB NVMe", 
        basePrice: 9.99, 
        players: "30 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/starter",
      },
      { 
        name: "Community", 
        ram: "4GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "30GB NVMe", 
        basePrice: 16.99, 
        players: "60 Jugadores",
        bestSeller: true,
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/community",
      },
      { 
        name: "Server", 
        ram: "8GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "50GB NVMe", 
        basePrice: 28.99, 
        players: "100 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/server",
      },
      { 
        name: "Metropolis", 
        ram: "12GB", 
        cores: "AMD Ryzen 7 9800X3D", 
        storage: "70GB NVMe", 
        basePrice: 42.99, 
        players: "150 Jugadores",
        orderUrl: "https://billing.forzahost.com/index.php?rp=/store/ragemp-hosting/metropolis",
      },
    ],
    faqs: makeBaseFaqs("RAGE-MP"),
  },
  /* ─── FiveM (Coming Soon) ─── */
  {
    slug: "fivem",
    name: "FiveM",
    tagline: "FiveM Server Hosting",
    description: "FiveM es un framework de modificacion para GTA V que te permite jugar multijugador en servidores personalizados. Crea tu propio servidor de roleplay, racing, o cualquier modo que imagines con scripts y recursos personalizados.",
    coverImage: "/images/games/fivem.jpg",
    officialUrl: "https://fivem.net/",
    steamPrice: "Gratis",
    basePrice: "$12.00/mo",
    platforms: ["steam"],
    comingSoon: true,
    multiplayerDescription: "FiveM es 100% multijugador. Crea servidores de roleplay, racing, survival y mucho mas. Personaliza cada aspecto de la experiencia con scripts y recursos de la comunidad.",
    features: [
      ...universalFeatures,
      { label: "Recursos Ilimitados" },
      { label: "Scripts Personalizados" },
      { label: "Base de Datos MySQL" },
    ],
    plans: [
      { name: "Basico", ram: "8GB", cores: "AMD Ryzen 7 9800X3D", storage: "80GB SSD", basePrice: 12.00, players: "32 Jugadores" },
      { name: "Avanzado", ram: "16GB", cores: "AMD Ryzen 7 9800X3D", storage: "120GB NVMe", basePrice: 20.00, players: "64 Jugadores", bestSeller: true },
      { name: "Premium", ram: "32GB", cores: "AMD Ryzen 7 9800X3D", storage: "200GB NVMe", basePrice: 35.00, players: "128 Jugadores" },
    ],
    faqs: makeBaseFaqs("FiveM"),
  },
]

/* ─── Exports ─── */

export const gameDataMap: Record<string, GameDetail> = {}
for (const game of gameDataArray) {
  gameDataMap[game.slug] = game
}

export function getGameBySlug(slug: string): GameDetail | undefined {
  return gameDataMap[slug]
}

export function getAllGameSlugs(): string[] {
  return gameDataArray.map((g) => g.slug)
}

export function getGameSlugFromName(name: string): string {
  const found = gameDataArray.find((g) => g.name === name)
  return found?.slug ?? "proximamente"
}

export { gameDataArray }
