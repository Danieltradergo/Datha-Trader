
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const TradeNow = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const [quantity, setQuantity] = useState("");
  const [balance, setBalance] = useState(10000); // Initial demo balance

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
        symbol: `NASDAQ:${selectedSymbol}`,
        interval: "1",
        timezone: "America/New_York",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview_chart",
        hide_side_toolbar: false,
        studies: [
          "MASimple@tv-basicstudies",
          "RSI@tv-basicstudies",
          "MACD@tv-basicstudies"
        ],
        drawings_access: { type: "all", tools: [ { name: "Regression Trend" } ] },
        saved_drawings: false,
        withdateranges: true,
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [selectedSymbol]);

  const handleBuy = () => {
    if (!quantity || isNaN(Number(quantity))) return;
    
    const price = 150; // In a real app, this would come from the market
    const total = Number(quantity) * price;
    
    if (total > balance) {
      alert("Insufficient funds");
      return;
    }
    
    setBalance(prev => prev - total);
    // Here we would integrate with a backend to process the trade
  };

  const handleSell = () => {
    if (!quantity || isNaN(Number(quantity))) return;
    
    const price = 150; // In a real app, this would come from the market
    const total = Number(quantity) * price;
    
    setBalance(prev => prev + total);
    // Here we would integrate with a backend to process the trade
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pt-24 pb-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Trade
            <span className="text-accent"> Markets</span>
          </h1>
          
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Access global markets with professional trading tools and real-time data
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <Card className="lg:col-span-3 p-6 glass">
            <div id="tradingview_chart" className="w-full h-[600px] rounded-lg overflow-hidden" />
          </Card>

          <Card className="p-6 glass">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Trading Account</h3>
                <span className="text-accent">${balance.toLocaleString()}</span>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Place Order</h3>
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="mb-4"
                />
                <div className="grid gap-4">
                  <Button 
                    onClick={handleBuy}
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    Buy Market
                    <ChevronUp className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleSell}
                    className="w-full bg-red-500 hover:bg-red-600"
                  >
                    Sell Market
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

export default TradeNow;
