import { useState } from "react";

export default function TransactionModal({ closeModal, handleTransaction, cards }) {
    const [type, setType] = useState("income");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [fromAccount, setFromAccount] = useState(cards[0]?.type || "");
    const [toAccount, setToAccount] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!amount || amount <= 0) return;
      if (type === "transfer" && !toAccount) return;
  
      handleTransaction(type, parseFloat(amount), category, fromAccount, toAccount);
      closeModal();
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg">
        <div className="bg-black/30 border border-white/20 rounded-2xl shadow-lg p-6 w-96 text-white backdrop-blur-md">
          {/* ... modal header ... */}
  
          <form onSubmit={handleSubmit}>
            {/* ... type selector ... */}
  
            {/* Dynamic From Account */}
            <select
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              className="p-2 bg-black/40 border border-white/30 rounded-lg text-white outline-none"
            >
              {cards.map(card => (
                <option key={card.type} value={card.type}>{card.name}</option>
              ))}
            </select>
  
            {/* Dynamic To Account (for transfers) */}
            {type === "transfer" && (
              <select
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                className="p-2 bg-black/40 border border-white/30 rounded-lg text-white outline-none"
              >
                <option value="">Select Account</option>
                {cards
                  .filter(card => card.type !== fromAccount)
                  .map(card => (
                    <option key={card.type} value={card.type}>{card.name}</option>
                  ))}
              </select>
            )}
  
            {/* ... rest of the form ... */}
          </form>
        </div>
      </div>
    );
  }