import { BookOpen, Activity, Newspaper, ArrowRight } from "lucide-react"

const resources = [
  {
    icon: BookOpen,
    title: "Base de Conocimiento",
    description: "Mas de 500 articulos y guias para ayudarte.",
    href: "#",
  },
  {
    icon: Activity,
    title: "Pagina de Estado",
    description: "Monitorea el estado de nuestros servicios en tiempo real.",
    href: "#",
  },
  {
    icon: Newspaper,
    title: "Blog",
    description: "Noticias, tutoriales y actualizaciones de ForzaHost.",
    href: "#",
  },
]

export function ResourcesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-10">
          <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
            Centro de Recursos
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {"Tienes mas preguntas que necesitan respuesta?"}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {"Revisa nuestros 500+ articulos de base de conocimiento y publicaciones de blog. Tambien puedes "}
            <a href="#" className="text-primary hover:underline">
              contactar a nuestro equipo de soporte
            </a>
            {" para asistencia adicional."}
          </p>
        </div>

        {/* Resource cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <a
                key={resource.title}
                href={resource.href}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {resource.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  Ver mas <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
