"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"

interface Calculo {
  id: number
  tipo: string
  // Para tubulões
  diametro?: number
  profundidade?: number
  diametroSaia?: number
  grauSaia?: number
  // Para pilares e lajes
  largura?: number
  altura?: number
  espessura?: number
  quantidade: number
  volume: number
}

export default function CalculadoraConcreto() {
  const [calculos, setCalculos] = useState<Calculo[]>([])
  const [tipo, setTipo] = useState("")
  const [diametro, setDiametro] = useState("")
  const [profundidade, setProfundidade] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [diametroSaia, setDiametroSaia] = useState("")
  const [grauSaia, setGrauSaia] = useState("")
  const [largura, setLargura] = useState("")
  const [altura, setAltura] = useState("")
  const [espessura, setEspessura] = useState("")

  const calcularVolumeTubulão = (d: number, p: number, ds: number, g: number) => {
    const raio = d / 2 / 100 // converter cm para m
    const raioSaia = ds / 2 / 100
    const volumeCilindro = Math.PI * raio * raio * p

    if (ds > d) {
      const diffRaio = raioSaia - raio
      const angulo = (g / 100) * (Math.PI / 180) // assumir g% como graus
      const alturaSaia = diffRaio / Math.tan(angulo)
      const volumeSaia = (Math.PI * alturaSaia / 3) * (raio * raio + raio * raioSaia + raioSaia * raioSaia)
      return volumeCilindro + volumeSaia
    }
    return volumeCilindro
  }

  const calcularVolumePilar = (l: number, a: number, p: number) => {
    return (l / 100) * (a / 100) * p // largura e altura em cm, profundidade em m
  }

  const calcularVolumeLaje = (l: number, a: number, e: number) => {
    return (l / 100) * (a / 100) * (e / 100) // todos em cm para m³
  }

  const adicionarCalculo = () => {
    const q = parseInt(quantidade) || 0
    let volume = 0

    if (tipo === "tubulões") {
      const d = parseFloat(diametro) || 0
      const p = parseFloat(profundidade) || 0
      const ds = parseFloat(diametroSaia) || 0
      const g = parseFloat(grauSaia) || 0
      if (d > 0 && p > 0 && q > 0) {
        volume = calcularVolumeTubulão(d, p, ds, g) * q
        const novoCalculo: Calculo = {
          id: Date.now(),
          tipo,
          diametro: d,
          profundidade: p,
          diametroSaia: ds,
          grauSaia: g,
          quantidade: q,
          volume,
        }
        setCalculos([...calculos, novoCalculo])
      }
    } else if (tipo === "pilares") {
      const l = parseFloat(largura) || 0
      const a = parseFloat(altura) || 0
      const p = parseFloat(profundidade) || 0
      if (l > 0 && a > 0 && p > 0 && q > 0) {
        volume = calcularVolumePilar(l, a, p) * q
        const novoCalculo: Calculo = {
          id: Date.now(),
          tipo,
          largura: l,
          altura: a,
          profundidade: p,
          quantidade: q,
          volume,
        }
        setCalculos([...calculos, novoCalculo])
      }
    } else if (tipo === "lajes") {
      const l = parseFloat(largura) || 0
      const a = parseFloat(altura) || 0
      const e = parseFloat(espessura) || 0
      if (l > 0 && a > 0 && e > 0 && q > 0) {
        volume = calcularVolumeLaje(l, a, e) * q
        const novoCalculo: Calculo = {
          id: Date.now(),
          tipo,
          largura: l,
          altura: a,
          espessura: e,
          quantidade: q,
          volume,
        }
        setCalculos([...calculos, novoCalculo])
      }
    }

    // Limpar campos
    setTipo("")
    setDiametro("")
    setProfundidade("")
    setQuantidade("")
    setDiametroSaia("")
    setGrauSaia("")
    setLargura("")
    setAltura("")
    setEspessura("")
  }

  const removerCalculo = (id: number) => {
    setCalculos(calculos.filter(calc => calc.id !== id))
  }

  const volumeTotal = calculos.reduce((total, calc) => total + calc.volume, 0)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Calculadora de Concreto</h1>

      <Card>
        <CardHeader>
          <CardTitle>Descrição</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            A "Calculadora de Concreto" do ADM OBRAS é uma ferramenta prática e intuitiva projetada para ajudá-lo a calcular o consumo de concreto por metro cúbico de forma rápida e precisa. Informe as dimensões dos locais que precisam de concreto e obtenha resultados confiáveis em poucos cliques.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Como Usar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Selecione o Tipo de Estrutura:</h3>
            <p>Escolha entre opções como tubulões, pilares, lajes, entre outros.</p>
          </div>
          <div>
            <h3 className="font-semibold">Insira as Dimensões:</h3>
            <p>Dependendo do tipo selecionado, insira as dimensões apropriadas (em cm ou m) e a quantidade.</p>
          </div>
          <div>
            <h3 className="font-semibold">Calcular:</h3>
            <p>Clique no botão "Calcular" para obter o consumo total de concreto.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adicionar Cálculo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="tipo">Tipo de Estrutura</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tubulões">Tubulões</SelectItem>
                  <SelectItem value="pilares">Pilares</SelectItem>
                  <SelectItem value="lajes">Lajes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {tipo === "tubulões" && (
              <>
                <div>
                  <Label htmlFor="diametro">Diâmetro (cm)</Label>
                  <Input
                    id="diametro"
                    type="number"
                    step="0.01"
                    value={diametro}
                    onChange={(e) => setDiametro(e.target.value)}
                    placeholder="60"
                  />
                </div>
                <div>
                  <Label htmlFor="profundidade">Profundidade (m)</Label>
                  <Input
                    id="profundidade"
                    type="number"
                    step="0.01"
                    value={profundidade}
                    onChange={(e) => setProfundidade(e.target.value)}
                    placeholder="4"
                  />
                </div>
                <div>
                  <Label htmlFor="diametroSaia">Diâmetro da Saia (cm)</Label>
                  <Input
                    id="diametroSaia"
                    type="number"
                    step="0.01"
                    value={diametroSaia}
                    onChange={(e) => setDiametroSaia(e.target.value)}
                    placeholder="140"
                  />
                </div>
                <div>
                  <Label htmlFor="grauSaia">Grau da Saia (%)</Label>
                  <Input
                    id="grauSaia"
                    type="number"
                    step="0.01"
                    value={grauSaia}
                    onChange={(e) => setGrauSaia(e.target.value)}
                    placeholder="30"
                  />
                </div>
              </>
            )}
            {tipo === "pilares" && (
              <>
                <div>
                  <Label htmlFor="largura">Largura (cm)</Label>
                  <Input
                    id="largura"
                    type="number"
                    step="0.01"
                    value={largura}
                    onChange={(e) => setLargura(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div>
                  <Label htmlFor="altura">Altura (cm)</Label>
                  <Input
                    id="altura"
                    type="number"
                    step="0.01"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div>
                  <Label htmlFor="profundidade">Profundidade (m)</Label>
                  <Input
                    id="profundidade"
                    type="number"
                    step="0.01"
                    value={profundidade}
                    onChange={(e) => setProfundidade(e.target.value)}
                    placeholder="3"
                  />
                </div>
              </>
            )}
            {tipo === "lajes" && (
              <>
                <div>
                  <Label htmlFor="largura">Largura (cm)</Label>
                  <Input
                    id="largura"
                    type="number"
                    step="0.01"
                    value={largura}
                    onChange={(e) => setLargura(e.target.value)}
                    placeholder="500"
                  />
                </div>
                <div>
                  <Label htmlFor="altura">Comprimento (cm)</Label>
                  <Input
                    id="altura"
                    type="number"
                    step="0.01"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    placeholder="600"
                  />
                </div>
                <div>
                  <Label htmlFor="espessura">Espessura (cm)</Label>
                  <Input
                    id="espessura"
                    type="number"
                    step="0.01"
                    value={espessura}
                    onChange={(e) => setEspessura(e.target.value)}
                    placeholder="15"
                  />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                id="quantidade"
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="5"
              />
            </div>
          </div>
          <Button onClick={adicionarCalculo} className="w-full">
            Calcular
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cálculos Adicionados</CardTitle>
        </CardHeader>
        <CardContent>
          {calculos.length === 0 ? (
            <p className="text-muted-foreground">Nenhum cálculo adicionado ainda.</p>
          ) : (
            <div className="space-y-2">
              {calculos.map((calc) => (
                <div key={calc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4 flex-1">
                    <div>
                      <Label className="text-sm font-medium">Tipo</Label>
                      <p className="text-sm">{calc.tipo}</p>
                    </div>
                    {calc.tipo === "tubulões" && (
                      <>
                        <div>
                          <Label className="text-sm font-medium">Diâmetro</Label>
                          <p className="text-sm">{calc.diametro} cm</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Profundidade</Label>
                          <p className="text-sm">{calc.profundidade} m</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Saia</Label>
                          <p className="text-sm">{calc.diametroSaia} cm</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Grau</Label>
                          <p className="text-sm">{calc.grauSaia}%</p>
                        </div>
                      </>
                    )}
                    {calc.tipo === "pilares" && (
                      <>
                        <div>
                          <Label className="text-sm font-medium">Largura</Label>
                          <p className="text-sm">{calc.largura} cm</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Altura</Label>
                          <p className="text-sm">{calc.altura} cm</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Profundidade</Label>
                          <p className="text-sm">{calc.profundidade} m</p>
                        </div>
                      </>
                    )}
                    {calc.tipo === "lajes" && (
                      <>
                        <div>
                          <Label className="text-sm font-medium">Largura</Label>
                          <p className="text-sm">{calc.largura} cm</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Comprimento</Label>
                          <p className="text-sm">{calc.altura} cm</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Espessura</Label>
                          <p className="text-sm">{calc.espessura} cm</p>
                        </div>
                      </>
                    )}
                    <div>
                      <Label className="text-sm font-medium">Quantidade</Label>
                      <p className="text-sm">{calc.quantidade}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Volume</Label>
                      <p className="text-sm font-semibold">{calc.volume.toFixed(2)} m³</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removerCalculo(calc.id)}
                    className="ml-4"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exemplo de Cálculo</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Exemplos:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Tubulões: Diâmetro 60 cm, Profundidade 4 m, Saia 140 cm, Grau 30%, Quantidade 5</li>
            <li>Pilares: Largura 30 cm, Altura 30 cm, Profundidade 3 m, Quantidade 10</li>
            <li>Lajes: Largura 500 cm, Comprimento 600 cm, Espessura 15 cm, Quantidade 1</li>
          </ul>
          <p className="mt-2">
            Adicione os cálculos e veja o volume total somado.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            Volume total: {volumeTotal.toFixed(2)} m³
          </div>
          <p className="text-muted-foreground mt-2">
            Comparativo entre concreto necessário e desperdício: Sugestões para quantidade de material conforme o resultado.
          </p>
          <p className="mt-2">
            Volume total em metros cúbicos. Sugestões: Para {volumeTotal.toFixed(2)} m³, considere adquirir aproximadamente {(volumeTotal * 1.1).toFixed(2)} m³ para cobrir possíveis perdas.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}