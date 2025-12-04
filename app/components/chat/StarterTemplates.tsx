import React from 'react';
import { toast } from 'react-toastify';

type TemplateChip = {
	label: string;
	preview: string;
	prompt: string;
};

const CORE_TEMPLATES: TemplateChip[] = [
	{
		label: 'Landing page moderna',
		preview: 'Hero + CTA + prova social',
		prompt:
			'Preciso de uma landing page moderna e responsiva em React/Tailwind, com hero impactante, CTA principal, seção de benefícios, depoimentos com fotos e bloco final com formulário de contato. A paleta deve ser vibrante e os botões precisam ter microanimação.',
	},
	{
		label: 'Dashboard analítica',
		preview: 'KPIs e gráfico semanal',
		prompt:
			'Quero um dashboard analítico com quatro cards de KPI (receita, MRR, churn, clientes ativos), gráfico de barras comparando as últimas 8 semanas e tabela filtrável de oportunidades. Use ícones sutis, cantos arredondados e dark theme premium.',
	},
	{
		label: 'Assistente de conteúdo',
		preview: 'Workflow em 3 etapas',
		prompt:
			'Crie um assistente de conteúdo que guie o usuário por 3 etapas: gerar ideias, revisar texto e sugerir títulos. Cada etapa deve ter descrição, campos de input e sugestões automáticas com botões rápidos.',
	},
	{
		label: 'Automação de onboarding',
		preview: 'Checklist + emails',
		prompt:
			'Preciso de um fluxo de onboarding com checklist visual, cards para emails automáticos e timeline de progresso do cliente. Inclua CTA para solicitar acompanhamento humano.',
	},
	{
		label: 'Gerador de propostas',
		preview: 'Escopo + valores',
		prompt:
			'Monte um gerador de propostas comerciais onde o usuário preenche escopo, entregáveis, cronograma e valores. O resultado deve aparecer formatado pronto para PDF com destaque em cada seção.',
	},
];

const TEMPLATE_CLOUD: TemplateChip[] = [
	...CORE_TEMPLATES,
	{ label: 'Fintech premium', preview: 'Landing com métricas', prompt: 'Desenvolva uma landing premium para fintech com header minimalista, seção de métricas animadas, integrações bancárias e CTA para demo privada.' },
	{ label: 'SaaS B2B', preview: 'Problema x solução', prompt: 'Crie página SaaS B2B com sessão de dor do cliente, solução ilustrada, comparação de planos e depoimentos de clientes enterprise.' },
	{ label: 'Catálogo gourmet', preview: 'Menu fotográfico', prompt: 'Preciso de um catálogo digital para restaurante com cards fotográficos grandes, filtro por categoria e CTA para WhatsApp.' },
	{ label: 'Black Friday', preview: 'Ofertas + timer', prompt: 'Monte landing e fluxo de email para Black Friday com contador regressivo, pacotes promocionais, FAQ e CTA agressivo.' },
	{ label: 'Assistente jurídico', preview: 'Checklist de riscos', prompt: 'Crie um assistente jurídico que receba cláusulas, destaque riscos, sugira ajustes e gere checklist final.' },
	{ label: 'Onboarding mobile', preview: '3 telas ilustradas', prompt: 'Planeje onboarding mobile com três telas ilustradas, indicadores de progresso e botão para pular tutorial.' },
	{ label: 'Portal educacional', preview: 'Trilhas e progresso', prompt: 'Construa portal de cursos com trilhas, barra de progresso, cards de aulas e depoimentos de alunos.' },
	{ label: 'E-commerce minimal', preview: '3 produtos foco', prompt: 'Desenhe landing minimalista para e-commerce com destaque para três produtos premium, depoimentos e CTA de compra.' },
	{ label: 'Checklist auditoria', preview: 'Status e responsáveis', prompt: 'Monte checklist de auditoria com status coloridos, responsáveis, anexos e comentários.' },
	{ label: 'Newsletter interativa', preview: 'Blocos dinâmicos', prompt: 'Preciso de template de newsletter com blocos interativos, playlist, CTA social e rodapé com sellos.' },
	{ label: 'Painel financeiro', preview: 'Projeções e alertas', prompt: 'Crie painel financeiro com gráfico de projeção trimestral, cards de alerta e comparativos mês a mês.' },
	{ label: 'Planejamento de evento', preview: 'Cronograma + budget', prompt: 'Quero planner de eventos com cronograma, linha do tempo, orçamento e checklist de fornecedores.' },
	{ label: 'FAQ inteligente', preview: 'Busca livre', prompt: 'Escreva componente de FAQ com busca, categorias e animação de expansão.' },
	{ label: 'Landing podcast', preview: 'Players e episódios', prompt: 'Monte página para podcast com player principal, lista de episódios, CTA para newsletter e formulário de sugestão.' },
	{ label: 'Portal de vagas', preview: 'Filtros rápidos', prompt: 'Criar página de carreiras com filtros por área, benefícios destacados e formulário rápido.' },
	{ label: 'Resumo executivo', preview: 'KPIs + próximos passos', prompt: 'Gerar layout de resumo executivo com KPIs, narrativa estratégica e próximos passos em cards.' },
	{ label: 'Guia interativo', preview: 'Etapas ilustradas', prompt: 'Crie guia interativo com etapas numeradas, imagens e checklist marcável.' },
	{ label: 'Mapa de produto', preview: 'Roadmap trimestral', prompt: 'Preciso de um roadmap trimestral com colunas para agora, próximo e futuro, com status e donos.' },
	{ label: 'Portal imobiliário', preview: 'Cards com mapas', prompt: 'Desenvolva listing imobiliário com filtros, cards com mapa embutido e CTA para visita.' },
	{ label: 'Lounge de comunidade', preview: 'Eventos + tópicos', prompt: 'Crie página de comunidade com calendário de eventos, tópicos em destaque e CTAs para entrar no Discord.' },
	{ label: 'Central de suporte', preview: 'Tickets + artigos', prompt: 'Monte central de suporte com busca, categorias, artigos populares e CTA para abrir ticket.' },
	{ label: 'Briefing criativo', preview: 'Form multi-step', prompt: 'Preciso de formulário multi-etapas para briefing de campanha com resumo final em PDF.' },
	{ label: 'AI Playground', preview: 'Blocos experimentais', prompt: 'Crie playground para comparar respostas de IA, com seleção de modelos e cards de saída.' },
];

