---
title: "Nota fiscal automática na Shopee e no Mercado Livre com o Tiny (Olist): como montar"
description: "Como fazer os pedidos da Shopee e do Mercado Livre entrarem sozinhos no Tiny, emitir a NF-e sem digitar e avisar o cliente no WhatsApp."
pubDate: 2026-11-13
category: ia-empresas
tags: ["shopee", "mercado livre", "tiny", "nota fiscal", "automacao"]
affiliate: false
---

Quem vende em marketplace conhece a rotina: o pedido cai na Shopee ou no Mercado Livre, alguém copia para o sistema, emite a nota, gera a etiqueta e responde o cliente. Com 10 pedidos por dia, dá para levar. Com 100, vira um emprego inteiro, e qualquer erro de digitação vira nota cancelada, envio atrasado e reputação caindo.

Este guia mostra como montar o fluxo **pedido → ERP → nota fiscal → aviso ao cliente** de forma automática, usando o **Tiny ERP (Olist)**, que é um dos ERPs mais usados por vendedores de marketplace no Brasil. A lógica vale para outros ERPs.

## O fluxo ideal, de ponta a ponta

1. **O pedido entra sozinho no ERP** assim que é pago no marketplace.
2. **A nota fiscal (NF-e) é emitida automaticamente**, com as regras fiscais da sua empresa.
3. **A etiqueta de envio é gerada** e o pedido vai para a fila de separação.
4. **O cliente recebe um aviso** com confirmação e rastreio.
5. **Problemas viram alerta**: nota rejeitada, pedido sem estoque, devolução aberta.

Os passos 1 a 3 costumam ser resolvidos pelo próprio ERP. Os passos 4 e 5, e as regras que fogem do padrão, são onde uma automação sob medida faz diferença.

## Parte 1: o que o Tiny já resolve sozinho

O Tiny tem integrações nativas com os principais marketplaces, incluindo Shopee e Mercado Livre. Em linhas gerais, a configuração passa por:

1. **Conectar a conta do marketplace** na área de integrações do Tiny e autorizar o acesso.
2. **Vincular os anúncios aos produtos** cadastrados no ERP (por SKU). Esse é o passo mais importante: sem o vínculo certo, o pedido entra com produto errado ou sem estoque.
3. **Configurar a importação automática de pedidos** e a situação em que eles entram.
4. **Definir as regras de emissão da nota**: natureza de operação, CFOP, tributação por produto. Faça isso com o seu contador.
5. **Ativar a emissão automática da NF-e** para os pedidos importados, se a sua configuração fiscal permitir.
6. **Testar com poucos pedidos** antes de ligar para tudo.

Os nomes de menus mudam com as atualizações do sistema; a central de ajuda do Tiny tem o passo a passo atualizado de cada integração.

## Parte 2: quando o nativo não basta

A integração nativa resolve o caminho feliz. Na prática, quase toda operação tem pelo menos um destes casos:

| Situação | O que fazer |
| --- | --- |
| Vários CNPJs ou depósitos | Regras que escolhem a empresa emissora por produto ou estado |
| Kits e variações | Mapear o kit para os itens corretos antes de emitir |
| Nota rejeitada pela Sefaz | Alerta imediato no WhatsApp com o motivo, em vez de descobrir dias depois |
| Cliente quer saber do pedido | Mensagem automática com status e rastreio |
| Devoluções e reclamações | Painel único com prazos, para não perder o tempo de resposta |
| Relatórios | Resumo diário de vendas, margem e problemas no WhatsApp do dono |

Esses casos se resolvem com uma automação que conversa com as APIs do Tiny, dos marketplaces e do WhatsApp. Uma ferramenta como o [n8n](/como-instalar-n8n-vps-hostinger/) é ideal para isso: roda no seu servidor, sem limite de execuções, e cada regra vira um bloco visual.

### Exemplo: alerta de nota rejeitada

1. A cada 15 minutos, a automação consulta no Tiny as notas com situação de rejeição.
2. Para cada nota nova, monta uma mensagem com o número do pedido, o cliente e o motivo da rejeição.
3. Envia no WhatsApp do responsável e registra numa planilha.
4. Quando a nota é corrigida e autorizada, avisa que resolveu.

Esse fluxo simples evita o pior cenário: o pedido parado sem ninguém saber, e o marketplace penalizando o atraso.

## Quanto tempo e dinheiro isso economiza

Uma conta rápida: se cada pedido manual consome **3 minutos** entre copiar, emitir nota e responder o cliente, **100 pedidos por dia são 5 horas de trabalho** diário. É quase uma pessoa só para isso, sem contar o custo dos erros. Automatizar não elimina a equipe; ela passa a cuidar de atendimento, anúncios e expedição, que é o que faz a loja crescer.

## Checklist antes de automatizar

- [ ] Todos os anúncios vinculados ao SKU certo no ERP
- [ ] Regras fiscais revisadas com o contador
- [ ] Certificado digital válido e configurado
- [ ] Estoque atualizado no ERP (ele passa a ser a fonte da verdade)
- [ ] Um responsável que recebe os alertas

## Na prática, na WebMedula

Um dos projetos que fazemos na [WebMedula](https://www.webmedula.com.br) é exatamente este: pedidos da Shopee sincronizados no Tiny, NF-e emitida automaticamente e avisos no WhatsApp. Também montamos uma central de devoluções do Mercado Livre, que reúne reclamações e prazos num painel só. Normalmente começamos pelo diagnóstico do que já está no Tiny, ativamos o que é nativo e construímos só o que falta. Veja a página de [automação para lojas na Shopee e Mercado Livre](/automacao-shopee-mercado-livre/) ou os [serviços com preço fechado](/servicos/).

## Perguntas frequentes

**Preciso de um ERP para emitir nota automática dos marketplaces?**
Na prática, sim. O ERP centraliza pedidos, estoque e emissão fiscal. O Tiny é popular entre vendedores de marketplace, mas existem outros.

**A automação substitui o contador?**
Não. As regras fiscais (CFOP, tributação) devem ser definidas com o contador. A automação só aplica essas regras sem erro de digitação.

**E se eu vender em outros canais, como loja própria?**
O mesmo fluxo funciona: cada canal entra no ERP, e a automação cuida de notas, avisos e alertas.

**Dá para começar pequeno?**
Dá. Comece pela importação automática de pedidos e pelo alerta de nota rejeitada. Depois inclua avisos ao cliente e relatórios. Para entender a base, veja [como automatizar tarefas com IA sem programar](/como-automatizar-tarefas-com-ia-sem-programar/).
