
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ChevronRight, Search, ArrowUpDown, Star } from "lucide-react";
import { useState, useEffect } from "react";

// Extended sample data including global stocks
const stockData = [
  // Brazilian Stocks
  { symbol: "PETR4", name: "Petrobras PN", price: "37.92", change: "+1.25", volume: "52.3M", market: "BR" },
  { symbol: "VALE3", name: "Vale ON", price: "68.45", change: "-0.78", volume: "48.1M", market: "BR" },
  { symbol: "ITUB4", name: "Itaú Unibanco PN", price: "32.56", change: "+0.45", volume: "35.7M", market: "BR" },
  // US Stocks
  { symbol: "AAPL", name: "Apple Inc", price: "175.92", change: "+2.15", volume: "82.3M", market: "US" },
  { symbol: "MSFT", name: "Microsoft", price: "338.45", change: "+1.78", volume: "48.1M", market: "US" },
  { symbol: "GOOGL", name: "Alphabet Inc", price: "142.56", change: "-0.45", volume: "35.7M", market: "US" },
  // European Stocks
  { symbol: "SAP.DE", name: "SAP SE", price: "142.82", change: "+0.32", volume: "29.4M", market: "EU" },
  { symbol: "ASML.AS", name: "ASML Holding", price: "612.75", change: "+0.89", volume: "25.8M", market: "EU" },
  // Asian Stocks
  { symbol: "9984.T", name: "SoftBank Group", price: "6242", change: "+1.12", volume: "18.9M", market: "AS" },
  { symbol: "005930.KS", name: "Samsung Electronics", price: "72300", change: "-0.25", volume: "15.3M", market: "AS" }
];

export default function InvestirAgora() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [selectedStock, setSelectedStock] = useState("PETR4");
  const [marketFilter, setMarketFilter] = useState("ALL");

  useEffect(() => {
    // Load TradingView Widget
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      new (window as any).TradingView.widget({
        width: "100%",
        height: 500,
        symbol: `BMFBOVESPA:${selectedStock}`,
        interval: "D",
        timezone: "America/Sao_Paulo",
        theme: "dark",
        style: "1",
        locale: "br",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview_chart"
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [selectedStock]);

  const filteredStocks = stockData.filter(stock => 
    (marketFilter === "ALL" || stock.market === marketFilter) &&
    (stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortData = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedStocks = [...filteredStocks].sort((a: any, b: any) => {
    if (!sortConfig.key) return 0;
    
    if (sortConfig.direction === "ascending") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pt-24 pb-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Mercado
            <span className="text-accent"> Global</span>
          </h1>
          
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Acompanhe ações de empresas do mundo todo em tempo real
          </p>
        </div>

        <Card className="p-6 glass mb-8">
          <div id="tradingview_chart" className="w-full h-[500px] mb-6 rounded-lg overflow-hidden" />
        </Card>

        <Card className="p-6 glass">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
              <div className="relative w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por ação..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={marketFilter === "ALL" ? "default" : "outline"}
                  onClick={() => setMarketFilter("ALL")}
                >
                  Todos
                </Button>
                <Button 
                  variant={marketFilter === "BR" ? "default" : "outline"}
                  onClick={() => setMarketFilter("BR")}
                >
                  Brasil
                </Button>
                <Button 
                  variant={marketFilter === "US" ? "default" : "outline"}
                  onClick={() => setMarketFilter("US")}
                >
                  EUA
                </Button>
                <Button 
                  variant={marketFilter === "EU" ? "default" : "outline"}
                  onClick={() => setMarketFilter("EU")}
                >
                  Europa
                </Button>
                <Button 
                  variant={marketFilter === "AS" ? "default" : "outline"}
                  onClick={() => setMarketFilter("AS")}
                >
                  Ásia
                </Button>
              </div>
            </div>
            <Button variant="outline">
              Adicionar aos Favoritos
              <Star className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] cursor-pointer" onClick={() => sortData("symbol")}>
                    Símbolo
                    <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => sortData("name")}>
                    Empresa
                    <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
                  </TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => sortData("price")}>
                    Preço
                    <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
                  </TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => sortData("change")}>
                    Variação
                    <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
                  </TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => sortData("volume")}>
                    Volume
                    <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStocks.map((stock) => (
                  <TableRow 
                    key={stock.symbol} 
                    className="cursor-pointer hover:bg-accent/5"
                    onClick={() => setSelectedStock(stock.symbol)}
                  >
                    <TableCell className="font-medium">{stock.symbol}</TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell className="text-right">
                      {stock.market === "BR" ? "R$" : "$"} {stock.price}
                    </TableCell>
                    <TableCell className={`text-right ${
                      stock.change.startsWith("+") ? "text-green-500" : "text-red-500"
                    }`}>
                      {stock.change}%
                    </TableCell>
                    <TableCell className="text-right">{stock.volume}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
    </div>
  );
}
