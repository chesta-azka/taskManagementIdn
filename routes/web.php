<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\BranchBoardController;
use App\Http\Controllers\TaskController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'role:superadmin'])
    ->prefix('dashboard/superadmin')
    ->name('dashboard.superadmin.')
    ->group(function () {
        Route::get('/', [BranchController::class, 'index'])->name('index');

        // ✅ Detail Cabang (halaman khusus)
        Route::get('/branches/{branch}', [BranchController::class, 'show'])->name('branches.show');

        // ✅ Halaman Edit (jika pakai view/edit terpisah)
        Route::get('/branches/{branch}/edit', [BranchController::class, 'edit'])->name('branches.edit');

        // ✅ CRUD via Modal atau Form
        Route::post('/branches', [BranchController::class, 'store'])->name('branches.store');
        Route::put('/branches/{branch}', [BranchController::class, 'update'])->name('branches.update');
        Route::delete('/branches/{branch}', [BranchController::class, 'destroy'])->name('branches.destroy');


// Boards
Route::post('branches/{branch}/boards', [BranchBoardController::class, 'store']);

// Tasks
Route::post('boards/{board}/tasks', [TaskController::class, 'store'])->name('tasks.store');
Route::put('tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
Route::post('tasks/reorder', [TaskController::class, 'reorder'])->name('tasks.reorder'); // ← Recommended

    });



Route::middleware(['auth', 'role:admin'])
    ->prefix('dashboard/admin')
    ->name('dashboard.admin.')
    ->group(function () {
        Route::get('/', fn () => Inertia::render('dashboard/admin/index'))->name('index');
        // Tambah route lainnya untuk admin di sini
    });

Route::middleware(['auth', 'role:user'])
    ->prefix('dashboard/user')
    ->name('dashboard.user.')
    ->group(function () {
        Route::get('/', fn () => Inertia::render('dashboard/user/index'))->name('index');
        // Tambah route lainnya untuk user di sini
    });

Route::middleware(['auth', 'role:monitor'])
    ->prefix('dashboard/monitor')
    ->name('dashboard.monitor.')
    ->group(function () {
        Route::get('/', fn () => Inertia::render('dashboard/monitor/index'))->name('index');
        // Tambah route lainnya untuk monitor di sini
    });


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
