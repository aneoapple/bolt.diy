/**
 * Browser Storage Backup & Restore System
 * Permite salvar/restaurar projetos, chats e configurações no localStorage
 */

export interface BackupData {
  version: string;
  timestamp: number;
  data: {
    chatHistory?: any[];
    projectSettings?: any;
    providerSettings?: any;
    apiKeys?: Record<string, string>;
    userPreferences?: any;
  };
}

const BACKUP_KEY = 'r3_builder_backup';
const MAX_BACKUPS = 5;

export const StorageBackup = {
  /**
   * Criar backup completo
   */
  createBackup: (name?: string): string => {
    try {
      const backup: BackupData = {
        version: '1.0.0',
        timestamp: Date.now(),
        data: {
          // Tenta recuperar dados de várias fontes
          chatHistory: JSON.parse(localStorage.getItem('chat_history') || '[]'),
          projectSettings: JSON.parse(localStorage.getItem('project_settings') || '{}'),
          providerSettings: JSON.parse(localStorage.getItem('provider_settings') || '{}'),
          userPreferences: JSON.parse(localStorage.getItem('user_preferences') || '{}'),
        },
      };

      const backups = StorageBackup.getBackupList();
      backups.unshift({
        id: `backup_${Date.now()}`,
        name: name || `Backup ${new Date().toLocaleString('pt-BR')}`,
        timestamp: backup.timestamp,
        size: JSON.stringify(backup).length,
      });

      // Manter apenas últimos 5 backups
      if (backups.length > MAX_BACKUPS) {
        backups.slice(0, MAX_BACKUPS).forEach((b: any) => {
          localStorage.setItem(`${BACKUP_KEY}_${b.id}`, JSON.stringify(backup));
        });
      } else {
        localStorage.setItem(`${BACKUP_KEY}_${backups[0].id}`, JSON.stringify(backup));
      }

      localStorage.setItem(`${BACKUP_KEY}_list`, JSON.stringify(backups.slice(0, MAX_BACKUPS)));

      console.log('✅ Backup criado com sucesso!');
      return backups[0].id;
    } catch (error) {
      console.error('❌ Erro ao criar backup:', error);
      throw error;
    }
  },

  /**
   * Listar todos os backups disponíveis
   */
  getBackupList: () => {
    try {
      const list = JSON.parse(localStorage.getItem(`${BACKUP_KEY}_list`) || '[]');
      return list;
    } catch {
      return [];
    }
  },

  /**
   * Restaurar backup
   */
  restoreBackup: (backupId: string): boolean => {
    try {
      const backupData = JSON.parse(localStorage.getItem(`${BACKUP_KEY}_${backupId}`) || '{}');

      if (!backupData.data) {
        console.error('❌ Backup inválido');
        return false;
      }

      // Restaurar cada seção
      if (backupData.data.chatHistory) {
        localStorage.setItem('chat_history', JSON.stringify(backupData.data.chatHistory));
      }
      if (backupData.data.projectSettings) {
        localStorage.setItem('project_settings', JSON.stringify(backupData.data.projectSettings));
      }
      if (backupData.data.providerSettings) {
        localStorage.setItem('provider_settings', JSON.stringify(backupData.data.providerSettings));
      }
      if (backupData.data.userPreferences) {
        localStorage.setItem('user_preferences', JSON.stringify(backupData.data.userPreferences));
      }

      console.log('✅ Backup restaurado com sucesso!');
      return true;
    } catch (error) {
      console.error('❌ Erro ao restaurar backup:', error);
      return false;
    }
  },

  /**
   * Exportar backup como JSON (download)
   */
  exportBackup: (backupId: string): void => {
    try {
      const backupData = localStorage.getItem(`${BACKUP_KEY}_${backupId}`);
      if (!backupData) {
        console.error('❌ Backup não encontrado');
        return;
      }

      const blob = new Blob([backupData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `r3-builder-backup-${backupId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log('✅ Backup exportado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao exportar backup:', error);
    }
  },

  /**
   * Importar backup de arquivo JSON
   */
  importBackup: (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const backupData: BackupData = JSON.parse(e.target?.result as string);

          if (!backupData.version || !backupData.data) {
            console.error('❌ Arquivo de backup inválido');
            resolve(false);
            return;
          }

          const backupId = `backup_${Date.now()}`;
          localStorage.setItem(`${BACKUP_KEY}_${backupId}`, JSON.stringify(backupData));

          const backups = StorageBackup.getBackupList();
          backups.unshift({
            id: backupId,
            name: `Importado ${new Date().toLocaleString('pt-BR')}`,
            timestamp: backupData.timestamp,
            size: JSON.stringify(backupData).length,
          });

          localStorage.setItem(`${BACKUP_KEY}_list`, JSON.stringify(backups.slice(0, MAX_BACKUPS)));
          console.log('✅ Backup importado com sucesso!');
          resolve(true);
        };
        reader.readAsText(file);
      } catch (error) {
        console.error('❌ Erro ao importar backup:', error);
        resolve(false);
      }
    });
  },

  /**
   * Deletar backup
   */
  deleteBackup: (backupId: string): boolean => {
    try {
      localStorage.removeItem(`${BACKUP_KEY}_${backupId}`);
      const backups = StorageBackup.getBackupList();
      const filtered = backups.filter((b: any) => b.id !== backupId);
      localStorage.setItem(`${BACKUP_KEY}_list`, JSON.stringify(filtered));
      console.log('✅ Backup deletado com sucesso!');
      return true;
    } catch (error) {
      console.error('❌ Erro ao deletar backup:', error);
      return false;
    }
  },

  /**
   * Auto-backup automático (a cada 30 min)
   */
  startAutoBackup: (intervalMinutes = 30): NodeJS.Timeout => {
    return setInterval(() => {
      StorageBackup.createBackup(`Auto-backup ${new Date().toLocaleTimeString('pt-BR')}`);
    }, intervalMinutes * 60 * 1000);
  },

  /**
   * Obter informações de armazenamento
   */
  getStorageInfo: () => {
    try {
      let totalSize = 0;
      const backups = StorageBackup.getBackupList();

      backups.forEach((backup: any) => {
        const data = localStorage.getItem(`${BACKUP_KEY}_${backup.id}`);
        if (data) totalSize += data.length;
      });

      return {
        backupCount: backups.length,
        totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
        maxBackups: MAX_BACKUPS,
        backups,
      };
    } catch (error) {
      console.error('❌ Erro ao obter info de armazenamento:', error);
      return null;
    }
  },

  /**
   * Limpar todos os backups
   */
  clearAllBackups: (): boolean => {
    try {
      const backups = StorageBackup.getBackupList();
      backups.forEach((backup: any) => {
        localStorage.removeItem(`${BACKUP_KEY}_${backup.id}`);
      });
      localStorage.removeItem(`${BACKUP_KEY}_list`);
      console.log('✅ Todos os backups foram deletados!');
      return true;
    } catch (error) {
      console.error('❌ Erro ao limpar backups:', error);
      return false;
    }
  },
};

export default StorageBackup;
