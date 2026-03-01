import { Metadata } from "next"
import { ContactPageContent } from "@/components/contact-page-content"

export const metadata: Metadata = {
  title: "Contacto - ForzaHost",
  description: "Tienes preguntas o necesitas ayuda? Contacta al equipo de soporte de ForzaHost.",
}

export default function ContactoPage() {
  return <ContactPageContent />
}
