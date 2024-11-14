import React from "react";
import { GrUndo } from "react-icons/gr";
import { GrRedo } from "react-icons/gr";

const UndoRedo = ({ handleUndo, handleRedo }) => {
  return (
    <>
      <div className="flex items-center justify-center p-10 gap-10">
        <button onClick={handleUndo}>
          <GrUndo className="text-3xl" />
          Undo
        </button>
        <button onClick={handleRedo}>
          <GrRedo className="text-3xl" />
          Redo
        </button>
      </div>
      <hr className="bg-zinc-900 h-[2px]" />
    </>
  );
};

export default UndoRedo;
