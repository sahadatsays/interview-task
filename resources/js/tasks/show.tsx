"use client";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/Components/ui/card";

export default function ShowTask({ task }: { task: string }) {
    const results = task.result;

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        See Results
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className={
                        "lg:max-w-screen-lg overflow-y-scroll max-h-screen"
                    }
                >
                    <DialogHeader>
                        <DialogTitle>Check Results</DialogTitle>
                    </DialogHeader>
                    <Carousel className="w-full mb-10">
                        <CarouselContent>
                            {results.map((result, index) => (
                                <CarouselItem key={index}>
                                    <Card>
                                        <CardContent className="p-6 bg-gray-100">
                                            <p>Link: {result.link}</p>
                                            <p>Date : {result.date}</p>
                                            <p>Title : {result.title}</p>
                                            <div className="py-3">Description:  {result.description}</div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselNext className="static float-end rounded-md mt-5" />
                        <CarouselPrevious className="static float-end rounded-md mt-5 mr-2" />
                    </Carousel>
                    <DialogFooter className="sm:justify-between">
                        <DialogClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                        </DialogClose>
                        <div>
                            <Button variant={"outline"} className="mr-3">
                                Edit Source
                            </Button>
                            <Button>Clear</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
