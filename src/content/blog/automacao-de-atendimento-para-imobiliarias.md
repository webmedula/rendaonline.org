---
title: "Automação de atendimento para imobiliárias: como responder todo lead em segundos e agendar visitas pelo WhatsApp"
description: "Como uma imobiliária automatiza o primeiro contato, a qualificação e o agendamento de visitas pelo WhatsApp com IA. O que precisa, quanto custa e os erros comuns."
pubDate: 2026-11-18
category: ia-empresas
tags: ["whatsapp", "chatbot", "imobiliarias", "corretor de imoveis", "agendamento", "ia para empresas"]
affiliate: false
---

Um lead de imóvel tem prazo de validade curto. Quem pede informação de um apartamento no portal ou no Instagram às 21h e só recebe resposta no dia seguinte às 10h já falou com outras três imobiliárias. E boa parte das mensagens que chegam são sempre as mesmas: "ainda está disponível?", "aceita financiamento?", "qual o valor do condomínio?", "posso visitar sábado?".

Este guia é para donos de imobiliária, gestores de equipe de corretores e corretores autônomos. Ele mostra o que dá para automatizar no WhatsApp, o que precisa estar organizado antes, **quanto custa** e como implantar sem que os corretores sintam que estão sendo substituídos. Os valores são aproximados e servem como ordem de grandeza.

## Onde a imobiliária perde negócio

| Vazamento | O que acontece | O que custa |
|---|---|---|
| Lead sem resposta rápida | Pergunta chega à noite ou no fim de semana e fica para o dia seguinte | O interessado fala com quem respondeu primeiro |
| Corretor filtrando curioso | Corretor gasta a manhã respondendo quem nunca vai fechar | Menos tempo para quem está pronto para visitar |
| Visita marcada e não realizada | Cliente esquece, chega atrasado ou não avisa que desistiu | Deslocamento perdido e proprietário irritado |
| Lead antigo esquecido | Quem visitou há três meses e não fechou nunca mais foi contatado | Imóvel novo entra no portfólio e ninguém avisa quem procurava exatamente aquilo |

A automação resolve os quatro, e sem tirar o corretor da conversa onde ele faz diferença: a negociação.

## O que a automação faz no dia a dia de uma imobiliária

Um assistente no WhatsApp da imobiliária, com inteligência artificial, assume a parte repetitiva:

- **Responde o primeiro contato em segundos**, 24 horas por dia. Disponibilidade, valor, condomínio, IPTU, metragem, vagas, aceita pet, aceita financiamento. Tudo puxado do cadastro do imóvel.
- **Qualifica o lead com três ou quatro perguntas.** Compra ou aluguel? Faixa de valor? Região? Prazo? Tem financiamento aprovado ou precisa de ajuda? Com isso o corretor recebe o lead já sabendo com quem está falando.
- **Sugere imóveis parecidos.** Se o apartamento perguntado já foi alugado, o assistente oferece outros dois do mesmo bairro e faixa de preço.
- **Agenda a visita.** Mostra os horários do corretor responsável, marca, manda a confirmação com endereço e lembra no dia. Se o cliente não confirmar, avisa o corretor antes de ele sair.
- **Distribui o lead.** Novo lead qualificado vai para o corretor da vez (ou por região, ou por tipo de imóvel), com resumo da conversa.
- **Reativa quem sumiu.** Entrou um imóvel que bate com o que a pessoa procurava há dois meses? O assistente avisa. Lead que visitou e não fechou recebe uma mensagem gentil 15 dias depois.
- **Passa para o corretor quando é hora.** Pedido de proposta, negociação de valor, dúvida jurídica, reclamação: o assistente chama o humano e sai da conversa.

Para locação, ele ainda cuida do fluxo de documentos: lista o que precisa, recebe os arquivos pelo WhatsApp e avisa a equipe quando o dossiê está completo.

## O que muda em números

Varia com o tamanho da carteira e com o quanto o processo já era organizado. Em ordem de grandeza, no que costuma acontecer nos primeiros 60 dias:

