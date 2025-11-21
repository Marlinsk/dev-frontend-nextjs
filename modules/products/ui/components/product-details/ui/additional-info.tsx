import { memo } from "react"

function AdditionalInfoComponent() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold">Informações Adicionais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 p-4 border border-border rounded-lg">
          <h3 className="font-semibold text-sm">Sobre o Produto</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Produto original e certificado</li>
            <li>• Envio rápido e seguro</li>
            <li>• Embalagem de qualidade premium</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 p-4 border border-border rounded-lg">
          <h3 className="font-semibold text-sm">Política de Devolução</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 30 dias para devolução</li>
            <li>• Produto sem uso e na embalagem original</li>
            <li>• Reembolso integral garantido</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export const AdditionalInfo = memo(AdditionalInfoComponent)
