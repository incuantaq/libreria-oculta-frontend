export type Shipping = "pickup" | "doorToDoor"

export interface ShippingOption {
    type: Shipping;
    fee: number;
    label: string;
    description?: string;
  }
  
export const SHIPPING_OPTIONS: Record<Shipping, ShippingOption> = {
    doorToDoor: {
      type: "doorToDoor",
      fee: 10000,
      label: "A Domicilio",
      description: "+10.000 COP"
    },
    pickup: {
      type: "pickup",
      fee: 0,
      label: "Recoger en Tienda",
      description: ""
    }
  } as const;

export type Payment = "contraentrega" | "mercadoPago"