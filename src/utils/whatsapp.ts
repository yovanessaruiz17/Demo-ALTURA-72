export const DEMO_PHONE_WARNING =
  'Atención: Este es un número ficticio de demostración para el portafolio de YorDev. No se realizarán llamadas reales.';

export function generateAdvisorWhatsAppUrl(
  advisorName: string,
  advisorNumber: string,
  unitNumber?: string,
  customContext?: string
): string {
  let message = `Hola ${advisorName}`;

  if (unitNumber) {
    message += `, estoy interesado en el apartamento ${unitNumber} de ALTURA 72. Me gustaría recibir información sobre disponibilidad, precio y proceso de separación.`;
  } else {
    message += `, me gustaría recibir asesoría sobre el proyecto residencial ALTURA 72 en Cartagena de Indias.`;
  }

  if (customContext) {
    message += ` (${customContext})`;
  }

  const encoded = encodeURIComponent(message);
  // Using demo whatsapp link (open in new tab)
  return `https://wa.me/${advisorNumber}?text=${encoded}`;
}

export function generateSeparationWhatsAppUrl(
  advisorName: string,
  advisorNumber: string,
  unitNumber: string,
  code: string,
  clientName: string
): string {
  const message = `Hola ${advisorName}, he registrado una solicitud de separación ficticia para el apartamento ${unitNumber} en ALTURA 72 con código de referencia [${code}]. Mi nombre es ${clientName}. Deseo conocer los próximos pasos comerciales.`;
  return `https://wa.me/${advisorNumber}?text=${encodeURIComponent(message)}`;
}
