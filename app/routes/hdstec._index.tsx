import type { LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getHdUser } from '~/lib/hdstec/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getHdUser(request);
  if (!user) {
    return redirect('/hdstec/login');
  }
  return redirect('/hdstec/dashboard');
}

export default function HdIndex() {
  return null;
}
