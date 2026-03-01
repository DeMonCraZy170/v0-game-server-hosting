export interface GamePlan {
  name: string
  ram: string
  cores: string
  storage: string
  basePrice: number
  players: string
  bestSeller?: boolean
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
  {
    slug: "minecraft",
    name: "Minecraft Java",
    tagline: "Minecraft Java Server Hosting",
    description: "Minecraft Java Edition es el juego sandbox de construccion y supervivencia mas popular del mundo. Explora mundos infinitos, construye estructuras increibles, lucha contra criaturas y juega con amigos en servidores personalizados con mods y plugins.",
    coverImage: "/images/games/minecraft.jpg",
    officialUrl: "https://www.minecraft.net/",
    basePrice: "$1.05/mo",
    platforms: ["pc", "java"],
    multiplayerDescription: "Minecraft es increible con amigos. Construye ciudades, crea granjas automatizadas, explora dungeons y lucha contra el Ender Dragon juntos. Un servidor propio te permite instalar mods, plugins y personalizar cada aspecto del juego.",
    features: [
      ...universalFeatures,
      { label: "Instalador de Modpacks con 1 Click" },
      { label: "Instalador de Plugins con 1 Click" },
      { label: "Soporte de Paper, Spigot, Forge, Fabric" },
    ],
    plans: [
      { name: "Piedra", ram: "2GB", cores: "1 Core/s", storage: "10GB SSD", basePrice: 1.05, players: "10 Jugadores" },
      { name: "Hierro", ram: "4GB", cores: "2 Cores/s", storage: "25GB SSD", basePrice: 3.25, players: "20 Jugadores", bestSeller: true },
      { name: "Diamante", ram: "8GB", cores: "3 Cores/s", storage: "50GB NVMe", basePrice: 6.50, players: "40 Jugadores" },
    ],
    faqs: makeBaseFaqs("Minecraft Java"),
  },
  {
    slug: "minecraft-bedrock",
    name: "Minecraft Bedrock",
    tagline: "Minecraft Bedrock Server Hosting",
    description: "Minecraft Bedrock Edition permite juego cruzado entre PC, consolas y dispositivos moviles. Crea mundos increibles con amigos sin importar que plataforma usen. Perfecto para comunidades multiplataforma.",
    coverImage: "/images/games/minecraft-bedrock.jpg",
    officialUrl: "https://www.minecraft.net/",
    basePrice: "$1.05/mo",
    platforms: ["pc", "console", "mobile"],
    multiplayerDescription: "Bedrock Edition conecta jugadores de Xbox, PlayStation, Switch, PC y moviles en un solo servidor. Ideal para amigos y familias que juegan en diferentes dispositivos.",
    features: [
      ...universalFeatures,
      { label: "Juego Cruzado Multiplataforma" },
      { label: "Soporte de Addons" },
      { label: "Configuracion Sencilla" },
    ],
    plans: [
      { name: "Piedra", ram: "2GB", cores: "1 Core/s", storage: "10GB SSD", basePrice: 1.05, players: "10 Jugadores" },
      { name: "Hierro", ram: "4GB", cores: "2 Cores/s", storage: "25GB SSD", basePrice: 3.25, players: "20 Jugadores", bestSeller: true },
      { name: "Diamante", ram: "8GB", cores: "3 Cores/s", storage: "50GB NVMe", basePrice: 6.50, players: "40 Jugadores" },
    ],
    faqs: makeBaseFaqs("Minecraft Bedrock"),
  },
  {
    slug: "dayz",
    name: "DayZ",
    tagline: "DayZ Server Hosting",
    description: "DayZ es un juego de supervivencia multijugador en un mundo abierto post-apocaliptico. Explora Chernarus, encuentra armas, comida y suministros mientras evitas zombis y otros jugadores en un entorno hostil donde cada encuentro puede ser tu ultimo.",
    coverImage: "/images/games/dayz.jpg",
    steamUrl: "https://store.steampowered.com/app/221100/DayZ/",
    steamPrice: "$44.99",
    basePrice: "$4.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "DayZ es una experiencia de supervivencia brutal, pero mucho mejor en grupo. Forma alianzas, construye bases y explora el vasto mundo de Chernarus con tus amigos. Un servidor propio te da control total sobre la experiencia.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Workshop de Steam" },
      { label: "Configuracion XML Avanzada" },
    ],
    plans: [
      { name: "Superviviente", ram: "4GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 4.00, players: "20 Jugadores" },
      { name: "Explorador", ram: "8GB", cores: "3 Cores/s", storage: "80GB SSD", basePrice: 8.00, players: "40 Jugadores", bestSeller: true },
      { name: "Apocalipsis", ram: "16GB", cores: "4 Cores/s", storage: "120GB NVMe", basePrice: 14.00, players: "60 Jugadores" },
    ],
    faqs: makeBaseFaqs("DayZ"),
  },
  {
    slug: "rust",
    name: "Rust",
    tagline: "Rust Server Hosting",
    description: "Rust es un juego de supervivencia hardcore donde todo, y todos, quieren eliminarte. Comienzas con nada mas que una roca y tu ingenio, y depende de ti recolectar recursos, construir equipo, edificar una base y sobrevivir. Otros jugadores pueden ser aliados o amenazas.",
    coverImage: "/images/games/rust.jpg",
    steamUrl: "https://store.steampowered.com/app/252490/Rust/",
    steamPrice: "$39.99",
    basePrice: "$8.00/mo",
    platforms: ["steam"],
    isUpdate: true,
    multiplayerDescription: "Rust es brutal, pero mucho mas divertido en grupo. Forma equipo con amigos para construir una base, defenderla de raiders, hacer loot runs y sobrevivir el caos. Ejecutar tu servidor en ForzaHost lo convierte en una experiencia increible.",
    features: [
      ...universalFeatures,
      { label: "Soporte Carbon" },
      { label: "Soporte uMod" },
      { label: "Servidores Dedicados" },
    ],
    plans: [
      { name: "Tela", ram: "10GB", cores: "2.5 Cores/s", storage: "100GB NVMe", basePrice: 15.00, players: "40 Jugadores" },
      { name: "Cuero", ram: "16GB", cores: "3 Cores/s", storage: "100GB NVMe", basePrice: 24.00, players: "80 Jugadores", bestSeller: true },
      { name: "Metal", ram: "24GB", cores: "3.5 Cores/s", storage: "100GB NVMe", basePrice: 36.00, players: "120 Jugadores" },
    ],
    faqs: makeBaseFaqs("Rust"),
  },
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
      { name: "Greyling", ram: "4GB", cores: "2 Cores/s", storage: "30GB SSD", basePrice: 4.80, players: "4 Jugadores" },
      { name: "Viking", ram: "6GB", cores: "2.5 Cores/s", storage: "50GB SSD", basePrice: 7.20, players: "6 Jugadores", bestSeller: true },
      { name: "Odin", ram: "8GB", cores: "3 Cores/s", storage: "80GB NVMe", basePrice: 10.00, players: "10 Jugadores" },
    ],
    faqs: makeBaseFaqs("Valheim"),
  },
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
      { name: "Novato", ram: "8GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 6.00, players: "8 Jugadores" },
      { name: "Explorador", ram: "16GB", cores: "3 Cores/s", storage: "80GB NVMe", basePrice: 12.00, players: "16 Jugadores", bestSeller: true },
      { name: "Maestro", ram: "32GB", cores: "4 Cores/s", storage: "120GB NVMe", basePrice: 20.00, players: "32 Jugadores" },
    ],
    faqs: makeBaseFaqs("Palworld"),
  },
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
      { name: "Tatch", ram: "8GB", cores: "2 Cores/s", storage: "80GB SSD", basePrice: 8.00, players: "20 Jugadores" },
      { name: "Metal", ram: "16GB", cores: "3 Cores/s", storage: "120GB NVMe", basePrice: 14.00, players: "40 Jugadores", bestSeller: true },
      { name: "Tek", ram: "24GB", cores: "4 Cores/s", storage: "200GB NVMe", basePrice: 22.00, players: "70 Jugadores" },
    ],
    faqs: makeBaseFaqs("ARK: Survival Evolved"),
  },
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
      { name: "Cobre", ram: "2GB", cores: "1 Core/s", storage: "30GB SSD", basePrice: 2.50, players: "8 Jugadores" },
      { name: "Plata", ram: "3GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 3.50, players: "16 Jugadores", bestSeller: true },
      { name: "Oro", ram: "4GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 5.00, players: "32 Jugadores" },
    ],
    faqs: makeBaseFaqs("Terraria"),
  },
  {
    slug: "unturned",
    name: "Unturned",
    tagline: "Unturned Server Hosting",
    description: "Unturned es un juego de supervivencia zombie gratuito donde tus alianzas son tu salvacion. Unete con amigos para luchar contra hordas de no-muertos, construye comunidades y navega un mundo post-apocaliptico donde cada decision puede significar la vida o la muerte.",
    coverImage: "/images/games/unturned.jpg",
    steamUrl: "https://store.steampowered.com/app/304930/Unturned/",
    steamPrice: "Gratis",
    basePrice: "$2.50/mo",
    platforms: ["steam"],
    multiplayerDescription: "Ya sea que empieces un servidor con unos pocos amigos o busques construir la comunidad mas grande de Unturned, tenemos las soluciones mas rapidas a los precios mas bajos.",
    features: [
      ...universalFeatures,
      { label: "Soporte OpenMod" },
      { label: "Soporte RocketMod" },
      { label: "Soporte uScript" },
    ],
    plans: [
      { name: "Palo", ram: "2GB", cores: "1 Core/s", storage: "50GB SSD", basePrice: 2.50, players: "10 Jugadores" },
      { name: "Tronco", ram: "3GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 3.25, players: "16 Jugadores", bestSeller: true },
      { name: "Tabla", ram: "4GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 4.00, players: "20 Jugadores" },
    ],
    faqs: makeBaseFaqs("Unturned"),
  },
  {
    slug: "garrys-mod",
    name: "Garry's Mod",
    tagline: "Garry's Mod Server Hosting",
    description: "Garry's Mod es un sandbox de fisica sin objetivos predefinidos. Usa herramientas para experimentar con la fisica, crear escenas, o juega modos como Trouble in Terrorist Town, Prop Hunt, DarkRP y muchos mas con la comunidad.",
    coverImage: "/images/games/garrysmod.jpg",
    steamUrl: "https://store.steampowered.com/app/4000/Garrys_Mod/",
    steamPrice: "$9.99",
    basePrice: "$2.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "Garry's Mod es sinomino de diversion multijugador. Desde DarkRP hasta Prop Hunt, TTT y mas, las posibilidades son infinitas. Crea tu comunidad con un servidor personalizado y divertanse sin limites.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Addons" },
      { label: "Workshop de Steam" },
      { label: "Modos de Juego Ilimitados" },
    ],
    plans: [
      { name: "Sandbox", ram: "2GB", cores: "1 Core/s", storage: "50GB SSD", basePrice: 2.00, players: "12 Jugadores" },
      { name: "DarkRP", ram: "4GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 4.00, players: "24 Jugadores", bestSeller: true },
      { name: "TTT Pro", ram: "6GB", cores: "3 Cores/s", storage: "80GB SSD", basePrice: 6.00, players: "40 Jugadores" },
    ],
    faqs: makeBaseFaqs("Garry's Mod"),
  },
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
      { name: "Basico", ram: "6GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 8.00, players: "4 Jugadores" },
      { name: "Automatizado", ram: "10GB", cores: "3 Cores/s", storage: "80GB NVMe", basePrice: 12.00, players: "6 Jugadores", bestSeller: true },
      { name: "Megafabrica", ram: "16GB", cores: "4 Cores/s", storage: "120GB NVMe", basePrice: 18.00, players: "8 Jugadores" },
    ],
    faqs: makeBaseFaqs("Satisfactory"),
  },
  {
    slug: "7-days-to-die",
    name: "7 Days to Die",
    tagline: "7 Days to Die Server Hosting",
    description: "7 Days to Die combina supervivencia, crafting, looting, mineria, exploracion, manejo de terreno y defensa de torre en un impresionante mundo voxel post-apocaliptico. Sobrevive a las hordas de zombies que atacan cada septima noche.",
    coverImage: "/images/games/7daystodie.jpg",
    steamUrl: "https://store.steampowered.com/app/251570/7_Days_to_Die/",
    steamPrice: "$44.99",
    basePrice: "$4.50/mo",
    platforms: ["steam"],
    multiplayerDescription: "7 Days to Die es mucho mejor en cooperativo. Construyan fortalezas juntos, preparen defensas para la horda del septimo dia y exploren el mundo en busca de suministros. Tu servidor garantiza una experiencia intensa y continua.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Anti-Cheat Integrado" },
      { label: "Configuracion XML" },
    ],
    plans: [
      { name: "Dia 1", ram: "4GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 4.50, players: "8 Jugadores" },
      { name: "Dia 4", ram: "8GB", cores: "3 Cores/s", storage: "80GB NVMe", basePrice: 8.00, players: "16 Jugadores", bestSeller: true },
      { name: "Dia 7", ram: "12GB", cores: "3.5 Cores/s", storage: "100GB NVMe", basePrice: 12.00, players: "24 Jugadores" },
    ],
    faqs: makeBaseFaqs("7 Days to Die"),
  },
  {
    slug: "project-zomboid",
    name: "Project Zomboid",
    tagline: "Project Zomboid Server Hosting",
    description: "Project Zomboid es un RPG de supervivencia zombie isometrico. Es la simulacion de supervivencia definitiva: saquea, construye, cultiva, pesca y lucha por tu vida en un mundo donde los zombies recuerdan todo y la muerte es permanente.",
    coverImage: "/images/games/projectzomboid.jpg",
    steamUrl: "https://store.steampowered.com/app/108600/Project_Zomboid/",
    steamPrice: "$14.99",
    basePrice: "$4.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "Project Zomboid en multijugador es una experiencia de supervivencia unica. Construyan refugios, compartan recursos y sobrevivan juntos en un mundo donde cada zombie es una amenaza. Crea tu propia comunidad de supervivientes.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Workshop de Steam" },
      { label: "Sandbox Personalizable" },
    ],
    plans: [
      { name: "Refugio", ram: "4GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 4.00, players: "10 Jugadores" },
      { name: "Comunidad", ram: "6GB", cores: "2.5 Cores/s", storage: "50GB SSD", basePrice: 6.00, players: "20 Jugadores", bestSeller: true },
      { name: "Fortaleza", ram: "8GB", cores: "3 Cores/s", storage: "80GB NVMe", basePrice: 9.00, players: "32 Jugadores" },
    ],
    faqs: makeBaseFaqs("Project Zomboid"),
  },
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
    multiplayerDescription: "The Forest en cooperativo es una experiencia de terror y supervivencia increible. Exploren cuevas, construyan bases fortificadas y enfrenten los horrores del bosque juntos. Un servidor dedicado mantiene su mundo activo 24/7.",
    features: [
      ...universalFeatures,
      { label: "Soporte Cooperativo" },
      { label: "Caves Persistentes" },
      { label: "Saves Automaticos" },
    ],
    plans: [
      { name: "Campamento", ram: "4GB", cores: "2 Cores/s", storage: "30GB SSD", basePrice: 8.80, players: "4 Jugadores" },
      { name: "Base", ram: "6GB", cores: "2.5 Cores/s", storage: "50GB SSD", basePrice: 10.00, players: "6 Jugadores", bestSeller: true },
      { name: "Fortaleza", ram: "8GB", cores: "3 Cores/s", storage: "80GB NVMe", basePrice: 14.00, players: "8 Jugadores" },
    ],
    faqs: makeBaseFaqs("The Forest"),
  },
  {
    slug: "sons-of-the-forest",
    name: "Sons of the Forest",
    tagline: "Sons of the Forest Server Hosting",
    description: "Sons of the Forest es la secuela del aclamado The Forest. Enviado a buscar a un millonario desaparecido en una isla remota, te encuentras en un infierno infestado de canibales. Construye, crea y lucha para sobrevivir con graficos de nueva generacion.",
    coverImage: "/images/games/sonsoftheforest.jpg",
    steamUrl: "https://store.steampowered.com/app/1326470/Sons_Of_The_Forest/",
    steamPrice: "$29.99",
    basePrice: "$8.80/mo",
    platforms: ["steam"],
    multiplayerDescription: "Sons of the Forest es una experiencia cooperativa de nueva generacion. Exploren la isla juntos, construyan defensas y enfrenten amenazas cada vez mas peligrosas. Tu servidor dedicado asegura la mejor experiencia posible.",
    features: [
      ...universalFeatures,
      { label: "Soporte Cooperativo" },
      { label: "Mundo Persistente" },
      { label: "IA Avanzada de NPCs" },
    ],
    plans: [
      { name: "Sobreviviente", ram: "6GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 8.80, players: "4 Jugadores" },
      { name: "Explorador", ram: "8GB", cores: "3 Cores/s", storage: "80GB SSD", basePrice: 12.00, players: "6 Jugadores", bestSeller: true },
      { name: "Leyenda", ram: "12GB", cores: "3.5 Cores/s", storage: "100GB NVMe", basePrice: 16.00, players: "8 Jugadores" },
    ],
    faqs: makeBaseFaqs("Sons of the Forest"),
  },
  {
    slug: "enshrouded",
    name: "Enshrouded",
    tagline: "Enshrouded Server Hosting",
    description: "Enshrouded es un RPG de supervivencia cooperativo ambientado en un vasto continente destruido. Explora, construye, lucha y mejora a tu personaje en un mundo donde la Niebla amenaza con consumir todo. Personaliza tu clase y domina el crafting.",
    coverImage: "/images/games/enshrouded.jpg",
    steamUrl: "https://store.steampowered.com/app/1203620/Enshrouded/",
    steamPrice: "$29.99",
    basePrice: "$6.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "Enshrouded esta disenado para la cooperacion. Exploren la Niebla juntos, construyan bases majestuosas y enfrenten jefes poderosos como equipo. Un servidor dedicado mantiene tu mundo activo para tus amigos en todo momento.",
    features: [
      ...universalFeatures,
      { label: "Configuracion Avanzada" },
      { label: "Mundo Persistente" },
      { label: "Actualizaciones Automaticas" },
    ],
    plans: [
      { name: "Viajero", ram: "6GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 6.00, players: "4 Jugadores" },
      { name: "Guardian", ram: "8GB", cores: "3 Cores/s", storage: "80GB SSD", basePrice: 10.00, players: "8 Jugadores", bestSeller: true },
      { name: "Campeon", ram: "12GB", cores: "3.5 Cores/s", storage: "100GB NVMe", basePrice: 14.00, players: "16 Jugadores" },
    ],
    faqs: makeBaseFaqs("Enshrouded"),
  },
  {
    slug: "conan-exiles",
    name: "Conan Exiles",
    tagline: "Conan Exiles Server Hosting",
    description: "Conan Exiles es un juego de supervivencia en mundo abierto ambientado en el brutal universo de Conan el Barbaro. Construye desde una choza humilde hasta una fortaleza completa, domina esclavos, lucha contra jefes y domina las Tierras del Exilio.",
    coverImage: "/images/games/conanexiles.jpg",
    steamUrl: "https://store.steampowered.com/app/440900/Conan_Exiles/",
    steamPrice: "$39.99",
    basePrice: "$6.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "Conan Exiles es una experiencia multijugador epica. Construye imperios, forma clanes, lucha en asedios y domina las Tierras del Exilio con tus aliados. Tu servidor te da control total sobre la experiencia de juego.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Workshop de Steam" },
      { label: "Configuracion de Servidor" },
    ],
    plans: [
      { name: "Exiliado", ram: "6GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 6.00, players: "10 Jugadores" },
      { name: "Clan", ram: "10GB", cores: "3 Cores/s", storage: "80GB NVMe", basePrice: 10.00, players: "20 Jugadores", bestSeller: true },
      { name: "Rey", ram: "16GB", cores: "4 Cores/s", storage: "120GB NVMe", basePrice: 16.00, players: "40 Jugadores" },
    ],
    faqs: makeBaseFaqs("Conan Exiles"),
  },
  {
    slug: "v-rising",
    name: "V Rising",
    tagline: "V Rising Server Hosting",
    description: "V Rising es un juego de supervivencia vampirica en mundo abierto. Despierta como un vampiro debilitado, caza sangre para recuperar tus poderes, construye tu castillo gotico y establece tu dominio sobre el mundo de los vivos.",
    coverImage: "/images/games/vrising.jpg",
    steamUrl: "https://store.steampowered.com/app/1604030/V_Rising/",
    steamPrice: "$34.99",
    basePrice: "$6.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "V Rising es perfecto para clanes de vampiros. Construyan castillos, cacen juntos, luchen por territorios y establezcan su reinado de oscuridad. Un servidor dedicado mantiene tu castillo siempre disponible.",
    features: [
      ...universalFeatures,
      { label: "Configuracion PvP/PvE" },
      { label: "Loot Tables Personalizables" },
      { label: "Administracion Remota" },
    ],
    plans: [
      { name: "Fledgling", ram: "4GB", cores: "2 Cores/s", storage: "30GB SSD", basePrice: 6.00, players: "10 Jugadores" },
      { name: "Lord", ram: "6GB", cores: "2.5 Cores/s", storage: "50GB SSD", basePrice: 8.00, players: "20 Jugadores", bestSeller: true },
      { name: "Dracul", ram: "8GB", cores: "3 Cores/s", storage: "80GB NVMe", basePrice: 12.00, players: "40 Jugadores" },
    ],
    faqs: makeBaseFaqs("V Rising"),
  },
  {
    slug: "space-engineers",
    name: "Space Engineers",
    tagline: "Space Engineers Server Hosting",
    description: "Space Engineers es un sandbox de ingenieria, construccion, exploracion y supervivencia en el espacio y en planetas. Construye naves, estaciones espaciales, bases planetarias y mas con un motor de fisica realista.",
    coverImage: "/images/games/spaceengineers.jpg",
    steamUrl: "https://store.steampowered.com/app/244850/Space_Engineers/",
    steamPrice: "$19.99",
    basePrice: "$6.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "Space Engineers multijugador te permite construir megaestructuras con amigos, organizar batallas espaciales y explorar el universo juntos. Un servidor dedicado soporta tus creaciones mas ambiciosas.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Workshop de Steam" },
      { label: "Fisica Avanzada" },
    ],
    plans: [
      { name: "Ingeniero", ram: "6GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 6.00, players: "8 Jugadores" },
      { name: "Comandante", ram: "10GB", cores: "3 Cores/s", storage: "80GB NVMe", basePrice: 10.00, players: "16 Jugadores", bestSeller: true },
      { name: "Almirante", ram: "16GB", cores: "4 Cores/s", storage: "120GB NVMe", basePrice: 16.00, players: "32 Jugadores" },
    ],
    faqs: makeBaseFaqs("Space Engineers"),
  },
  {
    slug: "dont-starve-together",
    name: "Don't Starve Together",
    tagline: "Don't Starve Together Server Hosting",
    description: "Don't Starve Together es la expansion multijugador independiente del juego de supervivencia Don't Starve. Coopera con amigos para sobrevivir en un mundo misterioso lleno de peligros, criaturas extranas y oscuridad.",
    coverImage: "/images/games/dontstarvetogether.jpg",
    steamUrl: "https://store.steampowered.com/app/322330/Dont_Starve_Together/",
    steamPrice: "$14.99",
    basePrice: "$3.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "Don't Starve Together es la definicion de cooperacion. Sobrevivan juntos, dividan tareas, exploren cuevas y enfrenten jefes estacionales. Tu servidor te permite jugar con tus amigos cuando quieran.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Workshop de Steam" },
      { label: "Caves Habilitadas" },
    ],
    plans: [
      { name: "Wilson", ram: "2GB", cores: "1 Core/s", storage: "30GB SSD", basePrice: 3.00, players: "6 Jugadores" },
      { name: "Wolfgang", ram: "3GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 4.50, players: "12 Jugadores", bestSeller: true },
      { name: "Wicker", ram: "4GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 6.00, players: "24 Jugadores" },
    ],
    faqs: makeBaseFaqs("Don't Starve Together"),
  },
  {
    slug: "factorio",
    name: "Factorio",
    tagline: "Factorio Server Hosting",
    description: "Factorio es un juego de construccion y automatizacion de fabricas. Mina recursos, investiga tecnologias, construye infraestructura, automatiza la produccion y defiendete de las criaturas nativas hostiles del planeta.",
    coverImage: "/images/games/factorio.jpg",
    officialUrl: "https://www.factorio.com/",
    steamUrl: "https://store.steampowered.com/app/427520/Factorio/",
    steamPrice: "$35.00",
    basePrice: "$3.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "Factorio en multijugador es increiblemente adictivo. Dividan tareas, optimicen juntos y construyan la fabrica mas eficiente posible. Un servidor dedicado mantiene la fabrica funcionando 24/7.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Saves Persistentes" },
      { label: "Actualizaciones Automaticas" },
    ],
    plans: [
      { name: "Burner", ram: "2GB", cores: "1 Core/s", storage: "30GB SSD", basePrice: 3.00, players: "8 Jugadores" },
      { name: "Electric", ram: "4GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 5.00, players: "16 Jugadores", bestSeller: true },
      { name: "Nuclear", ram: "6GB", cores: "3 Cores/s", storage: "80GB SSD", basePrice: 8.00, players: "32 Jugadores" },
    ],
    faqs: makeBaseFaqs("Factorio"),
  },
  {
    slug: "squad",
    name: "Squad",
    tagline: "Squad Server Hosting",
    description: "Squad es un shooter tactico multijugador que busca cerrar la brecha entre shooters tipo arcade y simulaciones militares. Comunicacion, trabajo en equipo y tacticas son esenciales para la victoria en campos de batalla a gran escala.",
    coverImage: "/images/games/squad.jpg",
    steamUrl: "https://store.steampowered.com/app/393380/Squad/",
    steamPrice: "$49.99",
    basePrice: "$9.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "Squad esta disenado al 100% para multijugador. Lidera escuadrones, coordina con tu equipo y experimenta batallas tacticas a gran escala. Un servidor dedicado te permite personalizar mapas, modos y reglas.",
    features: [
      ...universalFeatures,
      { label: "100 Jugadores por Servidor" },
      { label: "Licencia de Servidor" },
      { label: "Mapas Personalizados" },
    ],
    plans: [
      { name: "Escuadra", ram: "8GB", cores: "3 Cores/s", storage: "80GB SSD", basePrice: 9.00, players: "50 Jugadores" },
      { name: "Peloton", ram: "12GB", cores: "4 Cores/s", storage: "100GB NVMe", basePrice: 14.00, players: "80 Jugadores", bestSeller: true },
      { name: "Batallon", ram: "16GB", cores: "4 Cores/s", storage: "150GB NVMe", basePrice: 20.00, players: "100 Jugadores" },
    ],
    faqs: makeBaseFaqs("Squad"),
  },
  {
    slug: "icarus",
    name: "Icarus",
    tagline: "Icarus Server Hosting",
    description: "Icarus es un juego de supervivencia PvE para hasta 8 jugadores cooperativos. Explora un planeta salvaje alienigenea en misiones basadas en sesiones. Construye refugios, crea herramientas, extrae recursos y vuelve a orbita con tu botin.",
    coverImage: "/images/games/icarus.jpg",
    steamUrl: "https://store.steampowered.com/app/1149460/ICARUS/",
    steamPrice: "$34.99",
    basePrice: "$6.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "Icarus brilla en cooperativo. Trabajen juntos para completar misiones, sobrevivir tormentas y recolectar exoticos valiosos antes de que la ventana de extraccion se cierre. Un servidor dedicado mantiene sus mundos persistentes.",
    features: [
      ...universalFeatures,
      { label: "Misiones Cooperativas" },
      { label: "Mundos Persistentes" },
      { label: "Actualizaciones Automaticas" },
    ],
    plans: [
      { name: "Prospector", ram: "6GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 6.00, players: "4 Jugadores" },
      { name: "Veterano", ram: "8GB", cores: "3 Cores/s", storage: "80GB SSD", basePrice: 10.00, players: "6 Jugadores", bestSeller: true },
      { name: "Elite", ram: "12GB", cores: "3.5 Cores/s", storage: "100GB NVMe", basePrice: 14.00, players: "8 Jugadores" },
    ],
    faqs: makeBaseFaqs("Icarus"),
  },
  {
    slug: "team-fortress-2",
    name: "Team Fortress 2",
    tagline: "TF2 Server Hosting",
    description: "Team Fortress 2 es un shooter multijugador basado en clases con un estilo visual unico. Elige entre 9 clases distintas y lucha en variados modos de juego con un tono humoristico y una comunidad activa desde hace mas de una decada.",
    coverImage: "/images/games/tf2.jpg",
    steamUrl: "https://store.steampowered.com/app/440/Team_Fortress_2/",
    steamPrice: "Gratis",
    basePrice: "$2.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "TF2 es 100% multijugador. Personaliza tu servidor con mapas, plugins y modos de juego. Desde servidores competitivos hasta trade servers y mas, las posibilidades son infinitas.",
    features: [
      ...universalFeatures,
      { label: "Soporte SourceMod" },
      { label: "Mapas Personalizados" },
      { label: "Plugins de Servidor" },
    ],
    plans: [
      { name: "Scout", ram: "2GB", cores: "1 Core/s", storage: "30GB SSD", basePrice: 2.00, players: "12 Jugadores" },
      { name: "Soldier", ram: "3GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 3.50, players: "24 Jugadores", bestSeller: true },
      { name: "Heavy", ram: "4GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 5.00, players: "32 Jugadores" },
    ],
    faqs: makeBaseFaqs("Team Fortress 2"),
  },
  {
    slug: "euro-truck-simulator-2",
    name: "Euro Truck Simulator 2",
    tagline: "ETS2 Server Hosting",
    description: "Euro Truck Simulator 2 te pone al volante de un camion en toda Europa. Conduce por carreteras detalladas, entrega cargas, expande tu empresa de transporte y explora ciudades europeas iconicas en el simulador de camiones mas popular del mundo.",
    coverImage: "/images/games/eurotruck.jpg",
    steamUrl: "https://store.steampowered.com/app/227300/Euro_Truck_Simulator_2/",
    steamPrice: "$19.99",
    basePrice: "$4.40/mo",
    platforms: ["steam"],
    multiplayerDescription: "ETS2 en multijugador via TruckersMP te permite conducir con miles de jugadores en tiempo real. Forma convoyes, entreguen cargas juntos y disfruten de la carretera. Tu servidor dedicado garantiza la mejor experiencia.",
    features: [
      ...universalFeatures,
      { label: "Soporte TruckersMP" },
      { label: "Convoyes Privados" },
      { label: "Mapa Expandido" },
    ],
    plans: [
      { name: "Local", ram: "2GB", cores: "1 Core/s", storage: "30GB SSD", basePrice: 4.40, players: "8 Jugadores" },
      { name: "Regional", ram: "4GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 6.00, players: "16 Jugadores", bestSeller: true },
      { name: "Continental", ram: "6GB", cores: "3 Cores/s", storage: "80GB SSD", basePrice: 8.00, players: "32 Jugadores" },
    ],
    faqs: makeBaseFaqs("Euro Truck Simulator 2"),
  },
  {
    slug: "mindustry",
    name: "Mindustry",
    tagline: "Mindustry Server Hosting",
    description: "Mindustry es un juego de defensa de torre hibrido con elementos de gestion de recursos. Construye cadenas de produccion elaboradas, defiende tus estructuras y juega con otros en un titulo indie estrategico y adictivo.",
    coverImage: "/images/games/mindustry.jpg",
    steamUrl: "https://store.steampowered.com/app/1127400/Mindustry/",
    steamPrice: "$5.99",
    basePrice: "$2.00/mo",
    platforms: ["steam"],
    multiplayerDescription: "Mindustry en multijugador es altamente estrategico. Cooperen para construir defensas, compartan recursos y enfrenten oleadas cada vez mas dificiles. Un servidor dedicado permite partidas continuas con tu comunidad.",
    features: [
      ...universalFeatures,
      { label: "Soporte de Mods" },
      { label: "Mapas Personalizados" },
      { label: "Plugins de Servidor" },
    ],
    plans: [
      { name: "Basico", ram: "1GB", cores: "1 Core/s", storage: "20GB SSD", basePrice: 2.00, players: "8 Jugadores" },
      { name: "Avanzado", ram: "2GB", cores: "1 Core/s", storage: "30GB SSD", basePrice: 3.00, players: "16 Jugadores", bestSeller: true },
      { name: "Pro", ram: "3GB", cores: "2 Cores/s", storage: "50GB SSD", basePrice: 4.00, players: "24 Jugadores" },
    ],
    faqs: makeBaseFaqs("Mindustry"),
  },
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
      { name: "Basico", ram: "8GB", cores: "3 Cores/s", storage: "80GB SSD", basePrice: 12.00, players: "32 Jugadores" },
      { name: "Avanzado", ram: "16GB", cores: "4 Cores/s", storage: "120GB NVMe", basePrice: 20.00, players: "64 Jugadores", bestSeller: true },
      { name: "Premium", ram: "32GB", cores: "6 Cores/s", storage: "200GB NVMe", basePrice: 35.00, players: "128 Jugadores" },
    ],
    faqs: makeBaseFaqs("FiveM"),
  },
  {
    slug: "ragemp",
    name: "RageMP",
    tagline: "RageMP Server Hosting",
    description: "RageMP es una plataforma de multijugador alternativa para GTA V. Permite crear servidores personalizados con scripting en C# y JavaScript para experiencias de roleplay, racing y mas con altas capacidades de jugadores.",
    coverImage: "/images/games/ragemp.jpg",
    officialUrl: "https://rage.mp/",
    steamPrice: "Gratis",
    basePrice: "$12.00/mo",
    platforms: ["steam"],
    comingSoon: true,
    multiplayerDescription: "RageMP te permite crear servidores de GTA V completamente personalizados. Desde roleplay hasta racing y mas, las posibilidades son infinitas con scripting avanzado en C# y JavaScript.",
    features: [
      ...universalFeatures,
      { label: "Scripting C#/JS" },
      { label: "Alta Capacidad" },
      { label: "Base de Datos MySQL" },
    ],
    plans: [
      { name: "Basico", ram: "8GB", cores: "3 Cores/s", storage: "80GB SSD", basePrice: 12.00, players: "32 Jugadores" },
      { name: "Avanzado", ram: "16GB", cores: "4 Cores/s", storage: "120GB NVMe", basePrice: 20.00, players: "64 Jugadores", bestSeller: true },
      { name: "Premium", ram: "32GB", cores: "6 Cores/s", storage: "200GB NVMe", basePrice: 35.00, players: "128 Jugadores" },
    ],
    faqs: makeBaseFaqs("RageMP"),
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
