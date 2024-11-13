import React from "react";
import { useState } from "react";
interface ModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addSubject: (newDetail: {
    Sub_name: string;
    target_percentage: number;
    attended: number;
    total: number;
  }) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setOpen, addSubject }) => {
  const initialDetails = {
    attended: 0,
    total: 0,
    Sub_name: "",
    target_percentage: 75,
  };
  const [details, setDetails] = useState(initialDetails);
  const addSub = () => {
    if (!details.attended) {
      details.attended = 0;
    }
    if (!details.total) {
      details.total = details.attended;
    }
    if (details.attended > details.total) {
      details.total = details.attended;
    }
    addSubject(details);
    setDetails(initialDetails);
    setOpen(false);
  };
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
      <div className="p-6 rounded-lg shadow-lg w-80 bg-[#1F222B]">
        <h2 className="text-lg font-semibold text-foreground">Add Subject</h2>
        <div className="mt-4">
          <label className="block text-muted-foreground" htmlFor="subject-name">
            Subject Name:
          </label>
          <input
            type="text"
            id="subject-name"
            value={details.Sub_name}
            onChange={(e) =>
              setDetails({ ...details, Sub_name: e.target.value })
            }
            placeholder="Eg. Data structures"
            className="mt-1 p-2 border border-black rounded w-full text-black"
          />
        </div>
        <div className="mt-4">
          <label
            className="block text-muted-foreground"
            htmlFor="total-classes"
          >
            Total Classes:
          </label>
          <input
            type="number"
            id="total-classes"
            value={details.total}
            onChange={(e) =>
              setDetails({
                ...details,
                total: Math.max(0, parseInt(e.target.value)),
              })
            }
            className="mt-1 p-2 border border-black rounded w-full text-black"
          />
        </div>
        <div className="mt-4">
          <label className="block text-muted-foreground" htmlFor="present">
            Present:
          </label>
          <input
            type="number"
            id="present"
            value={details.attended}
            onChange={(e) => {
              setDetails({
                ...details,
                attended: Math.max(
                  0,
                  Math.min(details.total, parseInt(e.target.value))
                ),
              });
            }}
            className="mt-1 p-2 border border-black rounded w-full text-black"
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setOpen(false)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/80 p-2 rounded bg-[#730202]"
          >
            CANCEL
          </button>
          <button
            onClick={addSub}
            className="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded bg-[#008315]"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
