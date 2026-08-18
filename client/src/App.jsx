import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/ChatWindow";

function App() {
  return (
    <div className="flex min-h-screen bg-[#212121]
     text-white">
      <div className="bg-amber-200 h-full">
        <aside className="hidden w-64 shrink-0
       bg-[#171717]
       text-white sm:flex
        justify-center
        min-h-screen
       ">
          <Sidebar />
        </aside>
      </div>
      <main className="flex-1 min-w-0 bg-[#212121]
       text-white mx-auto">
        <Main />
      </main>
    </div>
  );
}

export default App;