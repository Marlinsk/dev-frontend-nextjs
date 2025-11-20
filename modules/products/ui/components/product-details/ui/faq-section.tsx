import { memo } from "react"
import { FaqItem } from "./faq-item"

function FaqSectionComponent() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold">Perguntas Frequentes</h2>
      <div className="space-y-3">
        <FaqItem
          question="Qual o prazo de entrega?"
          answer="O prazo varia de acordo com sua região. Em média, de 3 a 7 dias úteis para capitais e até 15 dias úteis para demais regiões."
        />
        <FaqItem
          question="Posso parcelar a compra?"
          answer="Sim! Aceitamos pagamento em até 12x sem juros no cartão de crédito."
        />
        <FaqItem
          question="Como faço para trocar ou devolver?"
          answer="Você tem até 30 dias após o recebimento para solicitar troca ou devolução. O produto deve estar sem uso e na embalagem original."
        />
      </div>
    </div>
  )
}

export const FaqSection = memo(FaqSectionComponent)
