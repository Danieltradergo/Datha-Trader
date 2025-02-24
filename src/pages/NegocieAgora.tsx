
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const NegocieAgora = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("PETR4");
  const [quantity, setQuantity] = useState("");
  const spreadValue = 1; // Fixed $1 spread

  useEffect(() => {
    // Load TradingView Widget
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      new (window as any).TradingView.widget({
        width: "100%",
        height: 600,
        symbol: `BMFBOVESPA:${selectedSymbol}`,
        interval: "1",
        timezone: "America/Sao_Paulo",
        theme: "dark",
        style: "1",
        locale: "br",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview_chart",
        hide_side_toolbar: false,
        studies: ["RSI@tv-basicstudies", "MASimple@tv-basicstudies"],
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [selectedSymbol]);

  const handleBuy = () => {
    // To be implemented with backend integration
    console.log("Buy order:", {
      symbol: selectedSymbol,
      quantity,
      spread: spreadValue,
      type: "BUY"
    });
  };

  const handleSell = () => {
    // To be implemented with backend integration
    console.log("Sell order:", {
      symbol: selectedSymbol,
      quantity,
      spread: spreadValue,
      type: "SELL"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pt-24 pb-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Negocie
            <span className="text-accent"> Agora</span>
          </h1>
          
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Opere no mercado com spread fixo de $1 em todos os ativos
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <Card className="lg:col-span-3 p-6 glass">
            <div id="tradingview_chart" className="w-full h-[600px] rounded-lg overflow-hidden" />
          </Card>

          <Card className="p-6 glass">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Ordem</h3>
                <Input
                  type="number"
                  placeholder="Quantidade"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="mb-4"
                />
                <div className="text-sm text-muted-foreground mb-4">
                  Spread fixo: ${spreadValue}
                </div>
                <div className="grid gap-4">
                  <Button 
                    onClick={handleBuy}
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    Comprar
                    <ChevronUp className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleSell}
                    className="w-full bg-red-500 hover:bg-red-600"
                  >
                    Vender
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NegocieAgora;