- O tempo de primeira resposta cai de horas para segundos, em todos os horários. É o indicador que mais muda a taxa de conversão de lead em visita.
- O corretor passa a receber só lead com nome, interesse, faixa de valor e região. A parte "curioso" já foi filtrada.
- Visitas não realizadas caem assim que o lembrete com confirmação entra no ar.
- Leads antigos voltam a gerar visitas, porque alguém (o assistente) finalmente está avisando quando entra imóvel compatível.

Sem promessa de número: é apenas parar de perder quem já procurou a imobiliária.

## O que precisa estar organizado antes

O assistente só responde bem o que está cadastrado. Antes de contratar, deixe pronto:

1. **Cadastro dos imóveis atualizado**, com os campos que o cliente pergunta: valor, condomínio, IPTU, área, quartos, vagas, andar, aceita pet, aceita financiamento, disponibilidade. Pode ser no sistema que a imobiliária já usa (Vista, Jetimob, Kenlo, imobzi, Superlógica) ou numa planilha bem feita.
2. **Regra de distribuição de leads.** Rodízio, por região, por tipo, por quem cadastrou o imóvel. Precisa estar escrita.
3. **Agenda dos corretores.** Dias e horários em que cada um faz visita. Google Agenda resolve.
4. **Um número de WhatsApp da imobiliária**, na API oficial. Não o número pessoal do dono nem de um corretor.
5. **Respostas padrão para o que não está no cadastro**: política de reserva, prazo de análise de locação, documentos necessários, comissão.
6. **Uma pessoa responsável** por olhar as conversas que o assistente passou para humanos e pelos leads que ninguém pegou.

## Como funciona por dentro

1. **API oficial do WhatsApp** conecta o número da imobiliária a um sistema. Nada de WhatsApp Web automatizado: com o volume de mensagens que uma imobiliária envia, o risco de bloqueio é real.
2. **Uma camada de inteligência artificial** lê a mensagem, consulta o cadastro de imóveis e responde no tom da imobiliária. Ela recebe instruções com as regras da casa e sabe quando não deve responder.
3. **O sistema imobiliário ou CRM** é consultado e atualizado: imóvel disponível ou não, lead criado, visita marcada.
4. **Automações de rotina** rodam sozinhas: lembrete de visita, confirmação, reativação, aviso ao corretor, alerta de imóvel novo compatível.

Quem gosta de mexer encontra a parte técnica aqui no site, no tutorial de [como automatizar o WhatsApp com n8n e Evolution API](/automatizar-whatsapp-com-n8n-evolution-api/). Para a maioria das imobiliárias, faz mais sentido contratar pronto e integrado ao sistema que já usam.

## Quanto custa

Valores aproximados, no mercado brasileiro, para uma imobiliária de pequeno ou médio porte (até uns 10 corretores):

| Item | Faixa aproximada | Observação |
|---|---|---|
| Implantação do assistente com IA | R$ 2.000 a R$ 6.000 (único) | Inclui configuração, integração com o sistema de imóveis, regras de distribuição e ajustes iniciais |
| API oficial do WhatsApp | R$ 50 a R$ 400/mês | Responder quem escreveu costuma ser gratuito; lembretes, reativação e alertas enviados pela imobiliária têm custo por conversa |
| Uso da inteligência artificial | R$ 50 a R$ 300/mês | Depende do volume de leads |
| Hospedagem e manutenção | R$ 100 a R$ 300/mês | Servidor, atualizações, suporte |
| Sistema imobiliário ou CRM (se não tiver) | R$ 100 a R$ 500/mês | A maioria já tem |

Depois da implantação, algo entre **R$ 200 e R$ 1.000 por mês**. Para comparar: é menos do que a comissão de uma única locação que deixou de ser perdida.

Para uma visão geral de preços de chatbot, veja [chatbot de WhatsApp com IA para empresas: como funciona e quanto custa](/chatbot-whatsapp-com-ia-para-empresas-quanto-custa/).

## Passo a passo para implantar sem resistência dos corretores

A principal barreira não é técnica. É o corretor achar que vai perder o lead para o robô. O passo a passo abaixo evita isso:

