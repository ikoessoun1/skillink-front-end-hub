
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/ClientDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import Messages from "./pages/Messages";
import DebugInfo from "./pages/DebugInfo";
import NotFound from "./pages/NotFound";
import BrowseJobs from "./pages/BrowseJobs";
import FindWorkers from "./pages/FindWorkers";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import WorkerProfile from "./pages/WorkerProfile";
import Settings from "./pages/Settings";
import HowItWorks from "./pages/HowItWorks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/worker-dashboard" element={<WorkerDashboard />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/debug" element={<DebugInfo />} />
            <Route path="/browse-jobs" element={<BrowseJobs />} />
            <Route path="/find-workers" element={<FindWorkers />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/worker/:workerId" element={<WorkerProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<HowItWorks />} />
            <Route path="/privacy" element={<HowItWorks />} />
            <Route path="/terms" element={<HowItWorks />} />
            <Route path="/worker-resources" element={<BrowseJobs />} />
            <Route path="/worker-support" element={<Settings />} />
            <Route path="/client-support" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
