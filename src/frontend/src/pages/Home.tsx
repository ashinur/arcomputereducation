import { Link } from "@tanstack/react-router";
import {
  Barcode,
  CheckCircle2,
  Cloud,
  Database,
  FileSpreadsheet,
  ReceiptText,
  ScanLine,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Users,
} from "lucide-react";

const capabilities = [
  {
    icon: FileSpreadsheet,
    title: "Excel-first setup",
    description:
      "Start from the product and pricing structure small businesses already maintain in Excel.",
  },
  {
    icon: Smartphone,
    title: "Installable mobile PWA",
    description:
      "Staff can add the app to a phone home screen and run checkout in a standalone mobile experience.",
  },
  {
    icon: ScanLine,
    title: "Camera barcode scanning",
    description:
      "Scan known products instantly, or create a missing product when a barcode is not recognized.",
  },
  {
    icon: ShoppingCart,
    title: "Cash checkout flow",
    description:
      "Build a cart, adjust quantities, select a customer, record cash received, and calculate change.",
  },
  {
    icon: Database,
    title: "Free-tier cloud database",
    description:
      "Supabase stores products, orders, purchases, contacts, and stock movements for the whole team.",
  },
  {
    icon: Cloud,
    title: "Power Query sync",
    description:
      "Excel can refresh order and line-item data from the database API with no manual re-entry.",
  },
];

const setupSteps = [
  "Upload or map the existing Excel POS workbook structure.",
  "Create the free Supabase project and run the generated setup script.",
  "Deploy the static PWA to Netlify or Cloudflare Pages.",
  "Install the app on staff phones and complete the first sale.",
  "Connect Excel Power Query and refresh sales whenever reports are needed.",
];

const requirements = [
  "Product catalog with categories, images, prices, stock, and reorder levels",
  "Sales and purchase history with order line items",
  "Customer and vendor contact records",
  "Low-stock visibility and stock movement audit trail",
  "Email/password login for concurrent team use",
  "Printable or shareable receipts after checkout",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.35),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.28),_transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
              <Barcode size={16} /> Mobile POS from Excel in under 30 minutes
            </span>
            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Turn an Excel POS spreadsheet into a real mobile checkout app.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Mobile POS connects a lightweight installable web app to a
              free-tier cloud database, then lets Excel pull every transaction
              back through Power Query for reporting and taxes.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 shadow-xl shadow-cyan-950/40 transition hover:bg-cyan-300"
              >
                Request a setup guide
              </Link>
              <a
                href="#workflow"
                className="rounded-2xl border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                See the workflow
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-slate-900 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Current sale</p>
                  <h2 className="text-2xl font-bold">Counter checkout</h2>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-200">
                  Synced
                </span>
              </div>
              <div className="space-y-3">
                {[
                  ["Milk 1L", "2 × $3.25"],
                  ["Bread", "1 × $2.80"],
                  ["Coffee Beans", "1 × $9.50"],
                ].map(([name, value]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-2xl bg-white/8 p-4"
                  >
                    <span>{name}</span>
                    <span className="font-bold text-cyan-100">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-cyan-400 p-5 text-slate-950">
                <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-wide">
                  <span>Total</span>
                  <ReceiptText size={18} />
                </div>
                <div className="mt-2 text-4xl font-black">$18.80</div>
                <p className="mt-3 text-sm font-medium">
                  Cash received: $20.00 · Change due: $1.20
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["$0", "Runs on free hosting and database tiers"],
              ["0", "Manual sales re-entry steps after Power Query refresh"],
              ["95%+", "Target known-product barcode scan success rate"],
            ].map(([metric, label]) => (
              <div key={metric} className="rounded-3xl border p-6 shadow-sm">
                <div className="text-4xl font-black text-cyan-700">
                  {metric}
                </div>
                <p className="mt-2 text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 text-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl">
            <p className="font-bold uppercase tracking-[0.3em] text-cyan-700">
              V1 capabilities
            </p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Everything a small shop needs to start ringing up sales.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-3xl bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-white py-20 text-slate-900">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="font-bold uppercase tracking-[0.3em] text-cyan-700">
              Workflow
            </p>
            <h2 className="mt-3 text-4xl font-black">
              From spreadsheet to first sale in five guided steps.
            </h2>
            <ol className="mt-8 space-y-4">
              {setupSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-2xl bg-slate-50 p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl bg-slate-900 p-8 text-white">
            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck className="text-cyan-300" />
              <h3 className="text-2xl font-bold">Security and ownership</h3>
            </div>
            <p className="leading-8 text-slate-300">
              Store data lives in the business owner&apos;s Supabase project
              with row-level access controls for authenticated team members.
              Excel remains the familiar reporting layer, and records stay
              exportable instead of locked inside a proprietary POS system.
            </p>
            <div className="mt-8 grid gap-3">
              {requirements.map((item) => (
                <div key={item} className="flex gap-3 text-slate-200">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-emerald-300"
                    size={18}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-sm text-slate-300">
              <Users className="text-cyan-300" size={20} />
              V1 uses equal access for all authenticated staff; role-based
              permissions are planned as a future enhancement.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
