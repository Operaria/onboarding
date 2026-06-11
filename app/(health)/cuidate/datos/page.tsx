import Link from "next/link";

export const metadata = {
  title: "Política de uso de datos · Cuídate · Operaria",
  description:
    "Cómo Cuídate maneja tus datos: ningún dato, ningún registro, ningún rastreo.",
  robots: { index: false, follow: false },
};

export default function DatosPage() {
  return (
    <div className="theme-cuidate datos-root">
      <main className="datos-wrap">
        <Link href="/cuidate" className="back">
          ← Volver
        </Link>

        <h1>Política de uso de datos</h1>
        <p className="lead">
          Cuídate está hecha para acompañarte sin pedirte nada. Esto es lo que
          eso significa, en palabras simples.
        </p>

        <section>
          <h2>No te pedimos datos</h2>
          <p>
            No te pedimos correo, teléfono, nombre, fecha de nacimiento, ni
            ningún tipo de identificación. No tienes que crear una cuenta para
            usar esta app.
          </p>
        </section>

        <section>
          <h2>Tus respuestas viven solo en tu navegador</h2>
          <p>
            Cuando respondes las preguntas, las respuestas quedan en la memoria
            de tu navegador para que la app pueda darte consejo a tu medida.
            <strong> Nunca salen de tu dispositivo.</strong> No las enviamos a
            ningún servidor, no las guardamos en una base de datos, no las
            compartimos con nadie.
          </p>
          <p>
            Cuando cierras la pestaña, esas respuestas se borran. La próxima vez
            que abras la app, partes de cero.
          </p>
        </section>

        <section>
          <h2>No usamos cookies de seguimiento</h2>
          <p>
            No instalamos cookies de rastreo, no usamos Google Analytics, no
            tenemos píxeles de redes sociales, no compartimos información con
            terceros. Nadie va a saber que abriste esta app.
          </p>
        </section>

        <section>
          <h2>Si pides ayuda en una emergencia</h2>
          <p>
            El botón &quot;Tengo una urgencia&quot; te muestra qué hacer en una
            sobredosis y un número público de Salud Responde (600 360 7777).
            Si haces clic para llamar, esa llamada la maneja tu teléfono y la
            atiende el servicio público; nosotros no intervenimos ni
            registramos esa acción.
          </p>
        </section>

        <section>
          <h2>Por qué es así</h2>
          <p>
            Porque la información que necesitas estar bien no puede depender de
            que tengas que entregar tu identidad a cambio. La privacidad acá no
            es un favor que te hacemos — es un requisito del cuidado.
          </p>
        </section>

        <footer>
          <p className="contacto">
            Si tienes dudas o crees que esto debería decir algo distinto,
            escríbenos a <a href="mailto:hola@operaria.cl">hola@operaria.cl</a>.
          </p>
          <p className="firma">Diseñado por Operaria</p>
        </footer>
      </main>

      <style>{`
        .datos-root {
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
        .datos-wrap {
          max-width: 640px;
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
          font-size: 38px;
          line-height: 1.1;
          margin-bottom: 12px;
          color: var(--cuidate-offwhite);
        }
        .lead {
          font-size: 17px;
          color: rgba(242, 232, 224, 0.88);
          margin-bottom: 28px;
        }
        section {
          margin-bottom: 26px;
        }
        h2 {
          font-family: var(--font-syne), sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: var(--cuidate-magenta);
          margin-bottom: 8px;
          letter-spacing: -0.005em;
        }
        section p {
          font-size: 15px;
          color: rgba(242, 232, 224, 0.82);
          margin-bottom: 10px;
        }
        section p strong {
          color: var(--cuidate-offwhite);
        }
        footer {
          margin-top: 38px;
          padding-top: 22px;
          border-top: 1px solid rgba(255, 255, 255, 0.10);
        }
        .contacto {
          font-size: 13px;
          color: rgba(242, 232, 224, 0.62);
          margin-bottom: 8px;
        }
        .contacto a {
          color: var(--cuidate-dorado);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .firma {
          font-family: var(--font-cormorant), serif;
          font-style: italic;
          font-size: 13px;
          color: rgba(232, 184, 114, 0.55);
          margin-top: 12px;
        }
      `}</style>
    </div>
  );
}
