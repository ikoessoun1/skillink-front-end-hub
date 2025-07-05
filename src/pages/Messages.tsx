import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ChatList from '@/components/chat/ChatList';
import ChatWindow from '@/components/chat/ChatWindow';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const Messages: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground mt-2">
              Communicate with clients and workers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ChatList 
                onSelectChat={setSelectedUserId}
                selectedUserId={selectedUserId || undefined}
              />
            </div>
            
            <div>
              {selectedUserId ? (
                <ChatWindow 
                  recipientId={selectedUserId}
                  onClose={() => setSelectedUserId(null)}
                />
              ) : (
                <Card className="h-96 flex items-center justify-center">
                  <CardContent className="text-center">
                    <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Select a conversation</h3>
                    <p className="text-muted-foreground">
                      Choose a chat from the list to start messaging
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;