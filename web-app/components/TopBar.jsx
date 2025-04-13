import DotPattern from "./DotPatterns";

export default function TopBar({ children }) {
  return (
    <header className="border rounded-4xl bg-black text-white/70 p-3 border-white/40">
      <h1 className="text-white/90 font-semibold p-3 text-2xl font-mono">
        Available Balance:
      </h1>
      <ul className="flex gap-1 flex-wrap">{children}</ul>
    </header>
  );
}

export function BalanceCard({
  title,
  amount,
  icon,
  details_1,
  details_2,
  overview,
}) {
  return (
    <li className="border border-white/30 py-2 px-6 my-3 mx-2 max-w-full rounded-xl flex items-center gap-0 flex-col sm:flex-row sm:items-start">
      <div className="w-full">
        <div className="flex justify-between gap-8 sm:flex-row flex-col">
          <div className="flex gap-1">
            {icon}
            <p className="font-light">{title}</p>
          </div>
          <div className="relative">
            <DotPattern/>
            <p className={`${overview >= 0 ? "text-green-400" : "text-red-400"} absolute inset-0 text-md flex items-center justify-center font-semibold `}>
              {overview}%
            </p>
          </div>
        </div>

        <p className="text-2xl font-bold text-white font-mono p-3">₹ {amount}</p>
        <div className="flex justify-between sm:flex-row flex-col font-light text-sm sm:text-base">
          <p>{details_1}</p>
          <p>{details_2}</p>
        </div>
      </div>
    </li>
  );
}
