"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Users, Clock, AlertCircle, Award, Shield, FileText, DollarSign, BarChart } from "lucide-react"
import Link from "next/link"

export default function PessoalPage() {
  const modules = [
    {
      title: "Cadastro de Colaboradores",
      description: "Gerencie o cadastro completo dos colaboradores",
      icon: Users,
      href: "/pessoal/cadastro-colaboradores",
      color: "bg-blue-500"
    },
    {
      title: "Controle de Ponto",
      description: "Registre e monitore a jornada de trabalho",
      icon: Clock,
      href: "/pessoal/controle-ponto",
      color: "bg-green-500"
    },
    {
      title: "Faltas e Ausências",
      description: "Controle de faltas, atestados e licenças",
      icon: AlertCircle,
      href: "/pessoal/faltas-ausencias",
      color: "bg-yellow-500"
    },
    {
      title: "Horas Extras",
      description: "Gestão de horas extras e banco de horas",
      icon: Clock,
      href: "/pessoal/horas-extras",
      color: "bg-purple-500"
    },
    {
      title: "EPI e Equipamentos",
      description: "Controle de entrega de EPIs e equipamentos",
      icon: Shield,
      href: "/pessoal/epi-equipamentos",
      color: "bg-orange-500"
    },
    {
      title: "Avaliação de Competências",
      description: "Avalie e desenvolva competências da equipe",
      icon: Award,
      href: "/pessoal/avaliacao-competencias",
      color: "bg-pink-500"
    },
    {
      title: "Recibos de Pagamento",
      description: "Geração e consulta de recibos",
      icon: DollarSign,
      href: "/pessoal/recibos-pagamento",
      color: "bg-emerald-500"
    },
    {
      title: "Relatórios",
      description: "Relatórios gerenciais do departamento",
      icon: BarChart,
      href: "/pessoal/relatorios",
      color: "bg-cyan-500"
    }
  ]

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  ADM OBRAS
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Departamento Pessoal</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
          <h1 className="text-3xl font-bold mb-2">Departamento Pessoal</h1>
          <p className="text-muted-foreground mb-8">
            Gerencie todos os aspectos relacionados aos colaboradores da sua obra
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modules.map((module) => (
              <Link
                key={module.href}
                href={module.href}
                className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-lg ${module.color} mb-4`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
