
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ChevronRight, Search, ArrowUpDown, Star } from "lucide-react";
import { useState } from "react";

// Sample data - in a real app this would come from an API
const stockData = [
  { symbol: "PETR4", name: "Petrobras PN", price: "37.92", change: "+1.25", volume: "52.3M" },
  { symbol: "VALE3", name: "Vale ON", price: "68.45", change: "-0.78", volume: "48.1M" },
  { symbol: "ITUB4", name: "Itaú Unibanco PN", price: "32.56", change: "+0.45", volume: "35.7M" },
  { symbol: "BBDC4", name: "Banco Bradesco PN", price: "14.82", change: "-0.32", volume: "29.4M" },
  { symbol: "B3SA3", name: "B3 ON", price: "12.75", change: "+0.89", volume: "25.8M" },
  { symbol: "WEGE3", name: "WEG ON", price: "36.42", change: "+1.12", volume: "18.9M" },
  { symbol: "RENT3", name: "Localiza ON", price: "62.30", change: "-0.25", volume: "15.3M" },
  { symbol: "BBAS3", name: "Banco do Brasil ON", price: "54.85", change: "+0.67", volume: "22.1M" },
  { symbol: "MGLU3", name: "Magazine Luiza ON", price: "1.92", change: "-1.54", volume: "45.6M" },
  { symbol: "VBBR3", name: "Vibra Energia ON", price: "19.45", change: "+0.34", volume: "12.8M" },
];

export default function InvestirAgora() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const filteredStocks = stockData.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            Ações
            <span className="text-accent"> Brasileiras</span>
          </h1>
          
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Acompanhe as principais ações do mercado brasileiro
          </p>
        </div>

        <Card className="p-6 glass">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
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
                  <TableRow key={stock.symbol} className="cursor-pointer hover:bg-accent/5">
                    <TableCell className="font-medium">{stock.symbol}</TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell className="text-right">R$ {stock.price}</TableCell>
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
