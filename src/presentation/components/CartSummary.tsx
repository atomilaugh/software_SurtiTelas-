import React from 'react'

interface CartSummaryProps {
  subtotal: number
  discount: number
  tax: number
  shipping: number
  total: number
}

const formatCurrency = (value: number) => `$${value.toLocaleString()}`

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, discount, tax, shipping, total }) => {
  return (
    <aside className="cart-summary-premium">
      <div className="cart-summary-header">
        <h3>Resumen del pedido</h3>
      </div>

      <div className="cart-summary-items">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="summary-row discount">
          <span>Descuento</span>
          <span>{discount > 0 ? `-${formatCurrency(discount)}` : '$0'}</span>
        </div>
        <div className="summary-row">
          <span>IVA 19%</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="summary-row">
          <span>Envío</span>
          <span>{shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-row total">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="cart-summary-note">
        <span>Compra aún más para envío gratis si tu pedido es superior a $150.000</span>
      </div>
    </aside>
  )
}

export default CartSummary
