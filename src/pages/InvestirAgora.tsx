
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function InvestirAgora() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pt-24 pb-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Invista com
            <span className="text-accent"> Confiança</span>
          </h1>
          
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Explore uma ampla gama de oportunidades de investimento, desde ações até fundos de investimento, tudo em uma única plataforma.
          </p>
        </div>

        <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 glass">
            <h3 className="text-lg font-semibold">Ações Brasileiras</h3>
            <p className="mt-2 text-muted-foreground">
              Invista nas principais empresas listadas na B3
            </p>
          </Card>
          
          <Card className="p-6 glass">
            <h3 className="text-lg font-semibold">Fundos de Investimento</h3>
            <p className="mt-2 text-muted-foreground">
              Diversifique seu portfólio com os melhores fundos
            </p>
          </Card>
          
          <Card className="p-6 glass">
            <h3 className="text-lg font-semibold">Renda Fixa</h3>
            <p className="mt-2 text-muted-foreground">
              Investimentos seguros com retorno previsível
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
