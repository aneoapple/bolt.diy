import { useMemo, useState } from 'react';
import type { MetaFunction } from '@remix-run/node';

const WHATSAPP_BASE = 'https://wa.me/5511999999999';

const pizzas = [
  {
    name: 'Margherita Suprema',
    description: 'Molho italiano, mussarela de búfala, pesto fresco e toque de manjericão.',
    price: 'a partir de R$ 49,90',
    badge: 'Mais pedida',
  },
  {
    name: 'Calabresa Artesanal',
    description: 'Calabresa fina grelhada, cebola caramelizada e azeite aromático.',
    price: 'a partir de R$ 52,90',
  },
  {
    name: 'Trufa Mediterrânea',
    description: 'Queijo brie, cogumelos salteados e finalização com azeite trufado.',
    price: 'a partir de R$ 69,90',
    badge: 'Edição especial',
  },
  {
    name: 'Quatro Queijos Cremosa',
    description: 'Blend exclusivo Ale Pizzaria com gorgonzola, catupiry e parmesão.',
    price: 'a partir de R$ 54,90',
  },
  {
    name: 'Ale Pepperoni',
    description: 'Pepperoni crocante, mel picante e borda recheada.',
    price: 'a partir de R$ 57,90',
  },
  {
    name: 'Veggie Garden',
    description: 'Legumes assados, abobrinha grelhada e pesto de rúcula.',
    price: 'a partir de R$ 51,90',
  },
];

const combos = [
  {
    title: 'Combo Família',
    description: '2 pizzas grandes + 1 sobremesa + refrigerante 2L.',
    price: 'R$ 169,90',
  },
  {
    title: 'Combo Casal',
    description: '1 pizza média + entrada + 2 taças de vinho.',
    price: 'R$ 129,90',
  },
  {
    title: 'Combo Amigos',
    description: '3 pizzas médias + 6 long necks geladas.',
    price: 'R$ 219,90',
  },
];

const testimonials = [
  {
    name: 'Paula Monteiro',
    text: 'Experiência impecável! Massa leve, ingredientes frescos e atendimento rápido.',
  },
  {
    name: 'Ricardo Oliveira',
    text: 'Reservei para o aniversário e foi sucesso. Clima aconchegante e pizza perfeita.',
  },
  {
    name: 'Juliana Costa',
    text: 'Peço toda semana pelo WhatsApp. Entrega pontual e sabor constante.',
  },
  {
    name: 'Thiago Ramos',
    text: 'Os combos valem cada centavo. Já virei cliente fiel da Ale!',
  },
];

export const meta: MetaFunction = () => [
  { title: 'Ale Pizzaria | Experiência premium em pizzas artesanais' },
  {
    name: 'description',
    content: 'Landing page da Ale Pizzaria com pedidos via WhatsApp, reservas e promoções exclusivas.',
  },
];

