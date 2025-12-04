import { json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { hdTickets, hdUsers } from '~/lib/hdstec/data';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    technicians: hdUsers.filter((user) => user.perfil === 'Técnico').map(({ senha, ...rest }) => rest),
    tickets: hdTickets,
  });
}

export default function HdTechniciansPage() {
  const { technicians, tickets } = useLoaderData<typeof loader>();

  function countCalls(techName: string) {
    return tickets.filter((ticket) => ticket.tecnico === techName).length;
  }

  return (
    <section className="bg-white rounded-2xl shadow border border-slate-100">
      <header className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">Técnicos ativos</h3>
        <p className="text-sm text-slate-500">Visão geral da carga de chamados por profissional.</p>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Nome</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">E-mail</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Setor</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Unidade</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Chamados atribuídos</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((tech) => (
              <tr key={tech.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium">{tech.nome}</td>
                <td className="px-4 py-3">{tech.email}</td>
                <td className="px-4 py-3">{tech.setor}</td>
                <td className="px-4 py-3">{tech.unidade}</td>
                <td className="px-4 py-3">
                  <span className="rounded-lg bg-blue-50 px-3 py-1 font-semibold text-blue-700">
                    {countCalls(tech.nome)} chamados
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
