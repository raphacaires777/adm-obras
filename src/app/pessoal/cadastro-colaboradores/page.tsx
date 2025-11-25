"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

export default function CadastroColaboradores() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    cargo: '',
    departamento: '',
    salario: '',
    endereco: ''
  })
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Salvar dados ficticiamente (para demonstração)
    console.log('Dados do colaborador:', formData)
    if (typeof window !== 'undefined') {
      localStorage.setItem('colaborador', JSON.stringify(formData))
    }
    setShowConfirmation(true)
    // Reset form
    setFormData({
      nomeCompleto: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      cargo: '',
      departamento: '',
      salario: '',
      endereco: ''
    })
    // Esconder confirmação após 3 segundos
    setTimeout(() => setShowConfirmation(false), 3000)
  }

  const handleCancel = () => {
    router.push('/')
  }

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
                <BreadcrumbLink href="/pessoal">
                  Departamento Pessoal
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Cadastro de Colaboradores</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-screen bg-[#0D0D0D] text-white p-6 rounded-xl">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">
              <span className="lasy-highlight">Cadastro de Colaboradores</span>
            </h1>
            
            {showConfirmation && (
              <div className="mb-6 p-4 bg-green-600 text-white rounded-lg text-center animate-in fade-in slide-in-from-top-2 duration-300">
                ✓ Colaborador cadastrado com sucesso!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nomeCompleto" className="block text-sm font-medium mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="nomeCompleto"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="dataNascimento" className="block text-sm font-medium mb-2">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    id="dataNascimento"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="cargo" className="block text-sm font-medium mb-2">
                    Cargo
                  </label>
                  <select
                    id="cargo"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  >
                    <option value="">Selecione um cargo</option>
                    <option value="gerente">Gerente</option>
                    <option value="engenheiro">Engenheiro</option>
                    <option value="operario">Operário</option>
                    <option value="tecnico">Técnico</option>
                    <option value="administrativo">Administrativo</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="departamento" className="block text-sm font-medium mb-2">
                    Departamento
                  </label>
                  <select
                    id="departamento"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  >
                    <option value="">Selecione um departamento</option>
                    <option value="rh">Recursos Humanos</option>
                    <option value="engenharia">Engenharia</option>
                    <option value="operacional">Operacional</option>
                    <option value="financeiro">Financeiro</option>
                    <option value="compras">Compras</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="salario" className="block text-sm font-medium mb-2">
                    Salário
                  </label>
                  <input
                    type="number"
                    id="salario"
                    name="salario"
                    value={formData.salario}
                    onChange={handleChange}
                    required
                    step="0.01"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="endereco" className="block text-sm font-medium mb-2">
                  Endereço
                </label>
                <textarea
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:scale-105"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
