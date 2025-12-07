import { json, type MetaFunction } from '@remix-run/node';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';
import BackgroundRays from '~/components/ui/BackgroundRays';
import StorageBackupManager from '~/components/ui/StorageBackupManager';

export const meta: MetaFunction = () => {
  return [{ title: 'R3' }, { name: 'description', content: 'Talk with R3, an AI assistant from StackBlitz' }];
};

export const loader = () => json({});

/**
 * Landing page component for Bolt
 * Note: Settings functionality should ONLY be accessed through the sidebar menu.
 * Do not add settings button/panel to this landing page as it was intentionally removed
 * to keep the UI clean and consistent with the design system.
 */
export default function Index() {
  return (
    <div className="flex flex-col h-full w-full bg-bolt-elements-background-depth-1">
      <BackgroundRays />
      <ClientOnly>{() => <Header />}</ClientOnly>
      <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
      <ClientOnly>{() => <StorageBackupManager />}</ClientOnly>
      <footer className="text-center py-4 text-xs text-bolt-elements-textSecondary border-t border-bolt-elements-borderColor">
        Dev: Alexandre Cavalcante -R3-Builder®
      </footer>
    </div>
  );
}
