import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StorageBackup from '~/lib/utils/storage-backup';
import { classNames } from '~/utils/classNames';

interface BackupInfo {
  id: string;
  name: string;
  timestamp: number;
  size: number;
}

export function StorageBackupManager() {
  const [backups, setBackups] = useState<BackupInfo[]>([]);
  const [storageInfo, setStorageInfo] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    refreshBackupList();
  }, []);

  const refreshBackupList = () => {
    const info = StorageBackup.getStorageInfo();
    setStorageInfo(info);
    setBackups(info?.backups || []);
  };

  const handleCreateBackup = () => {
    const name = prompt('Nome do backup (opcional):');
    StorageBackup.createBackup(name || undefined);
    refreshBackupList();
  };

  const handleRestoreBackup = (backupId: string) => {
    if (window.confirm('Restaurar este backup? Os dados atuais serão sobrescrita.')) {
      StorageBackup.restoreBackup(backupId);
      refreshBackupList();
      window.location.reload();
    }
  };

  const handleExportBackup = (backupId: string) => {
    StorageBackup.exportBackup(backupId);
  };

  const handleDeleteBackup = (backupId: string) => {
    if (window.confirm('Deletar este backup permanentemente?')) {
      StorageBackup.deleteBackup(backupId);
      refreshBackupList();
    }
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const success = await StorageBackup.importBackup(file);
      if (success) {
        refreshBackupList();
        setSelectedFile(null);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Deletar TODOS os backups? Esta ação não pode ser desfeita!')) {
      StorageBackup.clearAllBackups();
      refreshBackupList();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botão flutuante */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          'p-4 rounded-full shadow-lg transition-all',
          'bg-[#50A0FF] text-white hover:bg-[#3C8CF0]',
          'flex items-center gap-2 font-semibold'
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="i-ph:floppy-disk text-xl" />
        Backups
      </motion.button>

      {/* Painel de Backups */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-20 right-0 bg-bolt-elements-background-depth-2 border-2 border-[#50A0FF] rounded-lg shadow-2xl p-6 w-96 max-h-96 overflow-y-auto"
        >
          <div className="space-y-4">
            {/* Título */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-bolt-elements-textPrimary">
                Gerenciador de Backups
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"
              >
                ✕
              </button>
            </div>

            {/* Info de Armazenamento */}
            {storageInfo && (
              <div className="bg-bolt-elements-background-depth-3 p-3 rounded-lg text-sm">
                <p className="text-bolt-elements-textSecondary">
                  📦 Backups: <strong>{storageInfo.backupCount}/{storageInfo.maxBackups}</strong>
                </p>
                <p className="text-bolt-elements-textSecondary">
                  💾 Tamanho: <strong>{storageInfo.totalSize}</strong>
                </p>
              </div>
            )}

            {/* Botões de Ação */}
            <div className="flex gap-2">
              <button
                onClick={handleCreateBackup}
                className="flex-1 bg-[#50A0FF] text-white py-2 rounded-lg hover:bg-[#3C8CF0] transition-all font-semibold text-sm"
              >
                ➕ Novo Backup
              </button>
              <label className="flex-1 bg-bolt-elements-background-depth-3 text-bolt-elements-textPrimary py-2 rounded-lg hover:bg-bolt-elements-background-depth-4 transition-all font-semibold text-sm cursor-pointer text-center">
                📥 Importar
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            </div>

            {/* Lista de Backups */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {backups.length === 0 ? (
                <p className="text-center text-bolt-elements-textSecondary text-sm py-4">
                  Nenhum backup disponível
                </p>
              ) : (
                backups.map((backup) => (
                  <motion.div
                    key={backup.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-bolt-elements-background-depth-3 p-3 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-bolt-elements-textPrimary text-sm">
                          {backup.name}
                        </p>
                        <p className="text-xs text-bolt-elements-textSecondary">
                          {new Date(backup.timestamp).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <span className="text-xs text-bolt-elements-textSecondary">
                        {(backup.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRestoreBackup(backup.id)}
                        className="flex-1 text-xs bg-green-600 text-white py-1 rounded hover:bg-green-700 transition-all"
                      >
                        ↩️ Restaurar
                      </button>
                      <button
                        onClick={() => handleExportBackup(backup.id)}
                        className="flex-1 text-xs bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition-all"
                      >
                        📥 Exportar
                      </button>
                      <button
                        onClick={() => handleDeleteBackup(backup.id)}
                        className="flex-1 text-xs bg-red-600 text-white py-1 rounded hover:bg-red-700 transition-all"
                      >
                        🗑️ Deletar
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Botão de Limpar Tudo */}
            {backups.length > 0 && (
              <button
                onClick={handleClearAll}
                className="w-full text-xs bg-red-900 text-red-100 py-2 rounded-lg hover:bg-red-800 transition-all font-semibold"
              >
                🗑️ Limpar Todos
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default StorageBackupManager;
