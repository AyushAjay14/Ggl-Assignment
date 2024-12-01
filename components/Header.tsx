//libs
import { Plus, Server } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Toaster } from "react-hot-toast";

//hooks
import { useAddNewDestinationMutation } from "@/hooks/useAddNewDestinationMutation";

// components
import { DestinationForm } from "@/components/DestinationForm";
import { Button } from "@/components/ui/button";

// types
import type { Destination } from "@/types";

export const Header = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addNewDestination = useAddNewDestinationMutation();
  const onSubmit = useCallback(
    (_values: Partial<Destination>) => {
      // TODO: call destination mutation here and redirect to it's page
      console.log(_values);
      addNewDestination({
        variables: { task: _values },
      });
      setIsModalOpen(false);
    },
    [addNewDestination]
  );

  return (
    <div className="flex gap-4 items-center p-5 bg-white rounded-2xl justify-between border">
      <Link href="/">
        <h1 className="flex-1 text-2xl font-semibold">Trip Finder 🚗</h1>
      </Link>
      <div className="flex gap-2 items-center">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Create
            </Button>
          </DialogTrigger>
          <DestinationForm key={`${isModalOpen}`} onSubmit={onSubmit} />
        </Dialog>
        <Button asChild>
          <a href="http://localhost:4000/" target="_blank">
            <Server />
            Open Server
          </a>
        </Button>
      </div>
      <Toaster />
    </div>
  );
};
