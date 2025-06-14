<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Board;
use App\Models\Branch;

class BranchBoardController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'branch_id' => 'required|exists:branches,id',
            'name' => 'required|string|max:255',
        ]);

        $board = Board::create($data);

        // Ambil ID branch dari data yang baru disimpan
        $branchId = $data['branch_id'];

        return redirect()->route('dashboard.superadmin.branches.show', $branchId)->with([
            'success' => 'Board berhasil dibuat.',
            'newBoard' => $board, // jika kamu ingin flash ke inertia
        ]);
    }

    public function update(Request $request, Board $board)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $board->update($data);

        return back()->with('success', 'Board diperbarui.');
    }

    public function destroy(Board $board)
    {
        $board->delete();

        return back()->with('success', 'Board dihapus.');
    }
}