1. **Semana 1: organizar e combinar.** Cadastro revisado, regra de distribuição escrita e apresentada à equipe. Deixe claro: o assistente qualifica e entrega; quem negocia e fecha continua sendo o corretor, com a mesma comissão.
2. **Semana 2: configurar e testar internamente.** Cada corretor conversa com o assistente como se fosse cliente e aponta o que está errado ou frio demais.
3. **Semana 3: ligar para clientes, só no primeiro contato.** O assistente responde, qualifica e passa o lead. Sem lembretes ainda. Os corretores veem leads chegando mais completos.
4. **Semana 4: ligar agendamento e lembretes.** Visitas marcadas pelo assistente, confirmação no dia anterior.
5. **Depois de 30 dias: ligar reativação e alerta de imóvel novo.** Com histórico, o assistente já sabe quem procurava o quê.

## Erros que mais vemos

- **Cadastro desatualizado.** O assistente diz que o imóvel está disponível e ele foi alugado há uma semana. É o erro mais comum e o que mais queima a imobiliária. A rotina de atualização precisa existir antes da automação.
- **Qualificar demais.** Oito perguntas antes de dizer o preço. O cliente desiste. Três ou quatro bastam.
- **Não entregar o lead rápido para o corretor.** O assistente qualifica em um minuto e o corretor só vê no dia seguinte. A vantagem toda se perde. Precisa de notificação e de responsabilidade clara.
- **Usar o número pessoal.** Quando o corretor sai da imobiliária, leva os leads junto.
- **Deixar o assistente negociar.** Desconto, proposta, condição de pagamento: isso é com gente. O assistente precisa saber parar.
- **Esquecer o proprietário.** Dono de imóvel também manda mensagem (quer saber se teve visita, se tem proposta). O assistente deve reconhecer e tratar diferente.

## Na prática, na WebMedula

Na [WebMedula](/servicos/) montamos o assistente de WhatsApp com IA para imobiliárias como serviço fechado: configuramos a API oficial, treinamos a IA com as regras da casa, integramos ao sistema de imóveis ou CRM que a imobiliária já usa (ou colocamos um simples), ligamos a distribuição de leads para os corretores e ativamos agendamento, lembrete e reativação por etapas, como no passo a passo acima. A imobiliária entrega o cadastro e as regras; a gente entrega o assistente funcionando e acompanha os primeiros 30 dias de ajustes.

Para quem está em dúvida se faz sentido no seu caso, o caminho mais rápido é o [diagnóstico gratuito de automação](/diagnostico-automacao/): a gente olha como os leads chegam e são tratados hoje e diz o que automatizar primeiro. Os detalhes do serviço estão em [atendimento no WhatsApp com IA](/atendimento-whatsapp-com-ia/). Se o site da imobiliária ainda é fraco ou nem existe, vale ler antes [quanto custa um site profissional](/quanto-custa-um-site-profissional/), porque o assistente rende mais quando o lead chega de um site com os imóveis bem apresentados.

## Perguntas frequentes

**Funciona com os leads que vêm dos portais (ZAP, VivaReal, OLX, Imovelweb)?**
Sim. Os portais entregam o lead por e-mail ou integração; o assistente pega esse lead, manda a primeira mensagem no WhatsApp e segue o mesmo fluxo de qualificação.

**Integra com o sistema que eu já uso?**
Com os principais do mercado, sim, por API ou por exportação automática. Se o sistema não oferece integração, dá para trabalhar com uma planilha sincronizada.

**O corretor perde a comissão para o robô?**
Não. O assistente não vende nem negocia. Ele entrega o lead qualificado e agenda a visita; a comissão continua do corretor que atende. Na prática, ele recebe mais leads prontos, não menos.

**E se o cliente quiser falar com uma pessoa logo de cara?**
Ele fala. "Quero falar com um corretor" ou qualquer sinal de impaciência faz o assistente chamar o humano e sair da conversa.

**Serve para corretor autônomo?**
Serve, e é onde o ganho de tempo é maior, porque é a mesma pessoa que prospecta, responde, visita e negocia. O custo fica na faixa mais baixa da tabela.

**Quanto tempo leva para colocar no ar?**
De três a cinco semanas, seguindo o passo a passo. O que mais atrasa é o cadastro de imóveis e as regras de distribuição, não a parte técnica.
