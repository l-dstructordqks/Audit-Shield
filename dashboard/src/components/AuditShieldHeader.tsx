export const AuditShieldHeader = () => (
  <header className="w-full px-8 pt-12 pb-8">

    {/* Eyebrow tag */}
    <div className="flex items-center gap-2 mb-4">
      <div className="h-px w-8 bg-red-500" />
      <span
        className="text-xs font-mono tracking-[0.2em] uppercase text-red-500"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        Supply Chain Intelligence & Behavioral Network Analysis
      </span>
    </div>

    {/* Main title */}
    <h1
      className="text-5xl font-black tracking-tight text-gray-900 leading-none mb-4"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      Audit <span className="text-red-500">- Shield</span>
    </h1>

    {/* Description */}
    <div
      className="flex flex-col gap-2 max-w-lg"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <p className="text-sm text-gray-500 leading-relaxed">
        Paste or upload your{" "}
        <code className="text-gray-700 bg-gray-100 px-1 rounded text-xs">
          requirements.txt
        </code>{" "}
        to scan your dependencies for CVEs, outdated packages, and supply chain
        risks — powered by{" "}
        <a
          href="https://osv.dev"
          target="_blank"
          rel="noreferrer"
          className="text-red-500 hover:underline"
        >
          OSV.dev
        </a>
        .
      </p>
      <p className="text-sm text-gray-500 leading-relaxed">
        Upload a traffic{" "}
        <code className="text-gray-700 bg-gray-100 px-1 rounded text-xs">
          .csv
        </code>{" "}
        to detect behavioral anomalies using a statistical baseline —
        the{" "}
        <span className="text-gray-700 font-medium">Digital Twin of Traffic</span>
        .
      </p>
    </div>

  </header>
);

