import { Plus } from "lucide-react";

export default function FloatingButton({ onClick, icon }) {
  return (
    <button onClick={onClick} className="absolute rounded-full p-3 border-white/40 border hover:scale-110 duration-300 hover:rotate-90 transition-all right-5 bottom-5 dark:bg-black/80 text-white bg-white/60 ">
      <Plus color="white" size={25} />
    </button>
  );
}
