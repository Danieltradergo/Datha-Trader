
import { Navbar } from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function Payments() {
  const handleCopyPix = () => {
    navigator.clipboard.writeText("d225a72b-92e1-4f6e-9b61-55c73e780923");
    toast({
      title: "Chave PIX copiada!",
      description: "A chave PIX foi copiada para sua área de transferência."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pt-24 pb-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Depósitos e
            <span className="text-accent"> Saques</span>
          </h1>
          
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Gerencie seus depósitos e saques de forma rápida e segura via PIX
          </p>
        </div>

        <Tabs defaultValue="deposit" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">Depósito</TabsTrigger>
            <TabsTrigger value="withdraw">Saque</TabsTrigger>
          </TabsList>

          <TabsContent value="deposit">
            <Card>
              <CardHeader>
                <CardTitle>Depósito via PIX</CardTitle>
                <CardDescription>
                  Faça um depósito usando a chave PIX abaixo. Valor mínimo: R$ 500,00
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-semibold mb-1">Dados do Destinatário</h4>
                      <p className="text-sm text-muted-foreground">DaTha Trader</p>
                    </div>
                    <AlertCircle className="text-muted-foreground h-5 w-5" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Chave PIX</Label>
                      <div className="flex gap-2 mt-1.5">
                        <Input 
                          value="d225a72b-92e1-4f6e-9b61-55c73e780923"
                          readOnly
                          className="bg-background"
                        />
                        <Button variant="outline" onClick={handleCopyPix}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="font-semibold mb-3">Instruções</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>1. Copie a chave PIX acima</li>
                    <li>2. Abra seu aplicativo bancário</li>
                    <li>3. Selecione a opção PIX</li>
                    <li>4. Cole a chave e confirme o nome do destinatário</li>
                    <li>5. Digite o valor (mínimo R$ 500,00)</li>
                    <li>6. Confirme a transferência</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdraw">
            <Card>
              <CardHeader>
                <CardTitle>Solicitar Saque</CardTitle>
                <CardDescription>
                  Solicite um saque via PIX. Valor mínimo: R$ 50,00
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Sua Chave PIX</Label>
                    <Input type="text" placeholder="Digite sua chave PIX" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Valor do Saque</Label>
                    <Input type="number" min="50" placeholder="R$ 0,00" className="mt-1.5" />
                  </div>
                  <Button className="w-full">
                    Solicitar Saque
                  </Button>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="font-semibold mb-3">Informações Importantes</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Valor mínimo para saque: R$ 50,00</li>
                    <li>• Saques são processados em até 24 horas úteis</li>
                    <li>• Verifique se sua chave PIX está correta</li>
                    <li>• Em caso de dúvidas, entre em contato com o suporte</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
