import { useState } from 'react';
import { Edit, Trash2, Plus, Tag } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, type CategoryFormData } from '../schemas/inventory.schema';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../hooks/useInventory';
import { Modal, Table, TableHead, TableBody, TableRow, TableCell, TableHeader, Button, Input, Select, Badge, EmptyState, SkeletonTable } from '@/shared/ui';
import type { Category } from '../types/inventory.types';

const CategoriesModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [editing, setEditing] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { data: categories = [], isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema) as any,
    defaultValues: editing ? { name: editing.name, description: editing.description, status: editing.status } : { status: 'active' },
  });

  const handleEdit = (cat: Category) => {
    setEditing(cat);
    reset({ name: cat.name, description: cat.description, status: cat.status });
    setShowForm(true);
  };

  const onSubmit = async (data: CategoryFormData) => {
    if (editing) {
      await updateCategory.mutateAsync({ id: editing.id, data });
    } else {
      await createCategory.mutateAsync(data);
    }
    setShowForm(false);
    setEditing(null);
    reset({ status: 'active' });
  };

  return (
    <Modal open={open} onClose={onClose} title="Gestión de Categorías" size="lg">
      <div className="space-y-4">
        {!showForm ? (
          <Button size="sm" onClick={() => { setEditing(null); reset({ status: 'active' }); setShowForm(true); }} leftIcon={<Plus size={14} />}>
            Nueva categoría
          </Button>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-50 dark:bg-zinc-800 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{editing ? 'Editar' : 'Nueva'} categoría</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Nombre" error={errors.name?.message} {...register('name')} placeholder="Ej: Camisetas" />
              <Select label="Estado" error={errors.status?.message} options={[{ value: 'active', label: 'Activo' }, { value: 'inactive', label: 'Inactivo' }]} {...register('status')} />
            </div>
            <Input label="Descripción" error={errors.description?.message} {...register('description')} placeholder="Descripción opcional" />
            <div className="flex gap-2">
              <Button type="submit" size="sm" loading={createCategory.isPending || updateCategory.isPending}>{editing ? 'Actualizar' : 'Crear'}</Button>
              <Button type="button" variant="outline" size="sm" onClick={() => { setShowForm(false); setEditing(null); }}>Cancelar</Button>
            </div>
          </form>
        )}

        {isLoading ? <SkeletonTable rows={4} cols={4} /> : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Nombre</TableHeader>
                <TableHeader>Productos</TableHeader>
                <TableHeader>Estado</TableHeader>
                <TableHeader className="text-right">Acciones</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-slate-400" />
                      <span className="font-medium text-slate-900 dark:text-white">{cat.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{cat.productCount}</TableCell>
                  <TableCell>
                    <Badge variant={cat.status === 'active' ? 'success' : 'default'}>{cat.status === 'active' ? 'Activo' : 'Inactivo'}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => handleEdit(cat)}><Edit size={14} /></Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => { if (confirm('¿Eliminar?')) deleteCategory.mutate(cat.id); }}>
                        <Trash2 size={14} className="text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Modal>
  );
};

export default CategoriesModal;