interface StarterTemplatesProps {
	onSelect?: (prompt: string) => void;
}

const applyTemplate = async (template: TemplateChip, onSelect?: (prompt: string) => void) => {
	onSelect?.(template.prompt);

	if (typeof navigator !== 'undefined' && navigator.clipboard) {
		try {
			await navigator.clipboard.writeText(template.prompt);
		} catch (error) {
			console.error('Erro ao copiar template', error);
		}
	}

	toast.success('Template aplicado no campo do chat. Ajuste antes de enviar!');
};

const StarterTemplates: React.FC<StarterTemplatesProps> = ({ onSelect }) => {
	const colorPalette = [
		'from-rose-500 to-pink-400',
		'from-amber-300 to-orange-500',
		'from-emerald-400 to-lime-500',
		'from-indigo-500 to-purple-500',
		'from-sky-400 to-blue-600',
		'from-fuchsia-500 to-rose-500',
	];

	return (
		<section className="mt-6">
			<div className="flex flex-wrap justify-center gap-2">
				{TEMPLATE_CLOUD.map((template, index) => {
					const gradient = colorPalette[index % colorPalette.length];
					const delay = `${(index % 7) * 0.25}s`;

					return (
						<button
							key={template.label}
							title={template.preview}
							aria-label={`${template.label} – ${template.preview}`}
							onClick={() => applyTemplate(template, onSelect)}
							className={`text-[11px] font-semibold text-white/90 rounded-full px-4 py-2 backdrop-blur border border-white/10 shadow-lg shadow-black/30 hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white/60 bg-gradient-to-br ${gradient} animate-[pulse_7s_ease-in-out_infinite]`}
							style={{ animationDelay: delay }}
						>
							<span className="block leading-tight">
								<span className="block text-[11px] font-semibold text-white">{template.label}</span>
								<span className="block text-[9px] text-white/85">{template.preview}</span>
							</span>
						</button>
					);
				})}
			</div>
		</section>
	);
};

export default StarterTemplates;
