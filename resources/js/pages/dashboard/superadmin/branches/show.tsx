import React, { useEffect, useState, useCallback } from "react";
import { router, usePage } from "@inertiajs/react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

import AppSidebar from "@/layouts/app-layout";
import BoardColumn from "@/components/boards/board-column";
import AddBoardModal from "@/components/boards/add-board-modal";
import AddTaskModal from "@/components/boards/add-task-modal";

// ===== Types =====
interface Task {
  id: number;
  title: string;
  board_id: number;
}

interface Board {
  id: number;
  name: string;
  tasks: Task[];
}

interface Branch {
  id: number;
  name: string;
}

interface PageProps {
  branch: Branch;
  boards: Board[];
}

const BranchShowPage: React.FC = () => {
  const { props } = usePage<PageProps>();
  const { branch, boards: initialBoards } = props;

  const [boards, setBoards] = useState<Board[]>([]);
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);

  useEffect(() => {
    setBoards(initialBoards);
  }, [initialBoards]);

  const handleDragEnd = useCallback((result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const sourceIndex = boards.findIndex(b => b.id.toString() === source.droppableId);
    const destIndex = boards.findIndex(b => b.id.toString() === destination.droppableId);
    if (sourceIndex === -1 || destIndex === -1) return;

    const task = boards[sourceIndex].tasks.find(t => t.id.toString() === draggableId);
    if (!task) return;

    const updatedBoards = [...boards];
    const sourceTasks = [...updatedBoards[sourceIndex].tasks];
    sourceTasks.splice(source.index, 1);

    const destTasks = [...updatedBoards[destIndex].tasks];
    destTasks.splice(destination.index, 0, task);

    updatedBoards[sourceIndex] = { ...updatedBoards[sourceIndex], tasks: sourceTasks };
    updatedBoards[destIndex] = { ...updatedBoards[destIndex], tasks: destTasks };

    setBoards(updatedBoards);

    router.put(
      route("superadmin.tasks.move", { task: task.id }),
      { to_board_id: updatedBoards[destIndex].id },
      {
        preserveScroll: true,
        onError: () => setBoards(boards), // rollback on failure
      }
    );
  }, [boards]);

  const openAddTaskModal = (boardId: number) => {
    setSelectedBoardId(boardId);
    setShowAddTaskModal(true);
  };

  const handleTaskAdded = (newTask: Task) => {
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === newTask.board_id
          ? { ...board, tasks: [...board.tasks, newTask] }
          : board
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AppSidebar>
        <main className="flex-1 p-6 overflow-x-hidden">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-700">
              Cabang: {branch.name}
            </h1>
            <button
              onClick={() => setShowAddBoardModal(true)}
              className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            >
              + Tambah Board
            </button>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {boards.map((board) => (
                <BoardColumn
                  key={board.id}
                  board={board}
                  tasks={board.tasks}
                  onAddTask={() => openAddTaskModal(board.id)}
                />
              ))}
            </div>
          </DragDropContext>
        </main>

        <AddBoardModal
          isOpen={showAddBoardModal}
          onClose={() => setShowAddBoardModal(false)}
          branchId={branch.id}
        />

        <AddTaskModal
          isOpen={showAddTaskModal}
          onClose={() => setShowAddTaskModal(false)}
          boardId={selectedBoardId}
          onTaskAdded={handleTaskAdded}
        />
      </AppSidebar>
    </div>
  );
};

export default BranchShowPage;
