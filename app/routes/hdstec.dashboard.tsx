import { json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getDashboardStats, hdTickets } from '~/lib/hdstec/data';

export async function loader({ request }: LoaderFunctionArgs) {
  // Apenas garante que o usuário está autenticado reutilizando o layout (sem lógica extra).
  return json({ stats: getDashboardStats(), recent: hdTickets.slice(0, 5) });
}

export default function HdDashboard() {
  const { stats, recent } = useLoaderData<typeof loader>();

  const cards = [
    { label: 'Chamados totais', value: stats.total, color: 'bg-blue-600' },
    { label: 'Em andamento', value: stats.andamento, color: 'bg-amber-500' },
    { label: 'Resolvidos', value: stats.resolvidos, color: 'bg-emerald-500' },
    { label: 'Vencidos (SLA)', value: stats.vencidos, color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className={`${card.color} rounded-2xl text-white p-5 shadow-lg`}>
            <p className="text-sm text-white/80">{card.label}</p>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </article>
        ))}
      </section>

      <section className="bg-white rounded-2xl shadow border border-slate-100">
        <header className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">Últimos chamados</h3>
          <p className="text-sm text-slate-500">Monitoramento rápido das solicitações mais recentes.</p>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Título</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Solicitante</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Prioridade</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Técnico</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Abertura</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((ticket) => (
                <tr key={ticket.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-mono text-slate-600">{ticket.id}</td>
                  <td className="px-4 py-3">{ticket.titulo}</td>
                  <td className="px-4 py-3">{ticket.solicitante}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{ticket.prioridade}</td>
                  <td className="px-4 py-3">{ticket.tecnico ?? '—'}</td>
                  <td className="px-4 py-3">{ticket.abertura}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
