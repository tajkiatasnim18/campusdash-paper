import { Link, Navigate, useNavigate, useParams } from "react-router";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { PortalProvider } from "@/components/portal/portal-context";
import { ROLE_MODULES } from "@/components/portal/registry";
import { getModule, getRole, PORTAL_ROLES } from "@/lib/portal";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const splat = params["*"] ?? "";
  const [rawRole, rawModule] = splat.split("/");

  const validRole = getRole(rawRole);
  if (rawRole && !validRole) {
    return <Navigate to="/dashboard/student" replace />;
  }

  const role = validRole ?? getRole("student")!;
  const module = getModule(role, rawModule);
  if (rawModule && rawModule !== module.id) {
    return <Navigate to={`/dashboard/${role.key}/${module.id}`} replace />;
  }

  const Page = ROLE_MODULES[role.key]?.[module.id];
  const active = role.modules.findIndex((m) => m.id === module.id);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Portal masthead */}
      <header className="border-b border-ink/60 bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold tracking-tight text-ink">
              Campus<span className="text-newsprint">Dash</span>
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft sm:inline">
              {role.sub} · {module.label}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft md:inline">
              {user?.email ?? "Signed in"}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-sm border-ink/40 bg-transparent font-mono text-[10px] uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-paper"
              onClick={handleSignOut}
            >
              <LogOut className="size-3.5" />
              Sign out
            </Button>
          </div>
        </div>
        <div className="border-t border-ink/40">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft sm:px-6">
            <span>Portal edition — one login, four desks</span>
            <span className="hidden sm:inline">Role identified → workspace opened</span>
          </div>
        </div>
      </header>

      {/* Role bar */}
      <div className="border-b border-ink/60 bg-sheet">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex items-stretch gap-1 overflow-x-auto" aria-label="Role switcher">
            {PORTAL_ROLES.map((r) => (
              <Link
                key={r.key}
                to={`/dashboard/${r.key}`}
                className={cn(
                  "flex shrink-0 items-center gap-2 border-x border-transparent px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors sm:px-5",
                  r.key === role.key
                    ? "border-x-ink/30 bg-ink text-paper"
                    : "text-ink-soft hover:bg-muted hover:text-ink",
                )}
              >
                {r.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <PortalProvider>
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[230px_1fr]">
            {/* Module sidebar — table of contents */}
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <p className="kicker">The {role.label} desk</p>
              {/* mobile: horizontal chips */}
              <div className="mt-3 flex gap-1.5 overflow-x-auto pb-2 lg:hidden">
                {role.modules.map((m, i) => (
                  <Link
                    key={m.id}
                    to={`/dashboard/${role.key}/${m.id}`}
                    className={cn(
                      "shrink-0 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                      m.id === module.id ? "border-ink bg-ink text-paper" : "border-ink/30 bg-sheet text-ink-soft hover:bg-muted",
                    )}
                  >
                    {i + 1}. {m.label}
                  </Link>
                ))}
              </div>
              {/* desktop: numbered list */}
              <ul className="mt-3 hidden space-y-0.5 lg:block">
                {role.modules.map((m, i) => (
                  <li key={m.id}>
                    <Link
                      to={`/dashboard/${role.key}/${m.id}`}
                      className={cn(
                        "flex items-center gap-2.5 border-l-2 px-3 py-2 text-[12.5px] transition-colors",
                        m.id === module.id
                          ? "border-ink bg-sheet text-ink"
                          : "border-transparent text-ink-soft hover:border-ink/40 hover:bg-muted hover:text-ink",
                      )}
                    >
                      <span className="font-mono text-[10px] text-ink-soft">{i + 1}.</span>
                      <m.icon className={cn("size-3.5 shrink-0", m.id === module.id ? "text-newsprint" : "text-ink/40")} />
                      {m.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 hidden border border-dashed border-ink/40 bg-paper/60 p-3 lg:block">
                <p className="font-mono text-[9.5px] uppercase leading-4 tracking-[0.12em] text-ink-soft">
                  {role.label === "Event Host"
                    ? "Hosts are students — the Student Section stays available alongside this desk."
                    : `Module ${active + 1} of ${role.modules.length} in the ${role.sub}.`}
                </p>
              </div>
            </aside>

            {/* Content */}
            <div className="min-w-0">{Page ? <Page /> : null}</div>
          </div>

          <p className="mt-14 border-t border-ink/30 pt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            Demo runs on seeded data — every module swaps for a Convex table when the backend is wired.
          </p>
        </main>
      </PortalProvider>
    </div>
  );
}
