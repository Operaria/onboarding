export default function Home() {
  return (
    <main
      className="theme-paraguas min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center"
      style={{ backgroundColor: "#EDEAE3", color: "#132649" }}
    >
      <h1
        className="font-display font-light uppercase leading-none text-[52px] sm:text-[76px]"
        style={{ letterSpacing: "0.28em", color: "#132649", marginRight: "-0.28em" }}
      >
        Operaria
      </h1>

      <p
        className="font-mono uppercase text-[11px] mt-6"
        style={{ letterSpacing: "0.22em", color: "#1F5B57" }}
      >
        Encuestas e instrumentos
      </p>

      <div
        className="my-12"
        style={{ width: "56px", height: "2px", backgroundColor: "#D7806A" }}
      />

      <h2
        className="font-display font-light text-[32px] sm:text-[46px] leading-[1.15] max-w-2xl"
        style={{ letterSpacing: "0.015em" }}
      >
        Levantamientos que se responden,
        <br className="hidden sm:block" /> se puntúan y{" "}
        <span style={{ color: "#1F5B57", fontStyle: "italic" }}>vuelven informe.</span>
      </h2>

      <p
        className="text-[14px] mt-9 max-w-md leading-relaxed font-mono font-light"
        style={{ color: "#586577", letterSpacing: "0.01em" }}
      >
        La plataforma de encuestas e instrumentos de Operaria. Cada levantamiento
        llega como un link único y devuelve un informe listo.
      </p>

      <p
        className="font-mono uppercase text-[10px] mt-16"
        style={{ letterSpacing: "0.22em", color: "#586577" }}
      >
        Diseñado por Operaria
      </p>
    </main>
  );
}
