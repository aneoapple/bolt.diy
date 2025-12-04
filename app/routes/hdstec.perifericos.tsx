import { json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useMemo, useState } from 'react';
import { hdPeripherals } from '~/lib/hdstec/data';
import type { HdPeripheral } from '~/lib/hdstec/types';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({ peripherals: hdPeripherals });
}

export default function HdPeripheralsPage() {
  const { peripherals } = useLoaderData<typeof loader>();
  const [items, setItems] = useState(peripherals);
  const tipos = useMemo(() => ['Todos', ...new Set(peripherals.map((item) => item.tipo))], [peripherals]);
  const situacoes = useMemo(() => ['Todas', ...new Set(peripherals.map((item) => item.situacao))], [peripherals]);
  const [tipoFilter, setTipoFilter] = useState('Todos');
  const [situacaoFilter, setSituacaoFilter] = useState('Todas');
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    tipo: 'Notebook',
    marca: '',
    modelo: '',
    patrimonio: '',
    situacao: 'Em uso',
    local: '',
    responsavel: '',
  });

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const tipoOk = tipoFilter === 'Todos' || item.tipo === tipoFilter;
      const situacaoOk = situacaoFilter === 'Todas' || item.situacao === situacaoFilter;
      return tipoOk && situacaoOk;
    });
  }, [items, tipoFilter, situacaoFilter]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newPeripheral: HdPeripheral = {
      id: `PER-${Date.now().toString().slice(-3)}`,
      ...formData,
    };
    setItems([newPeripheral, ...items]);
    setFormData({ tipo: 'Notebook', marca: '', modelo: '', patrimonio: '', situacao: 'Em uso', local: '', responsavel: '' });
    setFormOpen(false);
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white rounded-2xl shadow p-6 border border-slate-100">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Controle de periféricos</h3>
          <p className="text-sm text-slate-500">Acompanhe ativos de TI por tipo, situação e responsável.</p>
        </div>
        <button
          onClick={() => setFormOpen((prev) => !prev)}
          className="self-start rounded-lg bg-blue-600 text-white font-semibold px-4 py-2 shadow hover:bg-blue-700"
        >
          {formOpen ? 'Fechar formulário' : 'Novo periférico'}
        </button>
      </header>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow border border-slate-100 p-6 grid gap-4 sm:grid-cols-2"
        >
          <div>
            <label className="text-sm font-medium text-slate-700">Tipo</label>
            <select
              value={formData.tipo}
              onChange={(event) => setFormData({ ...formData, tipo: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              <option>Notebook</option>
              <option>Monitor</option>
              <option>Impressora</option>
              <option>Roteador</option>
              <option>Desktop</option>
              <option>Outro</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Marca</label>
            <input
              value={formData.marca}
              onChange={(event) => setFormData({ ...formData, marca: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Modelo</label>
            <input
              value={formData.modelo}
              onChange={(event) => setFormData({ ...formData, modelo: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Patrimônio</label>
            <input
              value={formData.patrimonio}
              onChange={(event) => setFormData({ ...formData, patrimonio: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Situação</label>
            <select
              value={formData.situacao}
              onChange={(event) => setFormData({ ...formData, situacao: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              <option>Em uso</option>
              <option>Reserva</option>
              <option>Manutenção</option>
              <option>Descarte</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Local</label>
            <input
              value={formData.local}
              onChange={(event) => setFormData({ ...formData, local: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">Responsável</label>
            <input
              value={formData.responsavel}
              onChange={(event) => setFormData({ ...formData, responsavel: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="rounded-lg bg-emerald-600 text-white font-semibold px-4 py-2">
              Registrar periférico
            </button>
          </div>
        </form>
      )}

      <section className="bg-white rounded-2xl shadow border border-slate-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">Inventário</h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={tipoFilter}
              onChange={(event) => setTipoFilter(event.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              {tipos.map((tipo) => (
                <option key={tipo}>{tipo}</option>
              ))}
            </select>
            <select
              value={situacaoFilter}
              onChange={(event) => setSituacaoFilter(event.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              {situacoes.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Tipo</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Marca/Modelo</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Patrimônio</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Situação</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Local</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Responsável</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-mono text-slate-600">{item.id}</td>
                  <td className="px-4 py-3">{item.tipo}</td>
                  <td className="px-4 py-3">{item.marca} / {item.modelo}</td>
                  <td className="px-4 py-3">{item.patrimonio}</td>
                  <td className="px-4 py-3">{item.situacao}</td>
                  <td className="px-4 py-3">{item.local}</td>
                  <td className="px-4 py-3">{item.responsavel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
