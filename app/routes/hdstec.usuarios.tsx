import { json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { hdUsers } from '~/lib/hdstec/data';
import type { HdUser } from '~/lib/hdstec/types';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({ users: hdUsers });
}

export default function HdUsersPage() {
  const { users } = useLoaderData<typeof loader>();
  const [list, setList] = useState(users.map(({ senha, ...rest }) => rest));
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    perfil: 'Usuário',
    setor: '',
    unidade: '',
    status: 'Ativo',
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newUser: Omit<HdUser, 'senha'> = {
      id: `USR-${Date.now().toString().slice(-3)}`,
      ...formData,
    };
    setList([newUser, ...list]);
    setFormData({ nome: '', email: '', perfil: 'Usuário', setor: '', unidade: '', status: 'Ativo' });
    setFormOpen(false);
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white rounded-2xl shadow p-6 border border-slate-100">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Usuários corporativos</h3>
          <p className="text-sm text-slate-500">Controle de perfis, setores e status de acesso.</p>
        </div>
        <button
          onClick={() => setFormOpen((prev) => !prev)}
          className="self-start rounded-lg bg-blue-600 text-white font-semibold px-4 py-2 shadow hover:bg-blue-700"
        >
          {formOpen ? 'Fechar formulário' : 'Novo usuário'}
        </button>
      </header>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow border border-slate-100 p-6 grid gap-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">Nome completo</label>
            <input
              value={formData.nome}
              onChange={(event) => setFormData({ ...formData, nome: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">E-mail</label>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Perfil</label>
            <select
              value={formData.perfil}
              onChange={(event) => setFormData({ ...formData, perfil: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              <option>Admin</option>
              <option>Técnico</option>
              <option>Usuário</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Status</label>
            <select
              value={formData.status}
              onChange={(event) => setFormData({ ...formData, status: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Setor</label>
            <input
              value={formData.setor}
              onChange={(event) => setFormData({ ...formData, setor: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Unidade</label>
            <input
              value={formData.unidade}
              onChange={(event) => setFormData({ ...formData, unidade: event.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="rounded-lg bg-emerald-600 text-white font-semibold px-4 py-2">
              Salvar usuário
            </button>
          </div>
        </form>
      )}

      <section className="bg-white rounded-2xl shadow border border-slate-100">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">Lista completa</h3>
          <p className="text-sm text-slate-500">Dados mockados apenas para visualização.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Nome</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">E-mail</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Perfil</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Setor</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Unidade</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((user) => (
                <tr key={user.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium">{user.nome}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.perfil}</td>
                  <td className="px-4 py-3">{user.setor}</td>
                  <td className="px-4 py-3">{user.unidade}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${user.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
