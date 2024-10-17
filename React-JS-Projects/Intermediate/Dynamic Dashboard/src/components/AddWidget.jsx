import React, { useContext, useEffect, useState } from "react";
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
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import ValueContext from "@/context/ValueContext";
import { toast } from "sonner";

function AddWidget({ onClose }) {
  const [data, setData] = useState([]);
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const { globalData, setGlobalData } = useContext(ValueContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCheckboxChange = (categoryId, widgetId) => {
    setSelectedWidgets((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [widgetId]: !prev[categoryId]?.[widgetId],
      },
    }));
  };

  const handleDelete = () => {
    const payload = Object.entries(selectedWidgets).flatMap(
      ([categoryId, widgets]) =>
        Object.entries(widgets)
          .filter(([widgetId, isChecked]) => isChecked)
          .map(([widgetId]) => ({
            categoryId,
            widgetId,
          }))
    );
    console.log("first", data);
    console.log(payload);

    const updatedData = data.map(category => {
        const widgetsToRemove = payload
          .filter(p => p.categoryId === category.id)
          .map(p => parseInt(p.widgetId, 10));
      
        const filteredWidgets = category.widgets.filter(widget => !widgetsToRemove.includes(widget.id));
      
        return {
          ...category,
          widgets: filteredWidgets
        };
    });

    setGlobalData(updatedData);
    toast('Widget Deleted Successfully!');
    
  };

  return (
    <Drawer direction="right" open={true} onOpenChange={onClose}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
        <ScrollArea className="h-screen">
          <div className="mx-auto w-full p-5">
            <DrawerHeader>
              <div className="flex justify-between items-center">
                <DrawerTitle>Add Widget</DrawerTitle>
                <Button variant="outlined" onClick={onClose}>
                  <Cross1Icon />
                </Button>
              </div>
              <DrawerDescription>
                * Personalise your Dashboard by adding the following widgets
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4 pb-0 space-y-4">
              {/* <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
                            <p>Image 1</p>
                        </div> */}

              <div>
                <Tabs defaultValue="cspm-exec-dashboard" className="w-[400px]">
                  <TabsList className="grid w-full grid-cols-4">
                    {globalData.map((category) => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.name.split(" ")[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {globalData.map((category) => (
                    <div key={category.id}>
                      {category.widgets.map((widget) => (
                        <div key={widget.id}>
                          <TabsContent value={category.id}>
                            <div className="flex gap-2 mt-2">
                              <Checkbox
                                id={widget.id}
                                checked={
                                  selectedWidgets[category.id]?.[widget.id] ||
                                  false
                                }
                                onCheckedChange={() =>
                                  handleCheckboxChange(category.id, widget.id)
                                }
                              />
                              <label htmlFor={widget.id}>{widget.name}</label>
                            </div>
                          </TabsContent>
                        </div>
                      ))}
                    </div>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DrawerFooter>
          <Button type="submit" onClick={handleDelete}>
            Delete
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AddWidget;
