import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthenticationPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="account">Criar conta</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
               LOGIN
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              You have 12 active projects and 3 pending tasks.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Criar conta</CardTitle>
              <CardDescription>
               CRIAR CONTA
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              You have 12 active projects and 3 pending tasks.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
