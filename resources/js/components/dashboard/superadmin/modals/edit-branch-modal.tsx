import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import type { Branch } from '@/types';

interface Props {
  open: boolean;
  onClose: () => void;
  branch: Branch;
}

export function EditBranchModal({ open, onClose, branch }: Props) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: branch.name,
  });

  useEffect(() => {
    if (open) {
      setData('name', branch.name);
    }
  }, [open, branch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    put(route('dashboard.superadmin.branches.update', branch.id), {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Cabang</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder="Nama Cabang"
            disabled={processing}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

          <div className="flex justify-end">
            <Button type="submit" disabled={processing}>
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
