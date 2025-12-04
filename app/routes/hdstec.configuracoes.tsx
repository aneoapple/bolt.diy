import { json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { hdTicketCategories, hdTicketPriorities, hdTicketSlaHoras } from '~/lib/hdstec/data';
import type { HdTicketPriority } from '~/lib/hdstec/types';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({ categories: hdTicketCategories, priorities: hdTicketPriorities, sla: hdTicketSlaHoras });
}

export default function HdSettingsPage() {
  const { categories, priorities, sla } = useLoaderData<typeof loader>();
  const [categoryList, setCategoryList] = useState([...categories]);
  const [newCategory, setNewCategory] = useState('');
  const [priorityList, setPriorityList] = useState([...priorities]);
  const [slaMap, setSlaMap] = useState<Record<HdTicketPriority, number>>({ ...sla });
  const [message, setMessage] = useState<string | null>(null);

  function handleSave() {
    setMessage('Configurações atualizadas (somente em memória).');
    setTimeout(() => setMessage(null), 2500);
  }

  function addCategory() {
    if (!newCategory.trim()) return;
    setCategoryList([...categoryList, newCategory.trim()]);
    setNewCategory('');
  }

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-2xl shadow border border-slate-100 p-6 space-y-4">
        <header>
          <h3 className="text-lg font-semibold text-slate-900">Categorias de chamado</h3>
          <p className="text-sm text-slate-500">Controle rápido das opções exibidas nos formulários.</p>
        </header>
        <div className="flex gap-3">
          <input
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            placeholder="Nova categoria"
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2"
          />
          <button onClick={addCategory} className="rounded-lg bg-blue-600 text-white px-4 py-2 font-semibold">
            Adicionar
          </button>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-slate-700">
          {categoryList.map((category) => (
            <li key={category} className="rounded-lg border border-slate-200 px-3 py-2 bg-slate-50">
              {category}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-2xl shadow border border-slate-100 p-6 space-y-4">
        <header>
          <h3 className="text-lg font-semibold text-slate-900">Prioridades e SLA padrão</h3>
          <p className="text-sm text-slate-500">Defina tempos de atendimento por criticidade.</p>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Prioridade</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">SLA (horas)</th>
              </tr>
            </thead>
            <tbody>
              {priorityList.map((priority) => (
                <tr key={priority} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium">{priority}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={1}
                      value={slaMap[priority as HdTicketPriority]}
                      onChange={(event) =>
                        setSlaMap({ ...slaMap, [priority]: Number(event.target.value) || slaMap[priority as HdTicketPriority] })
                      }
                      className="w-32 rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button onClick={handleSave} className="rounded-lg bg-emerald-600 text-white font-semibold px-5 py-2">
          Salvar alterações
        </button>
        {message && <p className="text-sm text-emerald-600">{message}</p>}
      </div>
    </div>
  );
}
