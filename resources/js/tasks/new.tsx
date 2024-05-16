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
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { PlusIcon } from "lucide-react";
import TaskForm from "@/forms/task_create";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/Components/ui/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Switch } from "@/Components/ui/switch";
import axios from "axios";
import { useState } from "react";

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Name field is required",
    }),
    url: z.string().min(1, {
        message: "URL field is required",
    }),
    enabled: z.boolean(),
    source_container: z.string(),
    source_link: z.string(),
    source_title: z.string(),
    source_description: z.string(),
    source_date: z.string(),
    source_type: z.string(),
    source_date_format: z.string(),
    source_remove_text_from_date: z.string(),
    document_remove_text_from_date: z.string(),
    document_date_format: z.string(),
    document_title: z.string(),
    document_description: z.string(),
    document_date: z.string(),
    referece_selector: z.string(),
    country: z.string().min(1, {
        message: "Country field is required",
    }),
    document: z.string().min(1, {
        message: "Country field is required",
    }),
});

export function NewTask() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            url: "",
            enabled: true,
            source_container: "",
            source_link: "",
            source_title: "",
            source_description: "",
            source_date: "",
            source_remove_text_from_date: "",
            source_date_format: "",
            document_remove_text_from_date: "",
            document_date_format: "",
            document_title: "",
            document_description: "",
            document_date: "",
            referece_selector: "",
            country: "",
            document: "",
            source_type: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
        });

        axios
            .post("/tasks", data)
            .then((res) => {
                if (res.data.status) {
                    setOpen(false);
                    window.location = "/"
                }
            })
            .catch((error) => {
                let { errors } = error.response.data;
                console.log(errors);
            });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Source
                </Button>
            </DialogTrigger>

            <DialogContent className="w-full h-5/6 my-5">
                <DialogHeader>
                    <DialogTitle onClick={() => setOpen(true)}>
                        Add Source
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6 overflow-auto px-3"
                    >
                        <div className="grid grid-cols-2 gap-3 mt-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Country" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Bangladesh">
                                                    Bangladesh
                                                </SelectItem>
                                                <SelectItem value="India">
                                                    India
                                                </SelectItem>
                                                <SelectItem value="Pakistan">
                                                    Pakistan
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="document"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Document</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Document" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Document 1">
                                                    Document 1
                                                </SelectItem>
                                                <SelectItem value="Document 2">
                                                    Document 2
                                                </SelectItem>
                                                <SelectItem value="Document 3">
                                                    Document 3
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="source_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Source Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Web Scraping" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Web Scraping">
                                                    Web Scraping
                                                </SelectItem>
                                                <SelectItem value="Web Crawling">
                                                    Web Crawling
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="referece_selector"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Referece Selector</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Referece Selector"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="enabled"
                                render={({ field }) => (
                                    <FormItem>
                                        <div>
                                            <FormLabel>
                                                Horizon Scanning
                                            </FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                aria-readonly
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="bg-gray-50 w-full p-4 rounded-lg border border-gray-200">
                            <h2 className="text-2xl font-bold py-4">
                                Source Selectors
                            </h2>
                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                    control={form.control}
                                    name="source_container"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Container
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="source_link"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Link
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="source_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="source_description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Description
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="source_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Date
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="source_remove_text_from_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Remove Text From Date
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="source_date_format"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Date Format
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="bg-gray-50 w-full p-4 rounded-lg border border-gray-200">
                            <h2 className="text-2xl font-bold py-4">
                                Document Selectors
                            </h2>
                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                    control={form.control}
                                    name="document_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Title Selector"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="document_description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Description
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Description"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="document_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Date
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Date Selector"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="document_remove_text_from_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Remove Text From Date
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Remove text from date"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="document_date_format"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Date Format
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="sm:justify-between">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant={"secondary"}
                                    className="float-right"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <div>
                                <Button
                                    type="button"
                                    variant={"secondary"}
                                    className="mr-2"
                                >
                                    Check Selectors
                                </Button>
                                <Button type="submit">Save</Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
