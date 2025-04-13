import { useState } from "react";
import { X } from "lucide-react";

export default function AddCardModal({ closeModal, handleAddCard }) {
  const [cardName, setCardName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardName || isNaN(initialBalance) || initialBalance < 0) return;

    handleAddCard(cardName, parseFloat(initialBalance));
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg">
      <div className="bg-black/30 border border-white/20 rounded-2xl shadow-lg p-6 w-96 text-white backdrop-blur-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Card</h2>
          <button onClick={closeModal} className="hover:bg-red-500/30 p-1 rounded-full transition">
            <X size={24} color="white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="p-2 bg-black/40 border border-white/30 rounded-lg text-white outline-none"
            placeholder="Card Name (e.g. Business, Crypto)"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />

          <input
            type="number"
            className="p-2 bg-black/40 border border-white/30 rounded-lg text-white outline-none"
            placeholder="Initial Balance"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
          />

          <div className="flex justify-between mt-2 gap-4">
            <button
              className="bg-blue-500 text-white p-2 rounded-lg w-1/2 hover:bg-blue-600 transition"
              type="submit"
            >
              Add
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded-lg w-1/2 hover:bg-gray-600 transition"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
