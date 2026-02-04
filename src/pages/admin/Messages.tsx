import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Check, Clock } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function AdminMessages() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_messages")
        .update({ is_read: true })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      toast({ title: "Success", description: "Message marked as read" });
    },
  });

  return (
    <AdminLayout title="Messages">
      <div className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 rounded-xl bg-card animate-pulse" />
            ))}
          </div>
        ) : messages?.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex p-4 rounded-full bg-muted mb-4">
              <Mail className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No messages yet</h3>
            <p className="text-muted-foreground">Contact form submissions will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages?.map((message) => (
              <div
                key={message.id}
                className={`p-6 rounded-xl border ${
                  message.is_read
                    ? "bg-card border-border"
                    : "bg-primary/5 border-primary/20"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${message.is_read ? "bg-muted" : "bg-primary/10"}`}>
                      <Mail className={`w-5 h-5 ${message.is_read ? "text-muted-foreground" : "text-primary"}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{message.name}</h3>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(message.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {!message.is_read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markReadMutation.mutate(message.id)}
                        className="border-primary/50 text-primary hover:bg-primary/10"
                      >
                        <Check className="w-4 h-4 mr-1" /> Mark Read
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-foreground whitespace-pre-wrap">{message.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
