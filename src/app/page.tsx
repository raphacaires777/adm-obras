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

export default function Page() {
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
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Bem-vindo ao ADM OBRAS</h1>
            <p className="text-lg text-muted-foreground mb-6">
              O aplicativo inovador para facilitar a administração de obras, proporcionando um gerenciamento completo e eficiente do Departamento Pessoal, financeiro, compras de materiais, contratação de prestadores de serviços, parte fiscal, contratos e projetos.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">Colaboradores Ativos</h3>
                </div>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +2 desde o mês passado
                </p>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">Orçamento Total</h3>
                </div>
                <div className="text-2xl font-bold">R$ 2.4M</div>
                <p className="text-xs text-muted-foreground">
                  +12% desde o último trimestre
                </p>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">Materiais em Estoque</h3>
                </div>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">
                  +8% desde a semana passada
                </p>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">Projetos Ativos</h3>
                </div>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Em andamento
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}