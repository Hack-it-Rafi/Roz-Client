// components/ChatCard.tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import { Cog } from "lucide-react"

interface ChatCardProps {
  id: string
  name: string
  formatAgentName: (name: string) => string
}

const ChatCard: React.FC<ChatCardProps> = ({ id, name, formatAgentName }) => {
  return (
    <Card key={id}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md bg-muted aspect-square w-full grid place-items-center">
          <div className="text-6xl font-bold uppercase">
            {formatAgentName(name)}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-4 w-full">
          <NavLink to={`/chat/${id}`} className="w-full grow">
            <Button variant="outline" className="w-full grow">
              Chat
            </Button>
          </NavLink>
          <NavLink to={`/settings/${id}`} key={id}>
            <Button size="icon" variant="outline">
              <Cog />
            </Button>
          </NavLink>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ChatCard
