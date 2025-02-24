
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pt-24 pb-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Professional Trading
            <br />
            <span className="text-accent">Made Simple</span>
          </h1>
          
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Trade stocks, crypto, and more with our powerful platform. Advanced charts, real-time data, and professional tools at your fingertips.
          </p>
          
          <div className="flex gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Log In
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/negocie-agora">
            <Card className="p-6 glass transition-all hover:bg-accent/10">
              <h3 className="text-lg font-semibold">Negocie Agora</h3>
              <p className="mt-2 text-muted-foreground">
                Opere no mercado com spread fixo de $1 em todos os ativos
              </p>
            </Card>
          </Link>
          
          <Link to="/payments">
            <Card className="p-6 glass transition-all hover:bg-accent/10">
              <h3 className="text-lg font-semibold">Depósitos e Saques</h3>
              <p className="mt-2 text-muted-foreground">
                Faça depósitos e saques via PIX de forma rápida e segura
              </p>
            </Card>
          </Link>
          
          <Link to="/dashboard">
            <Card className="p-6 glass transition-all hover:bg-accent/10">
              <h3 className="text-lg font-semibold">Dashboard</h3>
              <p className="mt-2 text-muted-foreground">
                Acesse sua área do cliente e gerencie seus investimentos
              </p>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
