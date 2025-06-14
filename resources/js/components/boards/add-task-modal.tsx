'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: (task: any) => void;
  boardId: number | null;
  branchId: number;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onTaskAdded,
  boardId,
  branchId,
}: Props) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || boardId === null) {
      setError('Judul task wajib diisi.');
      return;
    }

    setLoading(true);
    setError('');

    router.post(
      route('superadmin.tasks.store', {
        branch: branchId,
        board: boardId,
      }),
      { title, board_id: boardId },
      {
        preserveScroll: true,
        onSuccess: (page) => {
          const newTask = (page.props as any).newTask;
          if (newTask) {
            onTaskAdded(newTask);
          }
          setTitle('');
          onClose();
        },
        onError: (errors) => {
          setError(errors.title || 'Terjadi kesalahan saat menambahkan task.');
        },
        onFinish: () => setLoading(false),
      }
    );
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Panel */}
      <div className="relative z-50 w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-800">
        <Dialog.Title className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          Tambah Task Baru
        </Dialog.Title>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-zinc-200">
              Judul Task
            </label>
            <input
              type="text"
              className="w-full rounded border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"
              placeholder="Contoh: Selesaikan laporan, Update fitur login"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300 dark:bg-zinc-600 dark:text-white dark:hover:bg-zinc-500"
              onClick={() => {
                setTitle('');
                setError('');
                onClose();
              }}
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="button"
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Tambah'}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
