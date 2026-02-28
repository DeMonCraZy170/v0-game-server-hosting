"use client"

import { useEffect, useRef, useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const reviews = [
  {
    name: "Carlos M.",
    rating: 5,
    title: "Primera vez alquilando un servidor, sin arrepentimientos",
    text: "Primera vez que pago por un host en lugar de correr un servidor en mi PC y debo decir que estoy muy satisfecho con la experiencia. Alquilo un servidor pequeno para mi y mis amigos y nunca he experimentado problemas.",
  },
  {
    name: "Maria L.",
    rating: 5,
    title: "Soporte increible, 10/10",
    text: "Soporte increible. Respondieron muy rapido a mi ticket y arreglaron el problema en poco tiempo, permitiendome a mi y a mis amigos disfrutar de nuestro servidor de Minecraft.",
  },
  {
    name: "Fernando R.",
    rating: 5,
    title: "Equipo de soporte muy considerado",
    text: "He usado esto por casi 2 anos y hasta ahora no he tenido experiencias negativas ni falta de rendimiento. Multitud de opciones de servicio para que haya opciones para todo presupuesto.",
  },
  {
    name: "Ana G.",
    rating: 5,
    title: "Hosting Excepcional de Servidores",
    text: "He estado usando ForzaHost para mi servidor de Minecraft y no podria estar mas contenta. El proceso de configuracion fue directo y su interfaz es amigable, incluso para principiantes.",
  },
  {
    name: "Diego P.",
    rating: 5,
    title: "Servicio estelar",
    text: "Increiblemente rapido! Todos los servicios fueron proporcionados tal como se anuncio. Mi experiencia ha sido superior a lo esperado, especialmente en la resolucion de tickets.",
  },
  {
    name: "Laura S.",
    rating: 5,
    title: "ForzaHost es EL MEJOR HOST",
    text: "ForzaHost ha sido un cambio total para mis necesidades de hosting. Su sitio web es intuitivo y facil de usar. Lo que realmente los diferencia es su excepcional servicio al cliente.",
  },
]

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [sectionRef, sectionVisible] = useScrollReveal({ threshold: 0.1 })

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.addEventListener("scroll", updateScrollButtons)
      updateScrollButtons()
      return () => el.removeEventListener("scroll", updateScrollButtons)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 340
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-20 bg-background">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div
          className="flex items-end justify-between mb-10 transition-all duration-700 ease-out"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div>
            <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
              {"Respaldado Por 2,000+ Resenas Positivas"}
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Reviews carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory transition-all duration-700 ease-out"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(40px)",
            transitionDelay: "0.15s",
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={review.name}
              className="flex-shrink-0 w-80 bg-card border border-border rounded-2xl p-6 snap-start hover:border-primary/30 transition-all duration-500"
              style={{
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
                transitionDelay: `${200 + index * 80}ms`,
                transitionDuration: "600ms",
              }}
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <h4 className="font-bold text-foreground mb-2">{review.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{review.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                  {review.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-foreground">{review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
