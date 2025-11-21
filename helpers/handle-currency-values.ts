/**
 * Formata um valor numérico para moeda USD
 *
 * @param value - Valor numérico a ser formatado
 * @returns String formatada como moeda USD (ex: $99.99)
 *
 * @example
 * formatCurrencyValue(99.99) // "$99.99"
 * formatCurrencyValue(1234.56) // "$1234.56"
 */
export function formatCurrencyValue(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false
  }).format(value);
}

/**
 * Handler para inputs de moeda que mantém o cursor no final e formata automaticamente
 *
 * Comportamento:
 * - Remove todos os caracteres não-numéricos
 * - Trata o valor como centavos (divide por 100)
 * - Formata visualmente como moeda USD
 * - Mantém o cursor sempre no final do input
 *
 * @param event - Evento de mudança do input
 * @param onChange - Callback com o valor numérico processado
 *
 * @example
 * // Usuário digita "1234" → input mostra "$12.34" → onChange recebe 12.34
 * <Input onChange={(e) => handleCurrencyNumericValue(e, setValue)} />
 */
export function handleCurrencyNumericValue (
  event: React.ChangeEvent<HTMLInputElement>,
  onChange: (value: number) => void
) {
  const input = event.currentTarget;
  const rawValue = input.value.replace(/[^\d]/g, "");
  const numericValue = Number(rawValue) / 100;
  const formatted = formatCurrencyValue(numericValue);

  input.value = formatted;
  input.setSelectionRange(formatted.length, formatted.length);

  onChange(numericValue);
};