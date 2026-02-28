"use client"

import { useState } from "react"
import { ChevronDown, MessageCircle } from "lucide-react"

const faqs = [
  {
    question: "Por que ForzaHost es el mejor hosting de servidores de Minecraft y juegos?",
    answer:
      "Ofrecemos el hosting de servidores mas confiable a los mejores precios que encontraras. Hemos desplegado mas de 100,000 servidores desde 2017, respaldados por mas de 1700 resenas de 4 y 5 estrellas. No nos crees? Prueba tu servidor sin riesgo con nuestra garantia de reembolso de 48 horas.",
  },
  {
    question: "Nunca he alojado un servidor antes, es dificil?",
    answer:
      "Comenzar puede parecer intimidante al principio, especialmente si no eres experto en tecnologia. Usando ForzaHost, es muy facil empezar. Despues de comprar un servidor, obtienes acceso a un panel de control facil de usar, con guias detalladas que te llevan paso a paso.",
  },
  {
    question: "Que tan rapido respondera el soporte cuando tenga problemas?",
    answer:
      "Estamos comprometidos a proporcionar soporte rapido y efectivo las 24 horas del dia, los 7 dias de la semana. La mayoria de las veces, los clientes de ForzaHost reciben respuesta del soporte en menos de 30 minutos.",
  },
  {
    question: "Puedo actualizar mi hosting de servidor mas adelante?",
    answer:
      "Si, puedes actualizar tu hosting de servidor en cualquier momento! Abre un ticket con nuestro equipo de soporte para actualizar tu servidor cuando lo desees.",
  },
  {
    question: "Cual es su politica de reembolso?",
    answer:
      "Proporcionamos reembolsos completos para la mayoria del hosting de servidores dentro de las 48 horas posteriores a la compra. Ten en cuenta que no proporcionamos reembolsos para VPS o hosting de servidores dedicados.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left side */}
          <div className="lg:w-1/3">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Preguntas Frecuentes
            </h2>
            <p className="text-muted-foreground mb-6">
              {"No encuentras lo que buscas?"}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              Contactar Soporte
            </a>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-green-500">En linea</span>
            </div>
          </div>

          {/* Right side - FAQ items */}
          <div className="lg:w-2/3 flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-sm">?</span>
                    </div>
                    <span className="font-medium text-foreground text-sm">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground shrink-0 ml-4 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed pl-11">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