export default function AlePizzariaPage() {
  const [reservationFeedback, setReservationFeedback] = useState('');
  const whatsappMenuLink = useMemo(
    () => `${WHATSAPP_BASE}?text=${encodeURIComponent('Olá Ale Pizzaria! Quero fazer um pedido agora.')}`,
    [],
  );

  const handleReservation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    form.reset();
    setReservationFeedback('Recebemos sua solicitação! Nossa equipe retornará em instantes para confirmar.');
    setTimeout(() => setReservationFeedback(''), 5000);
  };

  const whatsappPizzaLink = (pizzaName: string) =>
    `${WHATSAPP_BASE}?text=${encodeURIComponent(`Olá Ale Pizzaria! Quero pedir a pizza ${pizzaName}.`)}`;

  const whatsappComboLink = (comboName: string) =>
    `${WHATSAPP_BASE}?text=${encodeURIComponent(`Oi Ale! Quero garantir o ${comboName}.`)}`;

  return (
    <div className="bg-[#080808] text-white min-h-screen font-['Space_Grotesk',_sans-serif]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#inicio" className="text-2xl font-black tracking-tight text-white">
            Ale Pizzaria
          </a>
          <nav className="hidden lg:flex gap-6 text-sm text-white/80">
            {['Início', 'Cardápio', 'Promoções', 'Delivery', 'Reserva', 'Depoimentos', 'Contato'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <a
            href={`${WHATSAPP_BASE}?text=${encodeURIComponent('Quero fazer um pedido agora!')}`}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex rounded-full bg-gradient-to-r from-amber-400 to-red-500 px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-red-500/40 hover:scale-105 transition"
          >
            Peça agora no WhatsApp
          </a>
        </div>
      </header>

      <main className="pt-28" id="inicio">
        <section
          className="relative min-h-[80vh] flex items-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(8,8,8,0.95), rgba(8,8,8,0.75)), url('https://images.unsplash.com/photo-1548365328-92d785fbf9b8?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="uppercase text-amber-400 tracking-[0.3em] text-xs">Experiência gastronômica</p>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white">
                Ale Pizzaria – As melhores pizzas com ingredientes selecionados e frescos.
              </h1>
              <p className="text-lg text-white/80">
                Sabores autorais preparados no forno a lenha, entrega ágil e atendimento acolhedor. Viva o ritual completo
                de saborear uma pizza premium.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#cardápio"
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white hover:text-black transition"
                >
                  Ver Cardápio
                </a>
                <a
                  href={whatsappMenuLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-gradient-to-r from-amber-400 to-red-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-red-600/40 hover:scale-105 transition"
                >
                  Fazer Pedido Agora
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-white/80">
                {['Massa artesanal', 'Forno a lenha', 'Entrega rápida'].map((badge) => (
                  <span key={badge} className="px-4 py-2 rounded-full border border-white/15 bg-white/5">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl shadow-black/50">
              <img
                src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80"
                alt="Pizza de calabresa recém saída do forno"
                className="rounded-2xl object-cover w-full h-72"
              />
              <p className="mt-4 text-sm text-white/70">
                "Receitas autorais e ingredientes selecionados diariamente. Nosso forno à lenha mantém o sabor e a textura
                perfeita em cada pedido."
              </p>
            </div>
          </div>
        </section>

        <section id="cardápio" className="scroll-mt-20 bg-[#0f0f13] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
              <div>
                <p className="text-amber-400 uppercase tracking-[0.4em] text-xs">Cardápio</p>
                <h2 className="text-3xl font-bold">Nossas Pizzas Favoritas</h2>
                <p className="text-white/70 mt-2">Receitas exclusivas pensadas para harmonizar com bons encontros.</p>
              </div>
              <a
                href={whatsappMenuLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-amber-100 transition"
              >
                Consultar cardápio completo
                <span className="i-ph:arrow-up-right" />
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pizzas.map((pizza) => (
                <div key={pizza.name} className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4 shadow-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{pizza.name}</h3>
                      <p className="text-sm text-white/70">{pizza.description}</p>
                    </div>
                    {pizza.badge && (
                      <span className="text-xs uppercase tracking-wide text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
                        {pizza.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-semibold text-amber-300">{pizza.price}</p>
                  <a
                    href={whatsappPizzaLink(pizza.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex justify-center w-full rounded-2xl bg-gradient-to-r from-red-500 to-amber-400 py-3 text-sm font-semibold text-black shadow-md hover:shadow-red-500/40 hover:scale-[1.01] transition"
                  >
                    Pedir esta pizza
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="promoções" className="scroll-mt-20 bg-gradient-to-b from-[#0f0f13] to-[#141420] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-amber-400 uppercase tracking-[0.4em] text-xs">Exclusivo</p>
              <h2 className="text-3xl font-bold">Combos Especiais Ale Pizzaria</h2>
              <p className="text-white/70 mt-3">Planos perfeitos para cada momento e companhia.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {combos.map((combo) => (
                <div key={combo.title} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col space-y-4">
                  <h3 className="text-2xl font-semibold text-amber-300">{combo.title}</h3>
                  <p className="text-white/70 flex-1">{combo.description}</p>
                  <p className="text-2xl font-bold">{combo.price}</p>
                  <a
                    href={whatsappComboLink(combo.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex justify-center rounded-2xl border border-amber-300 px-4 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-300 hover:text-black transition"
                  >
                    Quero este combo
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="delivery" className="scroll-mt-20 bg-[#080808] py-20">
          <div className="max-w-6xl mx-auto px-6 space-y-10">
            <div className="text-center">
              <p className="text-amber-400 uppercase tracking-[0.4em] text-xs">Delivery & atendimento</p>
              <h2 className="text-3xl font-bold">Delivery rápido e atendimento de primeira</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Entrega em toda a região',
                  text: 'Centro, Jardins, Vila Mariana, Vila Olímpia e proximidades com frota própria.',
                },
                {
                  title: 'Pedido pelo WhatsApp',
                  text: 'Atendimento humanizado e confirmação instantânea em poucos cliques.',
                },
                {
                  title: 'Funcionamento diário',
                  text: 'Aberto todos os dias das 18h às 23h, inclusive feriados.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/5 border border-amber-400/30 rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.5em] text-amber-300">Frete inteligente</p>
                <h3 className="text-2xl font-semibold">Taxa a partir de R$ 7,90 para bairros até 5km</h3>
                <p className="text-white/70 text-sm">Consulte valores especiais para condomínios parceiros e eventos corporativos.</p>
              </div>
              <a
                href={whatsappMenuLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center rounded-full bg-white text-black px-8 py-3 font-semibold hover:bg-amber-50 transition"
              >
                Fazer pedido
              </a>
            </div>
          </div>
        </section>

        <section id="reserva" className="scroll-mt-20 bg-[#0f0f13] py-20">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
            <div>
              <p className="text-amber-400 uppercase tracking-[0.4em] text-xs">Eventos & reservas</p>
              <h2 className="text-3xl font-bold mb-4">Reserve sua mesa ou faça seu evento</h2>
              <p className="text-white/70">
                Ideal para aniversários, encontros corporativos e jantares especiais. Personalizamos o ambiente, criamos menus
                exclusivos e oferecemos acompanhamento dedicado da equipe Ale Pizzaria.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <span className="i-ph:check-circle text-amber-400" /> Salão para até 50 pessoas.
                </li>
                <li className="flex items-center gap-2">
                  <span className="i-ph:check-circle text-amber-400" /> Cardápio personalizado e harmonização com vinhos.
                </li>
                <li className="flex items-center gap-2">
                  <span className="i-ph:check-circle text-amber-400" /> Equipe exclusiva durante todo o evento.
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
              <form className="space-y-4" onSubmit={handleReservation}>
                {[
                  { label: 'Nome', type: 'text', name: 'nome' },
                  { label: 'Telefone', type: 'tel', name: 'telefone' },
                  { label: 'Data', type: 'date', name: 'data' },
                  { label: 'Horário', type: 'time', name: 'horario' },
                  { label: 'Número de pessoas', type: 'number', name: 'pessoas', min: 2, max: 50 },
                ].map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label className="text-sm text-white/70" htmlFor={field.name}>
                      {field.label}
                    </label>
                    <input
                      {...field}
                      id={field.name}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                      required={field.name !== 'horario'}
                    />
                  </div>
                ))}
                <div className="space-y-1">
                  <label className="text-sm text-white/70" htmlFor="observacoes">
                    Observações
                  </label>
                  <textarea
                    id="observacoes"
                    name="observacoes"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                    rows={3}
                    placeholder="Informe alergias, preferências ou briefing do evento"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-red-500 py-3 text-sm font-semibold text-black shadow-xl shadow-red-500/40 hover:scale-[1.01] transition"
                >
                  Solicitar Reserva
                </button>
              </form>
              {reservationFeedback && (
                <p className="mt-4 text-center text-sm text-amber-300">{reservationFeedback}</p>
              )}
            </div>
          </div>
        </section>

        <section id="depoimentos" className="scroll-mt-20 bg-[#080808] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-amber-400 uppercase tracking-[0.4em] text-xs">Confiança</p>
              <h2 className="text-3xl font-bold">O que nossos clientes dizem</h2>
              <p className="text-white/70 mt-2">Avaliações reais de quem já viveu a experiência Ale Pizzaria.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <div className="flex items-center gap-2 text-amber-300 text-lg mb-2">
                    {'★★★★★'}
                  </div>
                  <p className="text-white/80">{testimonial.text}</p>
                  <p className="mt-4 text-sm text-white/60">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="scroll-mt-20 bg-[#0f0f13] py-20">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
            <div className="space-y-6 text-white/80 text-sm">
              <h2 className="text-3xl font-bold text-white">Fale com a Ale Pizzaria</h2>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
                <p className="font-semibold text-white">Ale Pizzaria</p>
                <p>As melhores pizzas com ingredientes selecionados e frescos.</p>
                <div>
                  <p className="font-semibold text-white">Links Rápidos</p>
                  <ul className="space-y-1">
                    <li>Início</li>
                    <li>Cardápio</li>
                    <li>Contato</li>
                    <li>Nossos Serviços</li>
                    <li>Entrega</li>
                    <li>Reserva</li>
                    <li>Eventos</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white">Contato</p>
                  <p>Email: contato@alepizzaria.com</p>
                  <p>Telefone: (11) 1234-5678</p>
                  <p>Endereço: Rua das Pizzas, 123</p>
                </div>
              </div>
              <div className="h-48 rounded-3xl border border-dashed border-white/20 flex items-center justify-center text-white/50 text-sm">
                Mapa da localização (Google Maps aqui)
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
              <h3 className="text-2xl font-semibold text-white">Estamos prontos para atender</h3>
              <p>Canais diretos para pedidos, eventos corporativos e experiências personalizadas.</p>
              <div className="grid gap-4">
                <a
                  href={whatsappMenuLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-amber-300 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-300/10"
                >
                  WhatsApp exclusivo
                  <span className="i-ph:arrow-up-right" />
                </a>
                <a
                  href="tel:+551112345678"
                  className="flex items-center justify-between rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/5"
                >
                  Ligar agora
                  <span className="i-ph:phone" />
                </a>
                <a
                  href="mailto:contato@alepizzaria.com"
                  className="flex items-center justify-between rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/5"
                >
                  Enviar e-mail
                  <span className="i-ph:paper-plane" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/80 text-center text-sm text-white/60 py-6">
        © 2024 Ale Pizzaria. Todos os direitos reservados.
      </footer>
    </div>
  );
}
