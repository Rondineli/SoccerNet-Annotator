import React from "react";
import Context from "@/context/Context";

import PageHead from "../Head";

import Header from "@/components/Header/Header";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import Home from "@/components/Home/Home";
import Footer from "@/components/Footers/Footer";
import Copyright from "@/components/Footers/Copyright";
import { useTranslation, Trans } from 'next-i18next'

const DEFAULT_LOCALE = {
  "title": "Bem-vindo",
  "description": "Este é o seu aplicativo.",
  "home_messages_section_1": {
    "messages": [
      "Inteligência em Tecnologia da Informação",
      "I.A - Inteligência Artificial - Automação, Desenvolvimento e Testes.",
      "Inteligência em Monitoramento",
      "Consultoria para que sua empresa tenha Cases de Sucesso!",
      "Pare de se preocupar com a demanda, nós trazemos os recursos necessários para que ela seja atendida!"
    ]
  },
  "head_menu": [
    "Inicio",
    "Sobre Nos",
    "Produtos",
    "Clientes",
    "Contato"
  ],
  "section_1": "Clientes que fazem parte da nossa história",
  "section_2": [
    "Sempre Atualizados",
    "Desbloqueie o potencial de sua empresa adquirindo as metodologias e frameworks",
    "de trabalho."
  ],
  "tabs": {
    "TabStyleOne": [
      {
        "title": "O Scrum é uma metodologia ágil que te ajuda:",
        "text": "Scrum",
        "subItem": [
          {
            "text": "Optimizar procedimentos entre sua equipe"
          },
          {
            "text": "Aumentar sua produtividade"
          },
          {
            "text": "Planejar e execute sem sustos"
          },
          {
            "text": "Acelerar e amadureca sua produção & operação"
          }
  
        ]
      },
      {
        "title": "O Lean pode ser mais indicado para:",
        "text": "Lean",
        "subItem": [
          {
            "text": "Projetos reduzidos e mais objetivos"
          },
          {
            "text": "Startups e linhas de produção."
          },
          {
            "text": "Foco na eliminação de desperdícios."
          },
          {
            "text": "Ciclos curtos e melhoria contínua."
          }
        ]
      },
      {
        "title": "O Kanban pode te ajudar em:",
        "text": "Kanban",
        "subItem": [
          {
            "text": "Visualização do fluxo de trabalho"
          },
          {
            "text": "Limitação do trabalho em progresso (WIP)"
          },
          {
            "text": "Entrega contínua e incremental"
          },
          {
            "text": "Melhoria contínua com base em métricas"
          }
        ]
      },
      {
        "title": "Text generating AI refers to artificial intelligence.",
        "text": "FDD",
        "subItem": [
          {
            "text": "Transformer Models"
          },
          {
            "text": "Conditional Generative Models"
          },
          {
            "text": "Pre-trained Models"
          },
          {
            "text": "Variational Autoencoders"
          }
        ]
      }
    ],
    "advanceTab": [
      {
        "menuText": "Consultoria em I.A.",
        "subTitle": "Soluções com Inteligência Artificial",
        "title": "Transformação com Inteligência Artificial",
        "desc": "Oferecemos consultoria estratégica em IA para impulsionar a automação, análise de dados e inovação em processos corporativos."
      },
      {
        "menuText": "Monitoramento e Observabilidade",
        "subTitle": "Visibilidade Operacional Inteligente",
        "title": "Monitore sua Infraestrutura com Precisão",
        "desc": "Implementamos soluções de monitoramento e observabilidade para garantir desempenho, segurança e continuidade nos ambientes de TI."
      },
      {
        "menuText": "Outsourcing de TI",
        "subTitle": "Eficiência com Recursos Dedicados",
        "title": "Suporte e Recursos sob Demanda",
        "desc": "Ajudamos sua empresa a escalar com agilidade através de alocação de especialistas e suporte contínuo para demandas de TI."
      },
      {
        "menuText": "Consultoria em Operações",
        "subTitle": "Otimização de Processos e Sistemas",
        "title": "Excelência Operacional em TI",
        "desc": "Apoiamos a transformação operacional com metodologias ágeis e tecnologias que elevam a eficiência e a resiliência do seu negócio."
      }
    ]
  },
  "button_text": "Saber Mais",
  "section_3": {
    "subtitle": "Quem somos?",
    "new_subtitle": "Nós Somos a"
  },
  "section_4": [
    "Integração de servicos com AI",
    "Chatbots, Outsourcing, solucoes customizadas",
    "para você!"
  ],
  "serviceOne": [
    {
      "title": "O que fazemos?",
      "desc": "Transformação digital alinhada às melhores tecnologias!."
    },
    {
      "title": "Experiencia alinhada a eficiencia!",
      "desc": "Fundada em 2012, temos como premissa o \"customer Centric\" para evolução de seus negocios."
    },
    {
      "title": "Como trabalhamos?",
      "desc": "Usamos a transformação digital alinhada às melhores tecnologias do mercado.."
    },
    {
      "title": "Redução de Custos Operacionais",
      "desc": "Usamos FinOps entre outras metodologia para diminuir custos ."
    },
    {
      "title": "Automação de Processos",
      "desc": "Acreditamos que automação alinhada a processos e peça fundamental para o crescimento de seu negocio."
    },
    {
      "title": "Resolução simplificada de problemas",
      "desc": "Pensar fora da caixa."
    }
  ]
}


