import { createCookieSessionStorage, json, redirect } from '@remix-run/node';
import { hdUsers } from './data';
import type { HdUser } from './types';

const sessionSecret = process.env.HDSTEC_SESSION_SECRET || 'hdstec-dev-secret';

const storage = createCookieSessionStorage<{ user: Omit<HdUser, 'senha'> | null }>({
  cookie: {
    name: '__hdstec_session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
  },
});

export async function getHdSession(request: Request) {
  const cookie = request.headers.get('Cookie');
  return storage.getSession(cookie);
}

export async function getHdUser(request: Request) {
  const session = await getHdSession(request);
  return session.get('user') ?? null;
}

export async function requireHdUser(request: Request) {
  const user = await getHdUser(request);
  if (!user) {
    throw redirect('/hdstec/login');
  }
  return user;
}

export async function createHdUserSession(user: Omit<HdUser, 'senha'>, redirectTo = '/hdstec') {
  const session = await storage.getSession();
  session.set('user', user);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export async function logoutHdUser(request: Request) {
  const session = await getHdSession(request);
  return redirect('/hdstec/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

export function authenticateHdUser(email: string, password: string) {
  const found = hdUsers.find((user) => user.email === email && user.senha === password);
  if (!found) {
    throw json({ error: 'Credenciais inválidas' }, { status: 400 });
  }
  const { senha, ...safeUser } = found;
  return safeUser;
}
