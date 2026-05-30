import Link from "next/link";

interface Props {
  titulo: string;
  intro: string;
}

export default function CuidatePlaceholder({ titulo, intro }: Props) {
  return (
    <div className="theme-cuidate ph-root">
      <main className="ph-wrap">
        <Link href="/cuidate" className="back">
          ← Volver
        </Link>

        <h1>{titulo}</h1>
        <p className="lead">{intro}</p>

        <div className="placeholder">
          <p>
            Estamos construyendo este contenido junto a una ONG amiga.{" "}
            <strong>Vuelve pronto.</strong>
          </p>
          <p className="fine">
            Mientras tanto, en cualquier CESFAM puedes preguntar por testeo
            gratuito de VIH y hepatitis C. La pregunta no se anota en ningún
            lugar y no te juzgan.
          </p>
        </div>

        <footer>
          <p className="firma">Diseñado por Operaria</p>
        </footer>
      </main>

      <style>{`
        .ph-root {
          min-height: 100vh;
          background:
            radial-gradient(ellipse at 30% 0%, rgba(255, 92, 138, 0.10), transparent 50%),
            linear-gradient(180deg, var(--cuidate-noche-deep) 0%, var(--cuidate-noche) 100%);
          background-attachment: fixed;
          color: var(--cuidate-offwhite);
          font-family: var(--font-jakarta), "Plus Jakarta Sans", system-ui, sans-serif;
          line-height: 1.6;
          padding: 32px 22px 80px;
        }
        .ph-wrap {
          max-width: 560px;
          margin: 0 auto;
        }
        .back {
          display: inline-block;
          font-family: var(--font-dm-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(242, 232, 224, 0.62);
          text-decoration: none;
          margin-bottom: 28px;
          transition: color 0.18s;
        }
        .back:hover {
          color: var(--cuidate-magenta);
        }
        h1 {
          font-family: var(--font-cormorant), serif;
          font-style: italic;
          font-weight: 500;
          font-size: 42px;
          line-height: 1.08;
          margin-bottom: 12px;
          color: var(--cuidate-offwhite);
        }
        .lead {
          font-size: 18px;
          color: var(--cuidate-magenta);
          margin-bottom: 32px;
          font-family: var(--font-cormorant), serif;
          font-style: italic;
        }
        .placeholder {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          padding: 28px 24px;
          border-radius: 18px;
          box-shadow:
            0 12px 40px rgba(13, 7, 25, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.22);
        }
        .placeholder p {
          font-size: 16px;
          color: rgba(242, 232, 224, 0.92);
          margin-bottom: 14px;
        }
        .placeholder p strong {
          color: var(--cuidate-offwhite);
        }
        .placeholder p.fine {
          font-size: 14px;
          color: rgba(242, 232, 224, 0.65);
          margin-bottom: 0;
          line-height: 1.55;
        }
        footer {
          margin-top: 38px;
          padding-top: 22px;
          border-top: 1px solid rgba(255, 255, 255, 0.10);
        }
        .firma {
          font-family: var(--font-cormorant), serif;
          font-style: italic;
          font-size: 13px;
          color: rgba(232, 184, 114, 0.55);
        }
      `}</style>
    </div>
  );
}
