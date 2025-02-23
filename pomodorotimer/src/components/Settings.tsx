
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings2, Bell, Play } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface TimerSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  notifications: boolean;
}

const SettingsPanel = () => {
  const [settings, setSettings] = useState<TimerSettings>({
    work: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: true,
    autoStartPomodoros: true,
    notifications: true,
  });

  const handleSettingChange = (
    key: keyof TimerSettings,
    value: number | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Timer Settings</DrawerTitle>
            <DrawerDescription>
              Customize your Pomodoro experience
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium leading-none">
                  Timer Durations (minutes)
                </h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <Label htmlFor="work">Pomodoro</Label>
                    <Input
                      id="work"
                      type="number"
                      min="1"
                      max="60"
                      value={settings.work}
                      onChange={(e) =>
                        handleSettingChange("work", parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <Label htmlFor="shortBreak">Short Break</Label>
                    <Input
                      id="shortBreak"
                      type="number"
                      min="1"
                      max="30"
                      value={settings.shortBreak}
                      onChange={(e) =>
                        handleSettingChange("shortBreak", parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <Label htmlFor="longBreak">Long Break</Label>
                    <Input
                      id="longBreak"
                      type="number"
                      min="1"
                      max="45"
                      value={settings.longBreak}
                      onChange={(e) =>
                        handleSettingChange("longBreak", parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium leading-none">
                  Auto Start Options
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoStartBreaks">
                        Auto-start Break Timer
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        Automatically start breaks
                      </p>
                    </div>
                    <Switch
                      id="autoStartBreaks"
                      checked={settings.autoStartBreaks}
                      onCheckedChange={(checked) =>
                        handleSettingChange("autoStartBreaks", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoStartPomodoros">
                        Auto-start Pomodoro
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        Automatically start next pomodoro
                      </p>
                    </div>
                    <Switch
                      id="autoStartPomodoros"
                      checked={settings.autoStartPomodoros}
                      onCheckedChange={(checked) =>
                        handleSettingChange("autoStartPomodoros", checked)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium leading-none">Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Enable Notifications</Label>
                    <p className="text-muted-foreground text-sm">
                      Get notified when timer ends
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("notifications", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsPanel;
