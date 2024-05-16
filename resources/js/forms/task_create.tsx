"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/Components/ui/button";
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

import { Input } from "@/Components/ui/input";
import { toast } from "@/Components/ui/use-toast";
import { url } from "inspector";
import { Switch } from "@/Components/ui/switch";

const FormSchema = z.object({
    name: z.string(),
    url: z.string(),
    horizon_scanning: z.boolean(),
    container: z.string(),
    link: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string(),
    remove_text_from_date: z.string(),
    date_format: z.string(),
    document_title: z.string(),
    document_description: z.string(),
    document_date: z.string(),
});

export default function TaskForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            url: "",
            horizon_scanning: true,
            container: '',
            link: '',
            title: '',
            description: '',
            date: '',
            remove_text_from_date: '',
            date_format: '',
            document_title: '',
            document_description: '',
            document_date: '',
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
            >
                <div className="grid grid-cols-2 gap-3 mt-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
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

                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Country" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Bangladesh">
                                    Bangladesh
                                </SelectItem>
                                <SelectItem value="India">India</SelectItem>
                                <SelectItem value="Pakistan">
                                    Pakistan
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <FormMessage />
                    </FormItem>

                    <FormItem>
                        <FormLabel>Document</FormLabel>
                        <Select>
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

                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select>
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

                    <FormField
                        control={form.control}
                        name="url"
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
                        name="horizon_scanning"
                        render={({ field }) => (
                            <FormItem>
                                <div>
                                <FormLabel>Horizon Scanning</FormLabel>
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
                    <h2 className="text-2xl font-bold py-4">Source Selectors</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <FormField
                        control={form.control}
                        name="container"
                        render={ ( {field} ) => (
                            <FormItem>
                                <FormLabel className="font-bold">Container</FormLabel>
                                <FormControl>
                                    <Input />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="link"
                        render={ ( {field} ) => (
                            <FormItem>
                                <FormLabel className="font-bold">Link</FormLabel>
                                <FormControl>
                                    <Input />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="title"
                        render={ ( {field} ) => (
                            <FormItem>
                                <FormLabel className="font-bold">Title</FormLabel>
                                <FormControl>
                                    <Input />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="description"
                        render={ ( {field} ) => (
                            <FormItem>
                                <FormLabel className="font-bold">Description</FormLabel>
                                <FormControl>
                                    <Input />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="date"
                        render={ ( {field} ) => (
                            <FormItem>
                                <FormLabel className="font-bold">Date</FormLabel>
                                <FormControl>
                                    <Input />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="remove_text_from_date"
                        render={ ( {field} ) => (
                            <FormItem>
                                <FormLabel className="font-bold">Remove Text From Date</FormLabel>
                                <FormControl>
                                    <Input />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="date_format"
                        render={ ( {field} ) => (
                            <FormItem>
                                <FormLabel className="font-bold">Date Format</FormLabel>
                                <FormControl>
                                    <Input />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    </div>
                </div>
                <div className="bg-gray-50 w-full p-4 rounded-lg border border-gray-200">
                    <h2 className="text-2xl font-bold py-4">Document Selectors</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <FormField
                        control={form.control}
                        name="document_title"
                        render={ ( {field} ) => (
                            <FormItem>
                                <FormLabel className="font-bold">Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title Selector"/>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="document_description"
                        render={ ( {field} ) => (
                            <FormItem>
                                <FormLabel className="font-bold">Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Description"/>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="document_date"
                        render={ ( {field} ) => (
                            <FormItem>
                                <FormLabel className="font-bold">Date</FormLabel>
                                <FormControl>
                                    <Input placeholder="Date Selector"/>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="remove_text_from_date"
                        render={ ( {field} ) => (
                            <FormItem>
                                <FormLabel className="font-bold">Remove Text From Date</FormLabel>
                                <FormControl>
                                    <Input placeholder="Remove text from date"/>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="date_format"
                        render={ ( {field} ) => (
                            <FormItem>
                                <FormLabel className="font-bold">Date Format</FormLabel>
                                <FormControl>
                                    <Input />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
}
