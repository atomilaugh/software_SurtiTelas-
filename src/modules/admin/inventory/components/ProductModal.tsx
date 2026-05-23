import { Modal } from '@/shared/ui';
import ProductForm from './ProductForm';
import { useInventoryStore } from '../store/inventory.store';
import { useCreateProduct, useUpdateProduct } from '../hooks/useInventory';
import type { ProductFormData } from '../schemas/inventory.schema';

const ProductModal = () => {
  const { activeModal, selectedProduct, closeModal } = useInventoryStore();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const isOpen = activeModal === 'product';
  const isEditing = !!selectedProduct;

  const handleSubmit = async (data: ProductFormData) => {
    if (isEditing && selectedProduct) {
      await updateProduct.mutateAsync({ id: selectedProduct.id, data });
    } else {
      await createProduct.mutateAsync(data);
    }
    closeModal();
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      title={isEditing ? 'Editar Producto' : 'Nuevo Producto'}
      description={isEditing ? `Editando: ${selectedProduct?.name}` : 'Completa los datos del nuevo producto'}
      size="2xl"
    >
      <ProductForm
        product={selectedProduct}
        onSubmit={handleSubmit}
        onCancel={closeModal}
        isLoading={createProduct.isPending || updateProduct.isPending}
      />
    </Modal>
  );
};

export default ProductModal;
