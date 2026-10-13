import { Head } from "$fresh/runtime.ts";

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Sign In | PA IXX</title>
        <meta
          name="description"
          content="Sign in to PA IXX for order tracking, account management, and exclusive editorial access."
        />
        <link rel="stylesheet" href="/static/styles.css" />
      </Head>

      <div className="page-shell">
        <main className="hero" style={{ gridTemplateColumns: "1fr" }}>
          <section className="hero-copy">
            <p className="eyebrow">Sign In</p>
            <h1>Member access for the PA IXX experience.</h1>
            <p className="hero-text">
              This page is designed as the first auth step in the Deno Fresh
              prototype. It can be connected to Supabase auth and customer
              session handling in the next validation phase.
            </p>
          </section>

          <aside className="hero-panel">
            <form className="panel-card" method="POST" action="/signin">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                />
              </label>
              <button type="submit">Continue</button>
            </form>
          </aside>
        </main>
      </div>
    </>
  );
}
