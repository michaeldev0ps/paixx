import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>PAIXX | Luxury Streetwear</title>
        <meta
          name="description"
          content="PAIXX is a premium luxury fashion experience built for editorial streetwear storytelling."
        />
        <link rel="stylesheet" href="/static/styles.css" />
      </Head>

      <div className="page-shell">
        <main className="hero">
          <section className="hero-copy">
            <p className="eyebrow">PAIXX</p>
            <h1>Wear the War. Earn the Peace.</h1>
            <p className="hero-text">
              A premium luxury streetwear platform designed for editorial
              collections, bold motion, and immersive storytelling.
            </p>
          </section>

          <aside className="hero-panel">
            <div className="panel-card">
              <span>Editorial collections</span>
              <p>
                Launch with high-contrast visuals, minimal motion, generous
                spacing, and refined typography.
              </p>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
