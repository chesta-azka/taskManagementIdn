<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/superadmin/index', [
            'branches' => Branch::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'color' => 'required|string|regex:/^#([A-Fa-f0-9]{6})$/',
        ]);

        Branch::create($data);

        return redirect()->route('dashboard.superadmin.index')
            ->with('success', 'Cabang berhasil ditambahkan.');
    }

    public function update(Request $request, Branch $branch)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'color' => 'required|string|regex:/^#([A-Fa-f0-9]{6})$/',
        ]);

        $branch->update($data);

        return back()->with('success', 'Cabang diperbarui!');
    }

    public function destroy(Branch $branch)
    {
        $branch->delete();

        return back()->with('success', 'Cabang dihapus!');
    }

public function show(Branch $branch)
{
    $branch->load([
        'boards.tasks' => function ($query) {
            $query->orderBy('order');
        }
    ]);

    return Inertia::render('dashboard/superadmin/branches/show', [
        'branch' => [
            'id' => $branch->id,
            'name' => $branch->name,
        ],
        'boards' => $branch->boards->map(function ($board) {
            return [
                'id' => $board->id,
                'name' => $board->name,
                'tasks' => $board->tasks->map(function ($task) {
                    return [
                        'id' => $task->id,
                        'title' => $task->title,
                        'board_id' => $task->board_id,
                        'order' => $task->order,
                    ];
                }),
            ];
        }),
    ]);
}
}
