import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const faqs = [
    {
      question: "O KrakenClass é para quem está começando do zero?",
      answer:
        "Sim! O treinamento foi desenhado para te levar do absoluto zero até os resultados avançados, mesmo que você nunca tenha trabalhado com marketing digital.",
    },
    {
      question: "Preciso aparecer para ter resultados?",
      answer:
        "Não. O método ensina estratégias para vender sem precisar expor sua imagem. Você aprenderá a criar produtos e a vendê-los nos bastidores.",
    },
    {
        question: "Preciso de muito dinheiro para começar?",
        answer: "Não. Você aprenderá a começar com pouco investimento, otimizando seus recursos para obter o máximo de retorno possível. Ensinamos estratégias orgânicas e pagas para todos os orçamentos."
    },
    {
      question: "Em quanto tempo consigo ver os primeiros resultados?",
      answer:
        "Isso varia de aluno para aluno, mas muitos começam a ver os primeiros resultados em poucas semanas ao aplicar o método consistentemente. Dedicação e execução são a chave.",
    },
    {
      question: "Terei suporte durante o curso?",
      answer:
        "Sim! Oferecemos suporte individual via WhatsApp e um grupo exclusivo para alunos, onde você pode tirar dúvidas e interagir com outros membros da comunidade.",
    },
  ];
  
  export function Faq() {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            AINDA COM DÚVIDAS? RELAXA!
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-gray-900/50 border-gray-800 rounded-lg mb-4 px-6 transition-all duration-300 hover:border-primary/50">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
  }
  