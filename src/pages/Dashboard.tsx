
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Bell, ChevronRight, LogOut, Menu, Settings, User, Activity, History, HelpCircle, Home } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample data - In a real app, this would come from an API
const portfolioData = [
  { name: "Ações", value: 45000 },
  { name: "ETFs", value: 25000 },
  { name: "Criptomoedas", value: 15000 },
  { name: "Renda Fixa", value: 15000 },
];

const performanceData = [
  { date: "Jan", value: 30000 },
  { date: "Fev", value: 35000 },
  { date: "Mar", value: 32000 },
  { date: "Abr", value: 40000 },
  { date: "Mai", value: 45000 },
  { date: "Jun", value: 48000 },
];

const recentTrades = [
  { date: "2024-03-19", asset: "PETR4", type: "Compra", quantity: 100, price: 35.75, total: 3575 },
  { date: "2024-03-18", asset: "VALE3", type: "Venda", quantity: 50, price: 68.20, total: 3410 },
  { date: "2024-03-17", asset: "ITUB4", type: "Compra", quantity: 200, price: 32.45, total: 6490 },
];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-full transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } glass w-64 p-4`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">DaTha Trader</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Visão Geral
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Activity className="mr-2 h-4 w-4" />
            Investimentos
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <History className="mr-2 h-4 w-4" />
            Histórico
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <HelpCircle className="mr-2 h-4 w-4" />
            Suporte
          </Button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`p-4 ${isSidebarOpen ? "ml-64" : "ml-0"} transition-margin duration-300`}>
        {/* Top Navigation */}
        <header className="flex justify-between items-center mb-8 glass rounded-lg p-4">
          {!isSidebarOpen && (
            <Button variant="ghost" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-4 ml-auto">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="space-y-6">
          {/* Account Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 100.000,00</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lucro/Prejuízo</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+R$ 15.000,00</div>
                <p className="text-xs text-muted-foreground">
                  Desde o início
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 25.000,00</div>
                <p className="text-xs text-muted-foreground">
                  Pronto para investir
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saldo Investido</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 75.000,00</div>
                <p className="text-xs text-muted-foreground">
                  Em 12 ativos diferentes
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição da Carteira</CardTitle>
                <CardDescription>
                  Distribuição dos seus investimentos por categoria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#0ea5e9"
                        label
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Evolução Patrimonial</CardTitle>
                <CardDescription>
                  Evolução do seu patrimônio nos últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#0ea5e9" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Trades */}
          <Card>
            <CardHeader>
              <CardTitle>Operações Recentes</CardTitle>
              <CardDescription>
                Suas últimas operações no mercado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Ativo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTrades.map((trade) => (
                    <TableRow key={`${trade.date}-${trade.asset}`}>
                      <TableCell>{trade.date}</TableCell>
                      <TableCell>{trade.asset}</TableCell>
                      <TableCell>{trade.type}</TableCell>
                      <TableCell>{trade.quantity}</TableCell>
                      <TableCell>R$ {trade.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">R$ {trade.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
