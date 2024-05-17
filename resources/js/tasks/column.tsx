"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import {
    ArrowDownUp,
    ArrowUpDown,
    ArrowUpDownIcon,
    ChevronsUpDownIcon,
    CircleX,
    EditIcon,
    MoreHorizontal,
    Pencil,
    RefreshCcw,
    SearchCheck,
} from "lucide-react";

import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Task = {
    id: string;
    name: string;
    country: string;
    document: string;
    last_updated: string;
    enabled: boolean;
};

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "country",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Country
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "document",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Document
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "last_updated",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Last Updated
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("last_updated"));
            const formatted = date.toLocaleString();
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "enabled",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Enabled
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center space-x-2">
                    <Switch
                        id={"sw-" + row.original.id}
                        checked={row.getValue("enabled")}
                        onClick={() => (row.getValue("enabled") ? false : true)}
                    />
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const task = row.original;
            console.log(task);

            return (
                <>
                    {row.original.processing ? (
                        <p>Processing</p>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <SearchCheck className="h-4 w-4 mr-1" />
                                    Check Selectors
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <RefreshCcw className="h-4 w-4 mr-1" />
                                    Run Crawler
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Pencil className="h-4 w-4 mr-1" />
                                    Edit Source
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <CircleX className="h-4 w-4 mr-1" />
                                    Remove Source
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </>
            );
        },
    },
];
