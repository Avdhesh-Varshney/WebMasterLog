import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Cross1Icon, MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ValueContext from "@/context/ValueContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Body() {
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { globalData, setGlobalData } = useContext(ValueContext);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => {
        setGlobalData(response.data);
        setFilteredData(response.data);
        filterData();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(searchValue);
  // console.log('filteredData',filteredData)

  const handleAddWidget = () => {
    const payload = {
      categoryId: categoryId,
      name: widgetName,
      text: widgetText,
    };

    console.log("Payload to be sent:", payload);

    const replaceCategory = globalData.map((category) => {
      if (category.id === payload.categoryId) {
        const newWidget = {
          id: category.widgets.length + 1,
          name: payload.name,
          text: payload.text,
        };

        const index = globalData.findIndex((i) => i.id === payload.categoryId);
        globalData[index].widgets.push(newWidget);
        setGlobalData(globalData);
        return index;
      }
    });
    console.log(replaceCategory);
    setWidgetName("");
    setWidgetText("");
    toast("Widget Added Successfully");
  };

  const handleDelete = (categoryId, widgetId) => {
    const payload = {
      categoryId: categoryId,
      widgetId: widgetId,
    };

    const updatedData = globalData.map((category) => {
      if (category.id === payload.categoryId) {
        const filteredWidgets = category.widgets.filter(
          (widget) => widget.id !== payload.widgetId
        );
        return {
          ...category,
          widgets: filteredWidgets,
        };
      }
      return category;
    });

    setGlobalData(updatedData);
    toast("Widget Deleted Successfully!");
  };

  const filterData = () => {
    const flattenedWidgets = globalData.flatMap(
      (dashboard) => dashboard.widgets
    );
    const filteredWidgets = flattenedWidgets.filter((val) => {
      return searchValue.toLowerCase() === ""
        ? val
        : val.text.toLowerCase().includes(searchValue);
    });
    setFilteredData(filteredWidgets);
  };

  return (
    <div>
      <div className="mt-10 mr-6 flex justify-end">
        <div className="relative flex items-center w-[50vmax]">
          <MagnifyingGlassIcon className="absolute left-3 text-gray-500" width={20} height={20} />
          <Input
          className="pl-10"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              filterData();
            }}
          />
        </div>
      </div>

      <div className="p-4">
        {searchValue === ""
          ? globalData.map((category) => (
              <div key={category.id}>
                <h2 className="font-bold text-3xl mb-1 mt-1">
                  {category.name}
                </h2>
                {category.widgets.length > 4 ? (
                  <Carousel className="w-full">
                    <CarouselContent className="-ml-1">
                      {category.widgets.map((widget) => (
                        <CarouselItem
                          key={widget.id}
                          className="pl-1 md:basis-1/3 lg:basis-1/5"
                        >
                          <Card className="w-[285px] h-[150px] relative">
                            <div className="absolute top-2 right-2">
                              <Button
                                variant="ghost"
                                onClick={() => {
                                  handleDelete(category.id, widget.id);
                                }}
                              >
                                <Cross1Icon />
                              </Button>
                            </div>
                            <CardHeader>
                              <CardTitle>{widget.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p>{widget.text}</p>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                      <CarouselItem className="pl-1 md:basis-1/3 lg:basis-1/5">
                        <Card className="relative w-[240px] h-[150px]">
                          <div className="absolute inset-0 bg-muted flex items-center justify-center rounded-lg">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost">
                                  <PlusIcon />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Add Widget</DialogTitle>
                                  <DialogDescription>
                                    Enter the details for the new widget under{" "}
                                    {category.name}.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="widget-name"
                                      className="text-right"
                                    >
                                      Widget Name
                                    </Label>
                                    <Input
                                      id="widget-name"
                                      placeholder="Enter widget name"
                                      className="col-span-3"
                                      value={widgetName}
                                      onChange={(e) => {
                                        setWidgetName(e.target.value);
                                        setCategoryId(category.id);
                                      }}
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="widget-text"
                                      className="text-right"
                                    >
                                      Widget Text
                                    </Label>
                                    <Input
                                      id="widget-text"
                                      placeholder="Enter widget text"
                                      className="col-span-3"
                                      value={widgetText}
                                      onChange={(e) =>
                                        setWidgetText(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    type="submit"
                                    onClick={handleAddWidget}
                                  >
                                    Add Widget
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </Card>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
                    <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
                  </Carousel>
                ) : (
                  <div className="flex gap-2 items-center p-4">
                    {category.widgets.map((widget) => (
                      <div key={widget.id}>
                        <Card className="w-[240px] h-[150px] relative">
                          <div className="absolute top-2 right-2">
                            <Button
                              variant="ghost"
                              onClick={() => {
                                handleDelete(category.id, widget.id);
                              }}
                            >
                              <Cross1Icon />
                            </Button>
                          </div>
                          <CardHeader>
                            <CardTitle>{widget.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>{widget.text}</p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                    <Card className="relative w-[240px] h-[150px]">
                      <div className="absolute inset-0 bg-muted flex items-center justify-center rounded-lg ">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost">
                              <PlusIcon />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Add Widget</DialogTitle>
                              <DialogDescription>
                                Enter the details for the new widget under{" "}
                                {category.name}.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="widget-name"
                                  className="text-right"
                                >
                                  Widget Name
                                </Label>
                                <Input
                                  id="widget-name"
                                  placeholder="Enter widget name"
                                  className="col-span-3"
                                  value={widgetName}
                                  onChange={(e) => {
                                    setWidgetName(e.target.value);
                                    setCategoryId(category.id);
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="widget-text"
                                  className="text-right"
                                >
                                  Widget Text
                                </Label>
                                <Input
                                  id="widget-text"
                                  placeholder="Enter widget text"
                                  className="col-span-3"
                                  value={widgetText}
                                  onChange={(e) =>
                                    setWidgetText(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" onClick={handleAddWidget}>
                                Add Widget
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            ))
          : 
            <div className="flex w-full flex-wrap gap-2 h-full mt-2">
              { filteredData.map((filter) => (
                <div className="w-1/5 bg-white rounded-lg shadow-lg flex flex-col gap-2 px-4 py-10 mb-4 ">
                  <strong>{filter.name}</strong>
                  {filter.text}
                </div>
              ))}
              </div>
            }
      </div>
    </div>
  );
}

export default Body;
