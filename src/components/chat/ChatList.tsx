import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare } from 'lucide-react';
import { Message, User, getAllUsers } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

interface ChatListProps {
  onSelectChat: (userId: string) => void;
  selectedUserId?: string;
}

interface ChatPreview {
  user: User;
  lastMessage?: Message;
  unreadCount: number;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectChat, selectedUserId }) => {
  const { user } = useAuth();
  const [chatPreviews, setChatPreviews] = useState<ChatPreview[]>([]);

  useEffect(() => {
    loadChatPreviews();
  }, [user]);

  const loadChatPreviews = () => {
    if (!user) return;

    const storageKey = `skilllink_messages_${user.id}`;
    const storedMessages = localStorage.getItem(storageKey);
    const messages: Message[] = storedMessages ? JSON.parse(storedMessages) : [];
    
    // Group messages by conversation partner
    const conversationMap = new Map<string, Message[]>();
    
    messages.forEach(message => {
      const partnerId = message.senderId === user.id ? message.receiverId : message.senderId;
      if (!conversationMap.has(partnerId)) {
        conversationMap.set(partnerId, []);
      }
      conversationMap.get(partnerId)!.push(message);
    });

    // Create chat previews
    const previews: ChatPreview[] = [];
    const allUsers = getAllUsers();
    
    conversationMap.forEach((msgs, partnerId) => {
      const partner = allUsers.find(u => u.id === partnerId);
      if (partner) {
        const sortedMessages = msgs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        const unreadCount = msgs.filter(m => m.senderId === partnerId && !m.read).length;
        
        previews.push({
          user: partner,
          lastMessage: sortedMessages[0],
          unreadCount
        });
      }
    });

    // Sort by last message timestamp
    previews.sort((a, b) => {
      const aTime = a.lastMessage ? new Date(a.lastMessage.timestamp).getTime() : 0;
      const bTime = b.lastMessage ? new Date(b.lastMessage.timestamp).getTime() : 0;
      return bTime - aTime;
    });

    setChatPreviews(previews);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5" />
          <span>Messages</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          {chatPreviews.length === 0 ? (
            <div className="text-center py-8 px-4">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No conversations yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start chatting with clients or workers
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {chatPreviews.map((preview) => (
                <div
                  key={preview.user.id}
                  onClick={() => onSelectChat(preview.user.id)}
                  className={`flex items-center space-x-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedUserId === preview.user.id ? 'bg-muted' : ''
                  }`}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={preview.user.avatar} />
                    <AvatarFallback>{preview.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium truncate">{preview.user.name}</h4>
                      {preview.lastMessage && (
                        <span className="text-xs text-muted-foreground">
                          {formatTime(preview.lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {preview.lastMessage?.content || 'No messages yet'}
                      </p>
                      {preview.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {preview.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ChatList;