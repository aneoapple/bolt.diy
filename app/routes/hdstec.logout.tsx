import type { ActionFunctionArgs } from '@remix-run/node';
import { logoutHdUser } from '~/lib/hdstec/session.server';

export async function action({ request }: ActionFunctionArgs) {
  return logoutHdUser(request);
}
