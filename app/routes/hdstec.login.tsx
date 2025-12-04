import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { authenticateHdUser, createHdUserSession, getHdUser } from '~/lib/hdstec/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getHdUser(request);
  if (user) {
    return redirect('/hdstec');
  }
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');
  const senha = formData.get('senha');

  if (typeof email !== 'string' || typeof senha !== 'string') {
    return json({ error: 'Informe e-mail e senha.' }, { status: 400 });
  }

  try {
    const user = authenticateHdUser(email, senha);
    return await createHdUserSession(user, '/hdstec');
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    return json({ error: 'Não foi possível autenticar.' }, { status: 400 });
  }
}

export default function HdLogin() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <header className="text-center space-y-2">
          <p className="text-sm font-semibold text-blue-600">HDSTEC</p>
          <h1 className="text-2xl font-bold text-slate-900">Central de Chamados de TI</h1>
          <p className="text-sm text-slate-500">Faça login para acessar o painel de controle.</p>
        </header>

        <Form method="post" className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              E-mail corporativo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="nome.sobrenome@hdstec.com.br"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="senha">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {actionData?.error ? (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {actionData.error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 text-white font-semibold py-2.5 shadow hover:bg-blue-700 transition"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </Form>

        <section className="text-xs text-slate-400">
          <p>Usuários de teste:</p>
          <ul className="list-disc list-inside">
            <li>Ana Ribeiro (Admin) — ana.ribeiro@hdstec.com.br / ana123</li>
            <li>Bruno Campos (Técnico) — bruno.campos@hdstec.com.br / bruno123</li>
            <li>Carla Souza (Usuário) — carla.souza@hdstec.com.br / carla123</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
