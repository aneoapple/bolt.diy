import { json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { reportByStatus, reportByCategory, getDashboardStats } from '~/lib/hdstec/data';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({ status: reportByStatus, category: reportByCategory, stats: getDashboardStats() });
}

export default function HdReportsPage() {
  const { status, category, stats } = useLoaderData<typeof loader>();

  const cards = [
    { label: 'Chamados totais', value: stats.total },
    { label: 'Em andamento', value: stats.andamento },
    { label: 'Resolvidos', value: stats.resolvidos },
    { label: 'Vencidos', value: stats.vencidos },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="bg-white rounded-2xl border border-slate-100 shadow p-5">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="text-3xl font-bold mt-2 text-slate-900">{card.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-2xl shadow border border-slate-100">
          <header className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900">Chamados por status</h3>
            <p className="text-sm text-slate-500">Visão rápida do funil de atendimento.</p>
          </header>
          <table className="w-full text-sm">
            <tbody>
              {status.map((item) => (
                <tr key={item.categoria} className="border-t border-slate-100">
                  <td className="px-6 py-4 font-medium text-slate-700">{item.categoria}</td>
                  <td className="px-6 py-4 text-right text-slate-500">{item.quantidade} registros</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl shadow border border-slate-100">
          <header className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900">Chamados por categoria</h3>
            <p className="text-sm text-slate-500">Rede, Hardware, Software, etc.</p>
          </header>
          <table className="w-full text-sm">
            <tbody>
              {category.map((item) => (
                <tr key={item.categoria} className="border-t border-slate-100">
                  <td className="px-6 py-4 font-medium text-slate-700">{item.categoria}</td>
                  <td className="px-6 py-4 text-right text-slate-500">{item.quantidade} chamados</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
