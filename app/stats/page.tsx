import 'boxicons/css/boxicons.min.css';
import { headers } from "next/headers";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eco Kitty",
    description: "Purrfect for the planet",
  };
  
  function NavButton({ href, icon, label }: { href: string; icon: string; label: string }) {
    const headersList = headers();
    const pathname = headersList.get("x-invoke-path") || "";
    const isActive = pathname === href;
  
    return (
      <Link href={href}>
        <button
          className={`px-6 py-3 rounded-full flex items-center text-lg font-bold ${
            isActive ? 'bg-gray-300' : 'bg-gray-200'
          }`}
        >
          <i className={`bx ${icon} mr-2 bx-sm`}></i>
          {label}
        </button>
      </Link>
    );
  }

const Stats = () => {
    return (
        <>
        <html lang="en">
            <body
                className={`antialiased bg-white min-h-screen`}
            >
                <div className="max-w-3xl mx-auto p-4">
                <div className="flex flex-col items-center justify-between mb-6">
                    <div className="flex flex-row items-center">
                    <img
                        className="w-24 h-24"
                        src="/kitty2.png"
                        alt="Eco Kitty Logo"
                    />
                    <h1 className="text-3xl font-bold text-green-600 ml-4">Eco Kitty</h1>
                    </div>
                    <p className="text-green-600 italic">purrfect for the planet</p>
                </div>
                <main className="bg-green-100 rounded-lg p-4 border-2">
                    <nav className="flex justify-between mb-4 w-full">
                    <NavButton href="/stats" icon="bx-bar-chart" label="stats" />
                    <NavButton href="/chat" icon="bx-chat" label="chat" />
                    <NavButton href="/scan" icon="bx-qr-scan" label="scan" />
                    </nav>
                    {//put component here
                    }
                </main>
                </div>
            </body>
            </html>
        </>
    )
}

export default Stats;