const HomePage = (props) => {

  const { t: tHome } = useTranslation('home_messages_section_1');
  const { t: tCommon } = useTranslation('common');
  let messages = tHome('messages', { returnObjects: true })
  let menuText = tCommon('head_menu', { returnObjects: true })
  console.log(`Home Key props = > ${JSON.stringify(menuText)}`);

  const sectionsText = {
    "section_1": tCommon('section_1', { returnObjects: true }) || [],
    "section_2": tCommon('section_2', { returnObjects: true })|| [],
    "tabStyleOne": tCommon('tabs.TabStyleOne', { returnObjects: true })|| [],
    "advanceTab": tCommon('tabs.advanceTab', { returnObjects: true })|| [],
    "buttonText": tCommon('button_text', { returnObjects: true })|| [],
    "section_3": tCommon('section_3', { returnObjects: true })|| [],
    "section_4": tCommon('section_4', { returnObjects: true })|| [],
    "serviceOne": tCommon('serviceOne', { returnObjects: true })|| [],
  }

  if (typeof messages === 'string') { 
    messages = []
  }

  if (typeof menuText === 'string') { 
    menuText = DEFAULT_LOCALE.head_menu;
  }

  if (typeof sectionsText.section_2 === 'string') {
    sectionsText.section_2 = DEFAULT_LOCALE.section_2
  }

  if (typeof sectionsText.tabStyleOne === 'string') {
    sectionsText.tabStyleOne = DEFAULT_LOCALE.tabs.TabStyleOne;
  }

  if (typeof sectionsText.advanceTab === 'string') {
    sectionsText.advanceTab = DEFAULT_LOCALE.tabs.advanceTab;
  }

  if (typeof sectionsText.section_3 === 'string') {
    sectionsText.section_3 = DEFAULT_LOCALE.section_3;
  }

  if (typeof sectionsText.section_4 === 'string') {
    sectionsText.section_4 = DEFAULT_LOCALE.section_4;
  }

  if (typeof sectionsText.serviceOne === 'string') {
    sectionsText.serviceOne = DEFAULT_LOCALE.serviceOne;
  }


  console.log(`Home Key SecionsText => ${JSON.stringify(sectionsText)}`)

  return (
    <>
      <PageHead title="Home" />

      <main className="page-wrapper">
        <Context>
          <Header
            headerTransparent="header-transparent"
            headerSticky="header-sticky"
            btnClass="rainbow-gradient-btn"
            menuText={menuText}
          />
          <PopupMobileMenu />
          <Home messagesText={messages} sectionsText={sectionsText}/>
          <Footer />
          <Copyright />
        </Context>
      </main>
    </>
  );
};


export default HomePage;