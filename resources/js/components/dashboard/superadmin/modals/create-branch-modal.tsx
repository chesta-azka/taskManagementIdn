'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CreateBranchModal({ open, onClose }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    location: '',
    color: '#00FF00',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('dashboard.superadmin.branches.store'), {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Tambah Cabang
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Nama Cabang"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Lokasi (opsional)"
              value={data.location}
              onChange={(e) => setData('location', e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="branch-color" className="text-sm text-gray-700">
              Warna:
            </label>
            <input
              id="branch-color"
              type="color"
              value={data.color}
              onChange={(e) => setData('color', e.target.value)}
              className="h-8 w-8 rounded border border-gray-300"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={processing}
              className="w-full disabled:opacity-50"
            >
              {processing ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
