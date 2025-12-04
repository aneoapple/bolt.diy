import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, NavLink, Outlet, useLoaderData, useLocation } from '@remix-run/react';
import { requireHdUser } from '~/lib/hdstec/session.server';

const menuItems = [
  { label: 'Dashboard', to: '/hdstec/dashboard' },
  { label: 'Chamados', to: '/hdstec/chamados' },
  { label: 'Periféricos', to: '/hdstec/perifericos' },
  { label: 'Usuários', to: '/hdstec/usuarios' },
  { label: 'Técnicos', to: '/hdstec/tecnicos' },
  { label: 'Relatórios', to: '/hdstec/relatorios' },
  { label: 'Configurações', to: '/hdstec/configuracoes' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireHdUser(request);
  return json({ user });
}

export default function HdLayout() {
  const { user } = useLoaderData<typeof loader>();
  const location = useLocation();
  const activeItem = menuItems.find((item) => location.pathname.startsWith(item.to));

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-sm uppercase tracking-wide text-blue-300">HDSTEC</p>
          <h1 className="text-xl font-semibold">Central de Chamados</h1>
          <p className="text-xs text-white/70">Controle total do suporte corporativo</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-white text-slate-900 shadow'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`
              }
              prefetch="intent"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 text-sm space-y-1">
          <p className="font-semibold">{user.nome}</p>
          <p className="text-white/70">{user.perfil}</p>
          <Form method="post" action="/hdstec/logout">
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-white/10 py-2 text-white text-sm font-semibold hover:bg-white/20"
            >
              Sair
            </button>
          </Form>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b flex flex-col gap-1 px-10 py-6">
          <p className="text-sm text-slate-500">HDSTEC – Central de Chamados de TI</p>
          <h2 className="text-2xl font-semibold text-slate-900">{activeItem?.label ?? 'Visão Geral'}</h2>
        </header>
        <main className="flex-1 p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
