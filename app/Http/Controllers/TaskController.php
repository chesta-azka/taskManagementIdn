<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Task;

class TaskController extends Controller
{
    public function store(Request $request, $branchId, $boardId)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'board_id' => 'required|exists:boards,id',
        ]);

        return Task::create([
            'title' => $data['title'],
            'board_id' => $data['board_id'],
            'order' => Task::where('board_id', $data['board_id'])->count(), // taruh di paling bawah
        ]);

            $data = $request->validate([
        'title' => 'required|string|max:255',
    ]);

    $task = \App\Models\Task::create([
        'title' => $data['title'],
        'board_id' => $boardId,
    ]);

    return redirect()->back()->with([
        'success' => 'Task berhasil ditambahkan.',
        'newTask' => $task
    ]);
    }

    public function update(Request $request, Task $task)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $task->update($data);

        return response()->json(['message' => 'Task updated']);
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'board_id' => 'required|integer|exists:boards,id',
            'task_ids' => 'required|array',
            'task_ids.*' => 'integer|exists:tasks,id',
        ]);

        foreach ($request->task_ids as $index => $taskId) {
            DB::table('tasks')->where('id', $taskId)->update([
                'board_id' => $request->board_id,
                'order' => $index,
            ]);
        }

        return response()->json(['message' => 'Task order updated']);
    }
}
