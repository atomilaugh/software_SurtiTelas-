import React, { useMemo, useRef, useState } from 'react'
import { X, Upload } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useCart } from '@presentation/contexts/CartContext'
import './CheckoutModal.css'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

const bankOptions = [
  'Bancolombia',
  'Davivienda',
  'BBVA',
  'Banco de Bogotá',
  'Nequi',
]

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { subtotal, discount, tax, shipping, total, clearCart, items } = useCart()
  const [selectedBank, setSelectedBank] = useState('')
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const subtotalLabel = useMemo(() => `subtotal`, [])
  const taxesLabel = useMemo(() => `IVA 19%`, [])

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(event.target.value)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    if (!file) {
      setProofFile(null)
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('El comprobante no puede superar 10 MB.')
      setProofFile(null)
      return
    }

    setProofFile(file)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleConfirm = async () => {
    if (!selectedBank) {
      toast.error('Selecciona un banco antes de continuar.')
      return
    }

    if (!proofFile) {
      toast.error('Adjunta el comprobante de pago.')
      return
    }

    if (items.length === 0) {
      toast.error('No hay productos en el carrito.')
      onClose()
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 850))
    clearCart()
    setIsSubmitting(false)
    toast.success('Pago registrado. Tu pedido será confirmado en breve.')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="checkout-modal-overlay" onClick={onClose}>
      <div className="checkout-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="checkout-close-btn" type="button" onClick={onClose} aria-label="Cerrar modal">
          <X size={20} />
        </button>

        <div className="checkout-header">
          <div>
            <h2>Finalizar Compra</h2>
            <p>Completa los datos de pago para confirmar tu pedido.</p>
          </div>
        </div>

        <div className="checkout-grid">
          <aside className="checkout-summary-card">
            <h3>Resumen del Pedido</h3>
            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <strong>{subtotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</strong>
            </div>
            {discount > 0 && (
              <div className="checkout-summary-row muted">
                <span>Descuento</span>
                <strong>-{discount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</strong>
              </div>
            )}
            <div className="checkout-summary-row muted">
              <span>{taxesLabel}</span>
              <strong>{tax.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</strong>
            </div>
            <div className="checkout-summary-row muted">
              <span>Envío</span>
              <strong>{shipping === 0 ? 'Gratis' : shipping.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</strong>
            </div>
            <div className="checkout-summary-divider" />
            <div className="checkout-summary-row total">
              <span>Total</span>
              <strong>{total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</strong>
            </div>
          </aside>

          <section className="checkout-form-card">
            <div className="checkout-field">
              <label htmlFor="bank-select">Selecciona el Banco *</label>
              <select id="bank-select" value={selectedBank} onChange={handleBankChange}>
                <option value="">Selecciona tu banco</option>
                {bankOptions.map((bank) => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>

            <div className="checkout-field">
              <label>Comprobante de Pago *</label>
              <div className="checkout-upload-card" onClick={handleUploadClick}>
                <Upload size={24} />
                <div>
                  <p>{proofFile ? proofFile.name : 'Haz clic para subir tu comprobante'}</p>
                  <small>PNG, JPG o JPEG (máx. 10MB)</small>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="checkout-file-input"
                onChange={handleFileSelect}
              />
            </div>

            <div className="checkout-note-box">
              <strong>Nota:</strong>
              <p>Tu pago será verificado por un asesor en las próximas horas. Recibirás una notificación cuando sea aprobado.</p>
            </div>

            <div className="checkout-actions">
              <button className="checkout-secondary-btn" type="button" onClick={onClose}>
                Cancelar
              </button>
              <button
                className="checkout-primary-btn"
                type="button"
                onClick={handleConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Confirmando...' : 'Confirmar Pedido'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
