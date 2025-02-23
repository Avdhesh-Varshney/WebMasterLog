
import Timer from "@/components/Timer";
import TaskList from "@/components/TaskList";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle authentication
    setIsSignedIn(true);
    toast({
      title: "Signed in successfully",
      description: "Welcome back!",
    });
  };

  const generateReport = () => {
    const report = {
      totalFocusTime: "25:00",
      completedTasks: 5,
      date: new Date().toLocaleDateString(),
    };
    
    toast({
      title: "Report Generated",
      description: `Focus time: ${report.totalFocusTime}, Completed tasks: ${report.completedTasks}`,
    });
  };

  return (
    <div className="min-h-screen bg-[#33C3F0] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            ✓ Pomofocus
          </h1>
          <div className="flex gap-2">
            {/* Report Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-4 py-2 bg-white/20 text-white rounded-md flex items-center gap-2 hover:bg-white/30 transition-colors">
                  <span className="text-sm">Report</span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Your Focus Report</DialogTitle>
                  <DialogDescription>
                    View your productivity stats and completed tasks.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Button onClick={generateReport} className="w-full">
                    Generate Report
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Settings Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-4 py-2 bg-white/20 text-white rounded-md flex items-center gap-2 hover:bg-white/30 transition-colors">
                  <span className="text-sm">Setting</span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Settings</DialogTitle>
                  <DialogDescription>
                    Customize your timer preferences
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="pomodoro">Pomodoro:</label>
                    <input
                      id="pomodoro"
                      type="number"
                      className="col-span-3 p-2 border rounded"
                      defaultValue={25}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="shortBreak">Short Break:</label>
                    <input
                      id="shortBreak"
                      type="number"
                      className="col-span-3 p-2 border rounded"
                      defaultValue={5}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="longBreak">Long Break:</label>
                    <input
                      id="longBreak"
                      type="number"
                      className="col-span-3 p-2 border rounded"
                      defaultValue={15}
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Sign In Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-4 py-2 bg-white/20 text-white rounded-md flex items-center gap-2 hover:bg-white/30 transition-colors">
                  <span className="text-sm">
                    {isSignedIn ? "Profile" : "Sign In"}
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isSignedIn ? "Your Profile" : "Sign In"}
                  </DialogTitle>
                  <DialogDescription>
                    {isSignedIn
                      ? "Manage your account"
                      : "Sign in to save your progress"}
                  </DialogDescription>
                </DialogHeader>
                {!isSignedIn ? (
                  <form onSubmit={handleSignIn} className="space-y-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        type="password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </form>
                ) : (
                  <div className="py-4">
                    <Button
                      onClick={() => setIsSignedIn(false)}
                      variant="destructive"
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </header>
        <Timer />
        <div className="mt-8 text-center">
          <h2 className="text-white/80 text-sm">#1</h2>
          <h3 className="text-white text-2xl font-light">Time to focus!</h3>
        </div>
        <TaskList />
      </div>
    </div>
  );
};

export default Index;
