import { json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useMemo, useState } from 'react';
import { hdTickets, hdUsers, hdTicketPriorities } from '~/lib/hdstec/data';
import type { HdTicketStatus, HdTicketPriority } from '~/lib/hdstec/types';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({ tickets: hdTickets, users: hdUsers });
}

export default function HdTicketsPage() {
  const { tickets, users } = useLoaderData<typeof loader>();
  const [statusFilter, setStatusFilter] = useState<'Todos' | HdTicketStatus>('Todos');
  const [priorityFilter, setPriorityFilter] = useState<'Todas' | HdTicketPriority>('Todas');
  const [items, setItems] = useState(tickets);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    solicitante: '',
    prioridade: 'Média',
    categoria: 'Software',
  });

  const filtered = useMemo(() => {
    return items.filter((ticket) => {
      const statusOk = statusFilter === 'Todos' || ticket.status === statusFilter;
      const priorityOk = priorityFilter === 'Todas' || ticket.prioridade === priorityFilter;
      return statusOk && priorityOk;
    });
  }, [items, statusFilter, priorityFilter]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newTicket = {
      id: `CH-${Date.now().toString().slice(-4)}`,
      titulo: formData.titulo,
      status: 'Aberto' as HdTicketStatus,
      prioridade: formData.prioridade as HdTicketPriority,
      tecnico: null,
      solicitante: formData.solicitante || 'Usuário interno',
      categoria: formData.categoria,
      abertura: new Date().toISOString().slice(0, 10),
    };
    setItems([newTicket, ...items]);
    setFormData({ titulo: '', solicitante: '', prioridade: 'Média', categoria: 'Software' });
    setFormOpen(false);
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white rounded-2xl shadow p-6 border border-slate-100">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Gerenciamento de chamados</h3>
          <p className="text-sm text-slate-500">Filtre e abra novos chamados com poucos cliques.</p>
        </div>
        <button
          onClick={() => setFormOpen((prev) => !prev)}
          className="self-start rounded-lg bg-blue-600 text-white font-semibold px-4 py-2 shadow hover:bg-blue-700"
        >
          {formOpen ? 'Fechar formulário' : 'Novo chamado'}
        </button>
      </header>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow border border-slate-100 p-6 grid gap-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">Título</label>
            <input
              value={formData.titulo}
              onChange={(event) => setFormData({ ...formData, titulo: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Solicitante</label>
            <input
              value={formData.solicitante}
              onChange={(event) => setFormData({ ...formData, solicitante: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Prioridade</label>
            <select
              value={formData.prioridade}
              onChange={(event) => setFormData({ ...formData, prioridade: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              {hdTicketPriorities.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Categoria</label>
            <select
              value={formData.categoria}
              onChange={(event) => setFormData({ ...formData, categoria: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              <option>Rede</option>
              <option>Hardware</option>
              <option>Software</option>
              <option>Impressora</option>
              <option>Acesso</option>
              <option>Outros</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 text-white font-semibold px-4 py-2"
            >
              Registrar chamado
            </button>
          </div>
        </form>
      )}

      <section className="bg-white rounded-2xl shadow border border-slate-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">Chamados ativos</h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as 'Todos' | HdTicketStatus)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="Todos">Todos os status</option>
              <option value="Aberto">Aberto</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Resolvido">Resolvido</option>
              <option value="Vencido">Vencido</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value as 'Todas' | HdTicketPriority)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="Todas">Todas as prioridades</option>
              {hdTicketPriorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Título</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Prioridade</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Técnico</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Abertura</th>
              </tr>
            </thead>
            <tbody>
              {filtered.concat(items.filter((item) => !tickets.includes(item))).map((ticket) => (
                <tr key={ticket.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-mono text-slate-600">{ticket.id}</td>
                  <td className="px-4 py-3">{ticket.titulo}</td>
                  <td className="px-4 py-3">{ticket.status}</td>
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
