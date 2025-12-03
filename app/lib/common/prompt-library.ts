import { getSystemPrompt } from './prompts/prompts';
import optimized from './prompts/optimized';
import { getFineTunedPrompt } from './prompts/new-prompt';
import type { DesignScheme } from '~/types/design-scheme';

export interface PromptOptions {
  cwd: string;
  allowedHtmlElements: string[];
  modificationTagName: string;
  designScheme?: DesignScheme;
  supabase?: {
    isConnected: boolean;
    hasSelectedProject: boolean;
    credentials?: {
      anonKey?: string;
      supabaseUrl?: string;
    };
  };
}

export class PromptLibrary {
  static library: Record<
    string,
    {
      label: string;
      description: string;
      get: (options: PromptOptions) => string;
    }
  > = {
    default: {
      label: 'R3 Pro (UX/UI Premium)',
      description: 'Prompt refinado para interfaces de alto nível (estilo Apple/Stripe), design system avançado e código limpo.',
      get: (options) => getFineTunedPrompt(options.cwd, options.supabase, options.designScheme),
    },
    original: {
      label: 'R3 Clássico (Robusto)',
      description: 'O prompt de sistema original, testado em batalha. Ideal para lógica complexa e instruções detalhadas.',
      get: (options) => getSystemPrompt(options.cwd, options.supabase, options.designScheme),
    },
    optimized: {
      label: 'R3 Lite (Experimental)',
      description: 'Versão otimizada para menor consumo de tokens e respostas mais rápidas.',
      get: (options) => optimized(options),
    },
  };

  static getList() {
    return Object.entries(this.library).map(([key, value]) => {
      const { label, description } = value;
      return {
        id: key,
        label,
        description,
      };
    });
  }

  static getPromptFromLibrary(promptId: string, options: PromptOptions) {
    const prompt = this.library[promptId];

    if (!prompt) {
      throw 'Prompt não encontrado na biblioteca';
    }

    return this.library[promptId]?.get(options);
  }
}